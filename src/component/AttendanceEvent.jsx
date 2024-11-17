import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import supabase from '../api/instance';

import CheckSelectedIcon from '../Img/icon/checkSelected.svg'; 
import CheckUnselectedIcon from '../Img/icon/checkUnselected.svg';
import QuestionSelectedIcon from '../Img/icon/questionSelected.svg';
import QuestionUnselectedIcon from '../Img/icon/questionUnselected.svg';
import CrossSelectedIcon from '../Img/icon/crossSelected.svg';
import CrossUnselectedIcon from '../Img/icon/crossUnselected.svg';


const AttendanceEvent = ({ timeList, eventData, existingParticipation, onClose, hideBackButton }) => {
    const [selectedRadios, setSelectedRadios] = useState([]);
    const [attendeeName, setAttendeeName] = useState('');
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('eventId');

    useEffect(() => {
        if (timeList && timeList.length > 0) {
            if (existingParticipation) {
                // 기존 참여 정보가 있는 경우 선택된 라디오 버튼을 설정
                setSelectedRadios(existingParticipation.checked);
                setAttendeeName(existingParticipation.name);
            } else {
                // 새로운 참여인 경우 기본으로 "no" 선택
                const defaultRadios = timeList.map((_, index) => `no_${index}`);
                setSelectedRadios(defaultRadios);
            }
        }
    }, [timeList, existingParticipation]);

    const onChangeRadio = (e, index) => {
        const updatedRadios = [...selectedRadios];
        updatedRadios[index] = e.target.id;
        setSelectedRadios(updatedRadios);
    };

    const onNameChange = e => {
        setAttendeeName(e.target.value);
    };

    const onAttendClick = async () => {
        if (!attendeeName.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }

        if (selectedRadios.includes(null)) {
            alert('모든 시간대에 대해 응답해주세요.');
            return;
        }

        try {
            if (existingParticipation) {
                // 기존 참여 정보 수정
                const { data: updateData, error: updateError } = await supabase
                    .from('participation_tb')
                    .update({
                        checked: selectedRadios,
                    })
                    .eq('participation_id', existingParticipation.participation_id)
                    .select();

                if (updateError) {
                    throw updateError;
                }

                if (updateData) {
                    sessionStorage.setItem('name', JSON.stringify(attendeeName));
                    alert('참여 정보가 수정되었습니다.');
                    window.location.reload();
                }
            } else {
                // 새로운 참여 추가
                const { data: participationList = [], error: participationError } = await supabase
                    .from('participation_tb')
                    .select('*')
                    .eq('event_id', id)
                    .select();

                if (participationError) {
                    throw participationError;
                }

                const isAlreadyAttended = participationList.some(participation => participation.name === attendeeName);

                if (isAlreadyAttended) {
                    sessionStorage.setItem('name', JSON.stringify(attendeeName));
                    alert('이미 참여 완료한 모임입니다.');
                    window.location.reload();
                } else {
                    const data = {
                        name: attendeeName,
                        time: timeList,
                        checked: selectedRadios,
                        event_id: eventData.event_id
                    };

                    const { data: responseData, error: responseError } = await supabase
                        .from('participation_tb')
                        .insert([data])
                        .select();

                    if (responseError) {
                        throw responseError;
                    }

                    if (responseData) {
                        sessionStorage.setItem('name', JSON.stringify(attendeeName));
                        alert('참여 완료 하였습니다.');
                        window.location.reload();
                    }
                }
            }
        } catch (error) {
            console.error('Error during participation:', error);
        }
    };

    return (
        <div css={S.Layout}>
            <div css={S.Component}>
                <div css={S.AttendBox}>
                    <div css={S.InputItem}>
                        <h3>이름을 알려줘!</h3>
                        <input
                            type="text"
                            placeholder="홍길동"
                            value={attendeeName}
                            onChange={onNameChange}
                            disabled={!!existingParticipation} // 기존 참여자 이름은 수정 불가
                        />
                    </div>
                    <div css={S.TimeItem}>
                        <h3>나의 빈타임은?</h3>
                        <div css={S.TimeBox}>
                            {timeList?.map((date, index) => (
                                <div key={index} css={S.Times}>
                                    <h4>{date.split('/')[0]}</h4>
                                    <span>{date.split('/')[1]}</span>
                                    <div css={S.Btns}>
                                        {/* 체크 아이콘 */}
                                        <div css={S.Radio}>
                                            <input
                                                type="radio"
                                                id={`yes_${index}`}
                                                name={`check_${index}`}
                                                onChange={(e) => onChangeRadio(e, index)}
                                                checked={selectedRadios[index] === `yes_${index}`}
                                            />
                                            <label htmlFor={`yes_${index}`}>
                                                {selectedRadios[index] === `yes_${index}` ? (
                                                    <img src={CheckSelectedIcon} alt="참석 가능 선택됨" />
                                                ) : (
                                                    <img src={CheckUnselectedIcon} alt="참석 가능" />
                                                )}
                                            </label>
                                        </div>

                                        {/* 물음표 아이콘 */}
                                        <div css={S.Radio}>
                                            <input
                                                type="radio"
                                                id={`question_${index}`}
                                                name={`check_${index}`}
                                                onChange={(e) => onChangeRadio(e, index)}
                                                checked={selectedRadios[index] === `question_${index}`}
                                            />
                                            <label htmlFor={`question_${index}`}>
                                                {selectedRadios[index] === `question_${index}` ? (
                                                    <img src={QuestionSelectedIcon} alt="참석 미정 선택됨" />
                                                ) : (
                                                    <img src={QuestionUnselectedIcon} alt="참석 미정" />
                                                )}
                                            </label>
                                        </div>

                                        {/* 엑스 아이콘 */}
                                        <div css={S.Radio}>
                                            <input
                                                type="radio"
                                                id={`no_${index}`}
                                                name={`check_${index}`}
                                                onChange={(e) => onChangeRadio(e, index)}
                                                checked={selectedRadios[index] === `no_${index}`}
                                            />
                                            <label htmlFor={`no_${index}`}>
                                                {selectedRadios[index] === `no_${index}` ? (
                                                    <img src={CrossSelectedIcon} alt="참석 불가 선택됨" />
                                                ) : (
                                                    <img src={CrossUnselectedIcon} alt="참석 불가" />
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div css={S.ButtonContainer}>
                        {/* hideBackButton이 false일 때만 돌아가기 버튼 표시 */}
                        {!hideBackButton && (
                            <button css={S.CancelButton} onClick={onClose}>돌아가기</button>
                        )}
                        {/* hideBackButton이 true이면 버튼 크기 조절 */}
                        <button
                            css={hideBackButton ? S.LargeAttendButton : S.BtnTrue}
                            onClick={onAttendClick}
                        >
                            {existingParticipation ? '수정 완료' : '모임 참석하기'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default AttendanceEvent;