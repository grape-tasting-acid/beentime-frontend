import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import img from '../../Img/change.png';
import img2 from '../../Img/main.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa'; 
import { getParticipation, saveParticipation } from '../../services/supabaseService';

const AttendanceListPage = () => {
    const navigate = useNavigate();
    const attendanceName = JSON.parse(sessionStorage.getItem('name'));
    const [editBtn, setEditBtn] = useState(true);
    const [selectedName, setSelectedName] = useState('');
    const [selectedRadios, setSelectedRadios] = useState([]);
    const [eventData, setEventData] = useState(null);
    const [memo, setMemo] = useState('');
    const [timeList, setTimeList] = useState([]);
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();
    const eventId = localStorage.getItem('eventId');
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('eventId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const participationList = await getParticipation(id);
                console.log('Participation List:', participationList); // 데이터 확인 로그 추가

                if (participationList.length === 0) {
                    console.warn('No participation data found.');
                    return;
                }

                setTitle(participationList[0]?.event_tb?.title);
                setDetail(participationList[0]?.event_tb?.detail);
                setEventData(participationList);

                const checkedByNames = [];
                const timeByNames = [];

                const uniqueTimes = Array.from(new Set(participationList.map(item => item.time))).map(time => time.replace(/\//g, ''));
                setTimeList(Array.from(new Set(participationList.map(item => item.time))));

                participationList.forEach(item => {
                    checkedByNames.push(item.checked);
                    timeByNames.push(item.time);
                });

                setEventData(prevData => ({
                    ...prevData,
                    checkedByNames,
                    uniqueTimes
                }));
            } catch (error) {
                console.error('Error fetching participation data:', error);
            }
        };
        fetchData();
    }, [id]);
    
    const onEditClick = () => {
        const queryData = new URLSearchParams();
        queryData.append('eventId', JSON.stringify(eventId));
        navigate(`/?${queryData.toString()}`);
    };

    const onAttendClick = async () => {
        const data = {
            name: attendanceName,
            time: timeList,
            checked: selectedRadios,
            memo: memo,
            event_id: eventData.event_id // 수정된 부분
        };
        const response = await saveParticipation(eventData.event_id, attendanceName, selectedRadios, memo, timeList);
        if(response.data) {
            window.location.reload();
        } else {
            alert("수정에 실패하였습니다.");
        }
    };

    const onClickBack = () => {
        setSelectedName('');
    };

    const EditClick = (name) => {
        if (name === attendanceName) {
            setSelectedName(name);
        } else {
            setSelectedName('');
        }
        setEditBtn(false);
    };

    const onChangeRadio = (e, index) => {
        const updatedRadios = [...selectedRadios];
        updatedRadios[index] = e.target.id;
        setSelectedRadios(updatedRadios);
    };

    const onMemoChange = e => {
        setMemo(e.target.value);
    };

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
                                    {eventData && Object.keys(eventData).map((key, index) => {
                                        if (key !== 'checkedByNames' && key !== 'timeByNames') {
                                            const item = eventData[key];
                                            return (
                                                <th key={index}>
                                                    <div onClick={() => EditClick(item.name)}>{item.name}</div>
                                                </th>
                                            );
                                        }
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {eventData && eventData.uniqueTimes.map((times, index) => (
                                    <React.Fragment key={index}>
                                        {times.split(', ').map((timeData, idx) => {
                                            const [date, time] = timeData.split('  ');
                                            const allChecked = eventData.checkedByNames.every(checked => checked.split(', ')[idx].includes('yes'));
                                            const mixedCheckQuestion = eventData.checkedByNames.some(checked => checked.split(', ')[idx].includes('yes')) && eventData.checkedByNames.some(checked => checked.split(', ')[idx].includes('question'));
                                            return (
                                                <tr key={`${index}_${idx}`} css={S.TdItem}>
                                                    <td>{date} {time}</td>
                                                    {eventData.checkedByNames.map((checked, nameIndex) => {
                                                        const statusList = checked.split(', ');
                                                        const status = statusList[idx];
                                                        const statusIcon = status.includes('yes') ? <FaCheck /> : status.includes('question') ? <FaQuestion /> : <FaTimes />;
                                                        const backgroundColor = mixedCheckQuestion ? S.BlueBackground : allChecked ? S.GreenBackground : null;
                                                        return (
                                                            <td key={nameIndex} css={backgroundColor}>
                                                                {statusIcon}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div css={S.Line}>
                {selectedName === attendanceName &&
                    <div css={S.Layout}>
                        <div css={S.Component}>
                            <div css={S.AttendBox}>
                                <div css={S.InputItem}>
                                    <h3>참석자 이름</h3>
                                    <input type="text" placeholder="이름을 입력하세요" value={selectedName} disabled/>
                                </div>
                                <div css={S.TimeItem}>
                                    <h3>나의 빈타임</h3>
                                    <div css={S.TimeBox}>
                                        {timeList[0]?.split(', ').map((date, index) => (
                                            <React.Fragment key={index}>
                                                <div key={index} css={S.Times}>
                                                    <div css={S.Date}>
                                                        <h4>{date.split('/')[0]}</h4>
                                                        <span>{date.split('/')[1]}</span>
                                                    </div>
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
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            <div css={S.InputItem}>
                                <h3>메모</h3>
                                <input type="text" placeholder="특이사항을 적어주세요" value={memo} onChange={onMemoChange}/>
                            </div>
                        </div>
                    </div>
                        <div css={S.BtnBox}>
                            <button onClick={onClickBack} css={S.BtnLeft}>돌아가기</button>
                            <button onClick={onAttendClick} css={S.BtnRight}>수정완료</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default AttendanceListPage;
