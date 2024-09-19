import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from '../AttendanceEventPage/Style';
import mainLogo from '../../Img/main_logo.png';
import tableImage from '../../Img/table1.png'; // 테이블 이미지
import { useNavigate, useLocation } from 'react-router-dom';
import AttendanceEvent from '../../component/AttendanceEvent';
import { getEvent, getParticipation, getParticipationName } from '../../services/supabaseService';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';

const characterImages = Array.from({ length: 10 }, (_, i) => require(`../../Img/characters/character${i + 1}.png`));

const AttendanceEventListPage = () => {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [participants, setParticipants] = useState([]);
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
                        checked: JSON.parse(item.checked)
                    }));
                    setParticipants(parsedParticipationData);

                    const times = JSON.parse(participationList[0].time);
                    setTimeList(times);
                }

                // 만약 사용자가 이미 참여했다면 리스트 페이지로 이동
                const participationResponse = await getParticipationName(id, name);
                if (participationResponse.data > 0) {
                    window.location.href = `${window.location.origin}/list?eventId=${encodeURIComponent(id)}`;
                }
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchData();
    }, [id, name]);

    const onEditClick = () => {
        navigate('/');
    };

    const formatDateString = (dateString) => {
        const [datePart, timePart] = dateString.split(' / ');
        const [month, day] = datePart.split('월 ').map(s => s.replace('일', ''));
        return (
            <span>
                <strong>{`${month}.${day}`}</strong> {timePart}
            </span>
        );
    };

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

        const colorMapping = sortedCounts.reduce((acc, row, index) => {
            acc[row.time] = index === 0 ? S.GreenBackground : index === 1 ? S.BlueBackground : null;
            return acc;
        }, {});

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

    const getRandomCharacterPlacements = () => {
        const placements = [];
        const usedPositions = new Set(); // 사용된 위치를 추적
        const usedCharacters = new Set(); // 사용된 캐릭터를 추적

        for (let i = 0; i < participants.length; i++) {
            let position;
            do {
                position = Math.floor(Math.random() * 5); // 0~4의 랜덤 위치를 선택
            } while (usedPositions.has(position));
            usedPositions.add(position);

            let characterIndex;
            do {
                characterIndex = Math.floor(Math.random() * characterImages.length);
            } while (usedCharacters.has(characterIndex));
            usedCharacters.add(characterIndex);

            const isFront = Math.random() < 0.5;  // 앞줄과 뒷줄에 랜덤으로 배치

            placements.push({
                position,
                character: characterImages[characterIndex],
                isFront
            });
        }

        return placements;
    };

    const characterPlacements = getRandomCharacterPlacements();

    return (
        <div css={S.Layout}>
            <div css={S.Header}>
                <div css={S.HeaderBox}>
                    <div css={S.ImgBox}>
                        <img src={mainLogo} alt="Main Logo" />
                    </div>
                    <div css={S.HeaderItem}>
                        <h1>{eventData?.title}</h1>
                        <button onClick={onEditClick}>모임 수정하기</button>
                    </div>
                    <h3>{eventData?.detail}</h3>
                </div>
            </div>

            {/* 참여자가 있을 때 리스트 컴포넌트 표시 */}
            {participants.length > 0 && (
                <div css={S.Component}>
                    <div css={S.MainImgBox} style={{ marginTop: '294px', marginBottom: '134px' }}>
                        <div css={S.TableContainer}>
                            <img src={tableImage} alt="Table" css={S.TableImage} />
                            {characterPlacements.map((placement, index) => {
                                const leftPosition = 68 + placement.position * (104 + 16); // 첫 위치는 68px, 간격은 16px

                                return (
                                    <img
                                        key={index}
                                        src={placement.character}
                                        alt={`Character ${index + 1}`}
                                        css={placement.isFront ? S.FrontCharacter : S.BackCharacter}
                                        style={{ left: `${leftPosition}px` }}
                                    />
                                );
                            })}
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
                                    <tr css={S.ThItem}>
                                        <th>일정</th>
                                        {participants.map((participant, index) => (
                                            <th key={index}>
                                                {participant.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTimeList.map((row, rowIndex) => (
                                        <tr key={rowIndex} css={[S.TdItem, row.backgroundColor]}>
                                            <td>{formatDateString(row.time)}</td>
                                            {participants.map((participant, pIndex) => {
                                                const status = participant.checked[rowIndex];
                                                return (
                                                    <td key={pIndex}>
                                                        {status === `yes_${rowIndex}` && <FaCheck />}
                                                        {status === `question_${rowIndex}` && <FaQuestion />}
                                                        {status === `no_${rowIndex}` && <FaTimes />}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 참여 신청 컴포넌트는 항상 표시 */}
            <AttendanceEvent eventData={eventData} timeList={timeList} />
        </div>
    );
};

export default AttendanceEventListPage;