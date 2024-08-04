import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import img from '../../Img/change.png';
import img2 from '../../Img/main.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa'; 
import { getParticipation } from '../../services/supabaseService';

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

    const formatDateString = (dateString) => {
        const [datePart, timePart] = dateString.split(' / ');
        const [month, day] = datePart.split('월 ').map(s => s.replace('일', ''));
        const date = new Date(`2023-${month}-${day}`);  // 임의의 연도로 Date 객체 생성
        const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' }); // 요일 추출
        return (
            <span>
                <strong>{`${month}.${day}(${dayOfWeek})`}</strong> {timePart}
            </span>
        );
    };

    const sortedTimeList = getRowBackgroundColor(timeList.map((time, timeIndex) => {
        const statuses = eventData.map(participant => participant.checked[timeIndex]);
        return { time, statuses };
    }));

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
                <div css={S.MainImgBox}>
                    <img src={img2} alt="Main" />
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
