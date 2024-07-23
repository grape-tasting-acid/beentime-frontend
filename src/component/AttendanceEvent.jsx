import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../api/instance';

const AttendanceEvent = ({ children, timeList, eventData }) => {
    const navigate = useNavigate();
    const [selectedRadios, setSelectedRadios] = useState([]);
    const [attendeeName, setAttendeeName] = useState('');
    const [memo, setMemo] = useState('');
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('eventId');

    useEffect(() => {
        if (timeList && timeList.length > 0) {
            setSelectedRadios(new Array(timeList.length).fill(null));
        }
    }, [timeList]);

    console.log('Event ID:', id);
    console.log('Time List:', timeList);

    const onChangeRadio = (e, index) => {
        const updatedRadios = [...selectedRadios];
        updatedRadios[index] = e.target.id;
        setSelectedRadios(updatedRadios);
    };

    const onNameChange = e => {
        setAttendeeName(e.target.value);
    };

    const onMemoChange = e => {
        setMemo(e.target.value);
    };

    const onAttendClick = async () => {
        try {
            const { data: participationList = [], error: participationError } = await supabase
                .from('participation_tb')
                .select('*')
                .eq('event_id', id);

            if (participationError) {
                throw participationError;
            }

            const isAlreadyAttended = participationList.some(participation => participation.name === attendeeName);

            if (isAlreadyAttended) {
                sessionStorage.setItem('name', JSON.stringify(attendeeName));
                alert('이미 참여 완료한 이벤트입니다.');
                window.location.href = `${window.location.origin}/list?eventId=${encodeURIComponent(id)}`;
            } else {
                const data = {
                    name: attendeeName,
                    time: timeList,
                    checked: selectedRadios,
                    memo: memo,
                    event_id: eventData.event_id // 수정된 부분
                };

                const { data: responseData, error: responseError } = await supabase
                    .from('participation_tb')
                    .insert([data]);

                if (responseError) {
                    throw responseError;
                }

                if (responseData) {
                    sessionStorage.setItem('name', JSON.stringify(attendeeName));
                    alert('참여 완료 하였습니다.');
                    window.location.href = `${window.location.origin}/list?eventId=${encodeURIComponent(id)}`;
                }
            }
        } catch (error) {
            console.error('Error during participation:', error);
        }
    };

    return (
        <div css={S.Layout}>
            {children}
            <div css={S.Component}>
                <div css={S.AttendBox}>
                    <div css={S.InputItem}>
                        <h3>참석자 이름</h3>
                        <input type="text" placeholder="이름을 입력하세요" value={attendeeName} onChange={onNameChange} />
                    </div>
                    <div css={S.TimeItem}>
                        <h3>나의 빈타임</h3>
                        <div css={S.TimeBox}>
                            {timeList?.map((date, index) => (
                                <div key={index} css={S.Times}>
                                    <h4>{date.split('/')[0]}</h4>
                                    <span>{date.split('/')[1]}</span>
                                    <div css={S.Btns}>
                                        <div css={S.Radio}>
                                            <input type="radio" id={`yes_${index}`} name={`check_${index}`} onChange={(e) => onChangeRadio(e, index)} />
                                            <label htmlFor={`yes_${index}`}><FaCheck /></label>
                                        </div>
                                        <div css={S.Radio}>
                                            <input type="radio" id={`question_${index}`} name={`check_${index}`} onChange={(e) => onChangeRadio(e, index)} />
                                            <label htmlFor={`question_${index}`}><FaQuestion /></label>
                                        </div>
                                        <div css={S.Radio}>
                                            <input type="radio" id={`no_${index}`} name={`check_${index}`} onChange={(e) => onChangeRadio(e, index)} />
                                            <label htmlFor={`no_${index}`}><FaTimes /></label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div css={S.InputItem}>
                        <h3>메모</h3>
                        <input type="text" placeholder="특이사항을 적어주세요" value={memo} onChange={onMemoChange}/>
                    </div>
                    <button css={S.BtnTrue} onClick={onAttendClick}>이벤트 참석하기</button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceEvent;
