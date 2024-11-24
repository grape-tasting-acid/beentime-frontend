    import React, { useState, useEffect, useRef } from 'react';
    /** @jsxImportSource @emotion/react */
    import * as S from '../AttendanceEventPage/Style';
    import mainLogo from '../../Img/main_logo.svg';
    import tableImage1 from '../../Img/tables/table1.svg';
    import tableImage2 from '../../Img/tables/table2.svg';
    import tableImage3 from '../../Img/tables/table3.svg';
    import CheckIcon from '../../Img/icon/checkIcon.svg';
    import QuestionIcon from '../../Img/icon/questionIcon.svg';
    import CrossIcon from '../../Img/icon/crossIcon.svg';
    import editLogo from '../../Img/edit_logo.svg';
    import Footer from '../../component/footer/Footer';
    import { useNavigate, useLocation, Link } from 'react-router-dom';
    import AttendanceEvent from '../../component/AttendanceEvent';
    import { getEvent, getParticipation, getParticipationName } from '../../services/supabaseService';
    import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';

    const characterImages = Array.from({ length: 20 }, (_, i) => require(`../../Img/characters/character${i}.svg`));

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
        const [tableImage, setTableImage] = useState(tableImage1);
        const attendanceEventRef = useRef(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    // 이벤트 데이터를 가져오기
                    const eventResponse = await getEvent(id);
                    if (eventResponse && eventResponse.length > 0) {
                        const event = eventResponse[0];
                        setEventData(event);

                        switch (event.imageIndex) {
                            case 0:
                            setTableImage(tableImage1);
                            break;
                            case 1:
                            setTableImage(tableImage2);
                            break;
                            case 2:
                            setTableImage(tableImage3);
                            break;
                            default:
                            setTableImage(tableImage1); // 기본값
                        }

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
                            character_index: item.character_index,
                            checked: JSON.parse(item.checked),
                            participation_id: item.participation_id, // participation_tb의 primary key
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

        useEffect(() => {
            if (showAttendanceForm && attendanceEventRef.current) {
                attendanceEventRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, [showAttendanceForm, editingParticipant]);

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
            // 빈 배열이거나 유효하지 않은 입력 처리
            if (!rows || rows.length === 0) {
                return [];
            }
        
            // 각 행에 대해 yesCount와 questionCount를 계산
            const rankedRows = rows.map((row) => {
                if (!row.statuses) return { ...row, yesCount: 0, questionCount: 0, noCount: 0 };
                
                const yesCount = row.statuses.filter((status) => status?.includes('yes')).length;
                const questionCount = row.statuses.filter((status) => status?.includes('question')).length;
                const noCount = row.statuses.filter((status) => status?.includes('no')).length;
                return { ...row, yesCount, questionCount, noCount };
            });
        
            // 빈 배열이 아닌 경우에만 정렬 진행
            if (rankedRows.length === 0) {
                return [];
            }
        
            // yesCount 기준으로 내림차순 정렬, 같으면 questionCount 기준으로 정렬
            const sortedCounts = [...rankedRows].sort((a, b) => {
                if (b.yesCount !== a.yesCount) {
                    return b.yesCount - a.yesCount; // yesCount가 높은 순서
                } else {
                    return b.questionCount - a.questionCount; // questionCount가 높은 순서
                }
            });
        
            let rank = 1;
            sortedCounts[0].rank = rank;
            for (let i = 1; i < sortedCounts.length; i++) {
                const prevRow = sortedCounts[i - 1];
                const currentRow = sortedCounts[i];
                if (
                    currentRow.yesCount === prevRow.yesCount &&
                    currentRow.questionCount === prevRow.questionCount
                ) {
                    currentRow.rank = rank;
                } else {
                    rank += 1;
                    currentRow.rank = rank;
                }
            }


            const totalParticipants = rows[0]?.statuses.length || 0;

            // Color mapping object
            const colorMapping = {};

            // Green days
            const greenDays = sortedCounts.filter(
                (row) => row.rank === 1 && row.noCount === 0
            );
            greenDays.forEach((row) => {
                colorMapping[row.time] = S.GreenBackground;
            });

            // Blue days
            const blueDays = sortedCounts.filter(
                (row) => row.rank === 2 && row.noCount <= totalParticipants / 2
            );
            blueDays.forEach((row) => {
                colorMapping[row.time] = S.BlueBackground;
            });

            // Set topDates based on the rules
            if (greenDays.length > 0) {
                topDates = greenDays.map((row) => row.time);
            } else if (blueDays.length > 0) {
                topDates = blueDays.map((row) => row.time);
            } else {
                topDates = []; // No matching times
            }

            // Assign colors to each row
            return rows.map((row) => ({
                ...row,
                backgroundColor: colorMapping[row.time] || null,
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
            tooltipMessage = <span>아직은 나 혼자 뿐인가...</span>;
        } else if (participantCount === 2) {
            tooltipMessage = <span>오 친구가 생겼군!</span>;
        } else if (participantCount >= 3) {
            if (topDates.length > 0) {
                // Format the most probable dates
                const formattedDates = topDates.map((dateString) => {
                    const datePart = dateString.split(' / ')[0]; // e.g., '5월 20일 (금)'
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
                        ))}{' '}
                        이구만~!!!
                    </span>
                );
            } else {
                tooltipMessage = <span>맞는 시간이 없구만...</span>;
            }
        }

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

        // 테이블 및 참석자 배치 계산
        const participantsPerTable = 10;
        const maxTables = 2;
        const numTables = Math.ceil(participants.length / participantsPerTable);
        const actualTables = Math.min(numTables, maxTables);

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
        
            // 테이블 설정
            const tableWidth = 720; // 각 테이블의 너비
            const tableGap = 50; // 테이블 간 간격
            const totalTableWidth = actualTables * tableWidth + (actualTables - 1) * tableGap;
        
            // 첫 번째 테이블의 시작 X 위치
            const startX = -(totalTableWidth / 2) + tableWidth / 2;
        
            for (let t = 0; t < actualTables; t++) {
                // 각 테이블에 대한 처리
                const tableParticipants = participants.slice(t * participantsPerTable, (t + 1) * participantsPerTable);
                const tablePositionX = startX + t * (tableWidth + tableGap);
        
                const topParticipants = [];
                const bottomParticipants = [];
        
                // 참가자를 윗줄과 아랫줄로 분리
                tableParticipants.forEach((participant, index) => {
                    if (index % 2 === 0) {
                        topParticipants.push(participant);
                    } else {
                        bottomParticipants.push(participant);
                    }
                });
        
                // 캐릭터 배치 설정
                const characterWidth = 104;
                const characterSpacing = 16;
        
                // 윗줄 캐릭터 배치
                const topRowCount = topParticipants.length;
                const totalTopRowWidth = topRowCount * characterWidth + (topRowCount - 1) * characterSpacing;
        
                let startXTop;
                if (t === 0) {
                    startXTop = tablePositionX - totalTopRowWidth / 2 + characterWidth / 2 + tableWidth / 2;
                } else {
                    startXTop = -totalTopRowWidth / 2 + characterWidth / 2;
                }
        
                topParticipants.forEach((participant, i) => {
                    const leftPosition = startXTop + i * (characterWidth + characterSpacing);

                    placements.push({
                        tableIndex: t,
                        row: 'top',
                        position: leftPosition - startX,
                        character: characterImages[participant.character_index],
                        name: participant.name,
                    });
                });
        
                // 아랫줄 캐릭터 배치
                const bottomRowCount = bottomParticipants.length;
                const totalBottomRowWidth = bottomRowCount * characterWidth + (bottomRowCount - 1) * characterSpacing;
        
                let startXBottom;
                if (t === 0) {
                    startXBottom = tablePositionX - totalBottomRowWidth / 2 + characterWidth / 2 + tableWidth / 2;
                } else {
                    startXBottom = -totalBottomRowWidth / 2 + characterWidth / 2;
                }
        
                bottomParticipants.forEach((participant, i) => {
                    const leftPosition = startXBottom + i * (characterWidth + characterSpacing);
                    const character = getUniqueCharacter(usedCharacters);
        
                    placements.push({
                        tableIndex: t,
                        row: 'bottom',
                        position: leftPosition - startX,
                        character: characterImages[participant.character_index],
                        name: participant.name,
                    });
                });
            }
        
            return placements;
        }
        

        const characterPlacements = getFixedCharacterPlacements();

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

                            {/* 캐릭터+캡션+테이블 이미지 컨테이너 */}
                            <div css={S.CharacterAndTableContainer(actualTables)}>
                                {Array.from({ length: actualTables }).map((_, t) => (
                                    <div key={t} css={S.TableAndCharactersWrapper(t)}>
                                        <img src={tableImage} alt="Table" css={S.TableImage} />
                                        {characterPlacements
                                            .filter(p => p.tableIndex === t)
                                            .map((placement, index) => (
                                                <div key={index} css={S.CharacterContainer(placement.position, placement.row)}>
                                                    {placement.row === 'top' ? (
                                                        <>
                                                            <div css={S.CharacterName(placement.row)}>
                                                                {placement.name.length > 6 ? `${placement.name.slice(0, 6)}...` : placement.name}
                                                            </div>
                                                            <img src={placement.character} alt={`Character ${index + 1}`} css={S.CharacterImage} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <img src={placement.character} alt={`Character ${index + 1}`} css={S.CharacterImage} />
                                                            <div css={S.CharacterName(placement.row)}>
                                                                {placement.name.length > 6 ? `${placement.name.slice(0, 6)}...` : placement.name}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
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
                                                        {status === `yes_${index}` && <img src={CheckIcon} alt="참석 가능" width={30} height={30} />}
                                                        {status === `question_${index}` && <img src={QuestionIcon} alt="참석 미정" width={30} height={30} />}
                                                        {status === `no_${index}` && <img src={CrossIcon} alt="참석 불가" width={30} height={30} />}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        {/* 모임 참석하기 버튼은 showAttendanceForm이 false이고 editingParticipant가 null일 때만 표시 */}
                        {!showAttendanceForm && !editingParticipant && (
                            <button css={S.AttendButton} onClick={() => setShowAttendanceForm(true)}>
                                참석자 추가하기
                            </button>
                        )}
                        </div>
                    </div>
                )}

                {/* AttendanceEvent 컴포넌트는 showAttendanceForm이 true일 때만 표시 */}
                {showAttendanceForm && (
                    <>
                        {participants.length > 0 && <div css={S.Divider}></div>}
                        <div ref={attendanceEventRef}>
                            <AttendanceEvent
                                eventData={eventData}
                                timeList={timeList}
                                existingParticipation={editingParticipant}
                                onClose={() => {
                                    setShowAttendanceForm(false);
                                    setEditingParticipant(null);
                                }}
                                hideBackButton={!editingParticipant}
                            />
                        </div>
                    </>
                )}
                <Footer />
            </div>
        );

    };

    export default AttendanceEventListPage;
