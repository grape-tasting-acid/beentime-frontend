import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from '../AttendanceEventPage/Style';
import img from '../../Img/change.png';
import { useNavigate, useLocation } from 'react-router-dom';
import AttendanceEvent from '../../component/AttendanceEvent';
import { getEvent, getParticipationName } from '../../services/supabaseService';

const AttendanceEventPage = () => {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const name = JSON.parse(sessionStorage.getItem('name'));
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('eventId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching event for ID:', id);
                const response = await getEvent(id);

                if (response && response.length > 0) {
                    const event = response[0]; // 배열의 첫 번째 요소를 사용
                    setEventData(event);
                    console.log('Event data:', event);

                    if (event.time) {
                        const parsedTime = JSON.parse(event.time); // JSON 파싱 추가
                        console.log('Parsed time:', parsedTime);
                        setTimeList(parsedTime);
                    } else {
                        console.log('No time data available.');
                    }
                } else {
                    console.log('No event data found.');
                }

                const response1 = await getParticipationName(id, name);
                if (response1.data > 0) {
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

    console.log('Event data:', eventData);
    console.log('Time list:', timeList);

    return (
        <div css={S.Layout}>
            <div css={S.Header}>
                <div css={S.ImgBox}>
                    <img src={img} alt="" />
                </div>
                <div css={S.HeaderBox}>
                    <div css={S.HeaderItem}>
                        <h1>{eventData?.title}</h1>
                        <button onClick={onEditClick}>이벤트 수정</button>
                    </div>
                    <h3>{eventData?.detail}</h3>
                </div>
            </div>
            <AttendanceEvent eventData={eventData} timeList={timeList} />
            <div css={S.BtnBox}></div>
        </div>
    );
};

export default AttendanceEventPage;