import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from '../AttendanceEventPage/Style';
import mainLogo from '../../Img/main_logo.svg';
import tableImage from '../../Img/table1.svg'; // 테이블 이미지
import editLogo from '../../Img/edit_logo.svg';
import Footer from '../../component/footer/Footer';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AttendanceEvent from '../../component/AttendanceEvent';
import { getEvent, getParticipation, getParticipationName } from '../../services/supabaseService';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';

const characterImages = Array.from({ length: 10 }, (_, i) => require(`../../Img/characters/character${i + 1}.svg`));

const AttendanceEventListPage = () => {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [showAttendanceForm, setShowAttendanceForm] = useState(false);
    const [editingParticipant, setEditingParticipant] = useState(null);
    const name = JSON.parse(sessionStorage.getItem('name'));
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('eventId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 이벤트 데이터를 가져오기
                const eventResponse = await getEvent(id);
                if (eventResponse && eventResponse.length > 0) {
                    const event = eventResponse[0];
                    setEventData(event);

                    if (event.time) {
                        const parsedTime = JSON.parse(event.time);
                        setTimeList(parsedTime);
                    }
                }

                // 참여자 목록을 가져오기
                const participationList = await getParticipation(id);
                if (participationList.length > 0) {
                    const parsedParticipationData = participationList.map(item => ({
                        name: item.name,
                        checked: JSON.parse(item.checked),
                        id: item.id, // participation_tb의 primary key
                    }));
                    setParticipants(parsedParticipationData);

                    const times = JSON.parse(participationList[0].time);
                    setTimeList(times);
                }

                // 이미 참여한 경우 리스트 페이지로 이동
                const participationResponse = await getParticipationName(id, name);
                if (participationResponse.data > 0) {
                    window.location.href = `${window.location.origin}/list?eventId=${encodeURIComponent(id)}`;
                }

                // 참가자가 0명인 경우 AttendanceEvent를 바로 띄우기
                if (participationList.length === 0) {
                    setShowAttendanceForm(true);
                }
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchData();
    }, [id, name]);    

    const onEditClick = () => {
        navigate(`/edit?eventId=${encodeURIComponent(id)}`);
    };

    const formatDateString = (dateString) => {
        const [datePart, timePart] = dateString.split(' / ');
        const [month, dayWithWeekday] = datePart.split('월 ');
        const day = dayWithWeekday.replace('일', '');
        return (
            <div css={S.DateTimeContainer}>
                <span css={S.DatePart}>{`${month}.${day}`}</span>
                <span css={S.TimePart}>{`${timePart}`}</span>
            </div>
        );
    };

    // 가장 가능성 높은 날짜를 저장할 변수
    let topDates = [];

    const getRowBackgroundColor = (rows) => {
        const rankedRows = rows.map(row => {
            const yesCount = row.statuses.filter(status => status.includes('yes')).length;
            const questionCount = row.statuses.filter(status => status.includes('question')).length;
            return { ...row, yesCount, questionCount };
        });

        const sortedCounts = [...rankedRows].sort((a, b) => {
            if (b.yesCount !== a.yesCount) {
                return b.yesCount - a.yesCount;
            } else {
                return b.questionCount - a.questionCount;
            }
        });

        const colorMapping = {};
        sortedCounts.forEach((row, index) => {
            if (index === 0) {
                colorMapping[row.time] = S.GreenBackground;
                topDates.push(row.time); // 가장 가능성 높은 날짜 추가
            } else if (index === 1) {
                colorMapping[row.time] = S.BlueBackground;
            } else {
                colorMapping[row.time] = null;
            }
        });

        return rows.map(row => ({
            ...row,
            backgroundColor: colorMapping[row.time]
        }));
    };

    const sortedTimeList = getRowBackgroundColor(
        timeList.map((time, timeIndex) => {
            const statuses = participants.map(participant => participant.checked[timeIndex]);
            return { time, statuses };
        })
    );

    // 참석자 수에 따른 툴팁 메시지 생성
    const participantCount = participants.length;
    let tooltipMessage = null;

    if (participantCount === 1) {
        tooltipMessage = <span>아직은 나 혼자뿐인가...</span>;
    } else if (participantCount === 2) {
        tooltipMessage = <span>오 친구가 생겼군!</span>;
    } else if (participantCount >= 3) {
        // 가장 가능성 높은 날짜 포맷팅
        const formattedDates = topDates.map(dateString => {
            const datePart = dateString.split(' / ')[0]; // 예: '5월 20일 (금)'
            const formattedDate = datePart.replace('월 ', '.').replace('일', '');
            return formattedDate;
        });

        tooltipMessage = (
            <span>
                가장 가능성 높은 날은{' '}
                {formattedDates.map((date, index) => (
                    <React.Fragment key={index}>
                        <span css={S.HighlightedDate}>{date}</span>
                        {index < formattedDates.length - 1 && ', '}
                    </React.Fragment>
                ))}이구만~!!!
            </span>
        );
    }

    // 중복되지 않는 캐릭터를 가져오는 함수
    const getUniqueCharacter = (usedCharacters) => {
        let characterIndex;
        do {
            characterIndex = Math.floor(Math.random() * characterImages.length);
        } while (usedCharacters.has(characterIndex) && usedCharacters.size < characterImages.length);
    
        usedCharacters.add(characterIndex);
        return characterImages[characterIndex];
    };
    
    // **캐릭터 배치 함수 수정**
    const getFixedCharacterPlacements = () => {
        const placements = [];
        const usedCharacters = new Set();
    
        const totalParticipants = participants.length;
        const tableWidth = 720;
        const characterWidth = 104;
        const characterSpacing = 16;
    
        const topParticipants = [];
        const bottomParticipants = [];
    
        // 첫 번째 참가자를 윗줄에 배치하기 위해 인덱스 조정
        participants.forEach((participant, index) => {
            if (index % 2 === 0) {
                topParticipants.push(participant);
            } else {
                bottomParticipants.push(participant);
            }
        });
    
        // 윗줄 캐릭터 배치
        const topRowCount = topParticipants.length;
        const totalTopRowWidth = topRowCount * characterWidth + (topRowCount - 1) * characterSpacing;
        const startXTop = (tableWidth - totalTopRowWidth) / 2;
    
        topParticipants.forEach((participant, i) => {
            const leftPosition = startXTop + i * (characterWidth + characterSpacing) + characterWidth / 2;
            const character = getUniqueCharacter(usedCharacters);
    
            placements.push({
                row: 'top',
                position: leftPosition,
                character,
                name: participant.name,
            });
        });
    
        // 아랫줄 캐릭터 배치
        const bottomRowCount = bottomParticipants.length;
        const totalBottomRowWidth = bottomRowCount * characterWidth + (bottomRowCount - 1) * characterSpacing;
        const startXBottom = (tableWidth - totalBottomRowWidth) / 2;
    
        bottomParticipants.forEach((participant, i) => {
            const leftPosition = startXBottom + i * (characterWidth + characterSpacing) + characterWidth / 2;
            const character = getUniqueCharacter(usedCharacters);
    
            placements.push({
                row: 'bottom',
                position: leftPosition,
                character,
                name: participant.name,
            });
        });
    
        return placements;
    };


    const characterPlacements = getFixedCharacterPlacements();

    // 참석자 수에 따른 열 너비 결정
    let participantColumnWidth;

    if (participantCount === 1) {
        participantColumnWidth = 380;
    } else if (participantCount === 2) {
        participantColumnWidth = 190;
    } else if (participantCount === 3) {
        participantColumnWidth = 126;
    } else if (participantCount >= 4) {
        participantColumnWidth = 95;
    } else {
        participantColumnWidth = 95; // 기본값
    }

    // 이름 클릭 시 호출되는 함수
    const handleParticipantNameClick = (participant) => {
        setEditingParticipant(participant);
        setShowAttendanceForm(true);
    };

    return (
        <div css={S.Layout}>
            <div css={S.Header}>
                <div css={S.HeaderBox}>
                    <div css={S.ImgBox}>
                        <Link to="/" style={{ display: 'inline-block' }}>
                            <img src={mainLogo} alt="Main Logo" style={{ cursor: 'pointer' }} />
                        </Link>
                    </div>
                    <div css={S.HeaderItem}>
                        <h1>{eventData?.title}</h1>
                        <button onClick={onEditClick} style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={editLogo}
                                alt="모임 수정하기"
                                style={{ width: '26px', height: '26px', marginRight: '4px' }} // 아이콘 크기 및 간격
                            />
                            모임 수정하기
                        </button>
                    </div>
                    <h3>{eventData?.detail}</h3>
                </div>
            </div>

            {/* 참여자가 있을 때 리스트 컴포넌트 표시 */}
            {participants.length > 0 && (
                <div css={S.Component}>
                    {/* 메인 컨테이너 */}
                    <div css={S.EventContainer}>
                        {/* 툴팁 */}
                        <div css={S.TooltipContainer}>
                            <div css={S.Tooltip}>
                                {tooltipMessage}
                            </div>
                        </div>

                        {/* 캐릭터+캡션+테이블 이미지 컨테이너 (A) */}
                        <div css={S.CharacterAndTableContainer}>
                            {/* 테이블 이미지 */}
                            <img src={tableImage} alt="Table" css={S.TableImage} />

                            {/* 캐릭터 배치 */}
                            {characterPlacements.map((placement, index) => (
                                <div
                                    key={index}
                                    css={S.CharacterContainer(placement.position, placement.row)}
                                >
                                    {placement.row === 'top' ? (
                                        <>
                                            <div css={S.CharacterName(placement.row)}>{placement.name}</div>
                                            <img
                                                src={placement.character}
                                                alt={`Character ${index + 1}`}
                                                css={S.CharacterImage}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src={placement.character}
                                                alt={`Character ${index + 1}`}
                                                css={S.CharacterImage}
                                            />
                                            <div css={S.CharacterName(placement.row)}>{placement.name}</div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div css={S.AttendBox}>
                        <div css={S.TimeItem}>
                            <h3>모두의 빈타임</h3>
                            <span>일정을 수정하려면 참석자별 이름을 누르세요</span>
                        </div>
                        <div css={S.TableBox}>
                            <table css={S.Table}>
                                <thead>
                                    <tr css={S.ThItem(participantColumnWidth)}>
                                        <th>일정</th>
                                        {participants.map((participant, index) => (
                                            <th key={index}>
                                                <span
                                                    css={S.ParticipantName}
                                                    onClick={() => handleParticipantNameClick(participant)}
                                                    title={participant.name} // 툴팁으로 전체 이름 표시
                                                >
                                                    {participant.name}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                {sortedTimeList.map((row, index) => (
                                    <tr key={index} css={[S.TdItem(participantColumnWidth), row.backgroundColor]}>
                                        <td>{formatDateString(row.time)}</td>
                                        {participants.map((participant, pIndex) => {
                                            const status = participant.checked[index];
                                            return (
                                                <td key={pIndex}>
                                                    {status === `yes_${index}` && <FaCheck  size={23} color="#000000"/>}
                                                    {status === `question_${index}` && <FaQuestion size={23} color="#DFE2E6"/>}
                                                    {status === `no_${index}` && <FaTimes size={28} color="#DFE2E6"/>}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* 모임 참석하기 버튼은 showAttendanceForm이 false이고 editingParticipant가 null일 때만 표시 */}
                    {!showAttendanceForm && !editingParticipant && (
                        <button css={S.AttendButton} onClick={() => setShowAttendanceForm(true)}>
                            참석자 추가하기
                        </button>
                    )}
                </div>
            )}

            {/* AttendanceEvent 컴포넌트는 showAttendanceForm이 true일 때만 표시 */}
            {showAttendanceForm && (
                <>
                    {participants.length > 0 && <div css={S.Divider}></div>}
                    <AttendanceEvent
                        eventData={eventData}
                        timeList={timeList}
                        existingParticipation={editingParticipant}
                        onClose={() => {
                            setShowAttendanceForm(false);
                            setEditingParticipant(null);
                        }}
                        hideBackButton={participants.length === 0 && !editingParticipant}
                    />
                </>
            )}
            <Footer />
        </div>
    );

};

export default AttendanceEventListPage;
