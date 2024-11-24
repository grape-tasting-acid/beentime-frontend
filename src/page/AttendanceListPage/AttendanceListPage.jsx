import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import img from '../../Img/change.png';
import tableImage from '../../Img/table1.png'; // 테이블 이미지
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa'; 
import { getParticipation } from '../../services/supabaseService';

const characterImages = Array.from({ length: 20 }, (_, i) => require(`../../Img/characters/character${i}.svg`));

const AttendanceListPage = () => {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('eventId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const participationList = await getParticipation(id);
                console.log('Participation List:', participationList);

                if (participationList.length === 0) {
                    console.warn('No participation data found.');
                    return;
                }

                setTitle(participationList[0]?.event_tb?.title);
                setDetail(participationList[0]?.event_tb?.detail);

                const times = JSON.parse(participationList[0].time);
                setTimeList(times);

                const parsedParticipationData = participationList.map(item => ({
                    name: item.name,
                    character_index: item.character_index,
                    checked: JSON.parse(item.checked)
                }));
                setEventData(parsedParticipationData);

            } catch (error) {
                console.error('Error fetching participation data:', error);
            }
        };
        fetchData();
    }, [id]);

    const onEditClick = () => {
        navigate(`/?eventId=${id}`);
    };

    // 날짜 형식을 변환하는 함수
    const formatDateString = (dateString) => {
        const [datePart, timePart] = dateString.split(' / ');
        const [month, day] = datePart.split('월 ').map(s => s.replace('일', ''));
        return (
            <span>
                <strong>{`${month}.${day}`}</strong> {timePart}
            </span>
        );
    };

    // 각 줄의 배경색을 설정하는 함수
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

    // 시간을 정렬한 리스트 생성
    const sortedTimeList = getRowBackgroundColor(
        timeList.map((time, timeIndex) => {
            const statuses = eventData.map(participant => participant.checked[timeIndex]);
            return { time, statuses };
        })
    );

    const getRandomCharacterPlacements = () => {
        const placements = [];
        const usedPositions = new Set(); // 사용된 위치를 추적
        const usedCharacters = new Set(); // 사용된 캐릭터를 추적

        for (let i = 0; i < eventData.length; i++) {
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
                <div css={S.ImgBox}>
                    <img src={img} alt="Change" />
                </div>
                <div css={S.HeaderBox}>
                    <div css={S.HeaderItem}>
                        <h1>{title}</h1>
                        <button onClick={onEditClick} css={S.EventEdit}>이벤트 수정</button>
                    </div>
                    <h3>{detail}</h3>
                </div>
            </div>
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
                                    {eventData.map((participant, index) => (
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
                                        {eventData.map((participant, pIndex) => {
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
        </div>
    );
};

export default AttendanceListPage;
