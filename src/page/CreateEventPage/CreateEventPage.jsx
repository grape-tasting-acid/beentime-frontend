import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import Calendar from 'react-calendar';
import moment from 'moment';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import img from '../../Img/image.png';
import { saveEvent, editEvent, getEvent } from '../../services/supabaseService';
import queryString from 'query-string';

function CreateEventPage(props) {
    const [selectedDates, setSelectedDates] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [eventData, setEventData] = useState({ title: '', detail: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const queryData = queryString.parse(location.search);
    const eventId = queryData.eventId ? JSON.parse(queryData.eventId) : null;

    useEffect(() => {
        console.log('Event ID:', eventId);
        if (eventId) {
            fetchEventData(eventId);
        }
    }, [eventId]);

    const fetchEventData = async (eventId) => {
        try {
            const response = await getEvent(eventId);
            setEventData(response);
            console.log('Fetched Event Data:', response);
            if (response.time) {
                const timeList = response.time.split(', ');
                setSelectedDates(timeList.map(time => {
                    const date = time.split(' / ')[0];
                    return moment(date, 'M월 D일').toDate();
                }));
                setTimeSlots(timeList.map(time => {
                    const hourMinute = time.split(' / ')[1];
                    const [hour, minute] = hourMinute.split(':');
                    return { value: `${hour}:${minute}`, label: `${hour}:${minute}` };
                }));
            }
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    const handleDateClick = (date) => {
        setSelectedDates([...selectedDates, date]);
        setTimeSlots([...timeSlots, { hour: null, minute: null, period: 'PM' }]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEventCreate = async () => {    
        console.log('handleEventCreate called');
        const title = document.querySelector('input[placeholder="ex. 개발팀 회식, 동아리 친목회"]').value;
        const detail = document.querySelector('input[placeholder="ex. 이번 프로젝트도 화이팅입니다!"]').value;
    
        if (!title.trim()) {
            alert('이벤트 제목을 입력해주세요.');
            return;
        }
        const isValidTimeSlot = timeSlots.every(slot => slot.hour !== null && slot.minute !== null);
    
        if (!isValidTimeSlot) {
            alert('시간을 선택해주세요.');
            return;
        }
    
        const eventList = selectedDates.map((date, index) => {
            const formattedDate = moment(date).format('M월 D일');
            const timeSlot = timeSlots[index];
            return `${formattedDate} / ${timeSlot.label}`;
        });
    
        try {
            if (!eventId) {
                const response = await saveEvent(title, detail, eventList);
                console.log('Event response:', response);
                if (response) {
                    console.log('Event created:', response);
                    sessionStorage.setItem('eventId', response[0].event_id);
                    alert("이벤트가 생성되었습니다.");
                    navigate('/sharing');
                }
            } else {
                const response = await editEvent(eventId, title, detail, eventList);
                console.log('Event response:', response);
                if (response) {
                    console.log('Event updated:', response);
                    sessionStorage.setItem('eventId', response[0].event_id);
                    alert("이벤트가 수정되었습니다.");
                    navigate('/sharing');
                }
            }
        } catch (error) {
            console.error('Error creating/editing event:', error);
        }
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const isToday = moment(date).isSame(moment(), 'day');
            return isToday ? <div css={S.TodayText}>오늘</div> : null;
        }
    };

    const SelectedDateBox = ({ date, index }) => {
        const handleTimeChange = (selectedOption) => {
            const newTimeSlots = [...timeSlots];
            newTimeSlots[index] = selectedOption;
            setTimeSlots(newTimeSlots);
        };

        const handleDeleteDate = () => {
            const newSelectedDates = [...selectedDates];
            const newTimeSlots = [...timeSlots];
            newSelectedDates.splice(index, 1);
            newTimeSlots.splice(index, 1);
            setSelectedDates(newSelectedDates);
            setTimeSlots(newTimeSlots);
        };

        const timeOptions = [];
        for (let hour = 12; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour === 12 ? 12 : hour - 12;
                const formattedMinute = minute < 10 ? `0${minute}` : minute;
                const label = `${formattedHour}:${formattedMinute} PM`;
                const value = `${formattedHour}:${formattedMinute}`;
                timeOptions.push({ value, label });
            }
        }

        for (let hour = 0; hour < 12; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour === 0 ? 12 : hour;
                const formattedMinute = minute < 10 ? `0${minute}` : minute;
                const label = hour === 0 && minute === 0 ? '00:00 AM' : `${formattedHour}:${formattedMinute} AM`;
                const value = hour === 0 && minute === 0 ? '00:00' : `${formattedHour}:${formattedMinute}`;
                timeOptions.push({ value, label });
            }
        }

        const index1230AM = timeOptions.findIndex(option => option.label === '12:30 AM');
        if (index1230AM !== -1) {
            timeOptions[index1230AM].label = '00:30 AM';
        }

        const formattedDate = moment(date);
        const formattedDateString = formattedDate.format('M월 D일');
        const formattedDayOfWeek = moment(date).locale('ko').format('dddd일');
        let dayOfWeekShort;

        switch (formattedDayOfWeek.substring(0, 3)) {
            case 'Mon':
                dayOfWeekShort = '일';
                break;
            case 'Tue':
                dayOfWeekShort = '월';
                break;
            case 'Wed':
                dayOfWeekShort = '화';
                break;
            case 'Thu':
                dayOfWeekShort = '수';
                break;
            case 'Fri':
                dayOfWeekShort = '목';
                break;
            case 'Sat':
                dayOfWeekShort = '금';
                break;
            case 'Sun':
                dayOfWeekShort = '토';
                break;
            default:
                dayOfWeekShort = '';
        }

        return (
            <div css={S.SelectedDateBox}>
                <div css={S.DateBox}>{formattedDateString} ({dayOfWeekShort})</div>
                <div css={S.Box}>
                    <Select
                        options={timeOptions}
                        onChange={handleTimeChange}
                        value={timeSlots[index]}
                    />
                </div>
                <button onClick={handleDeleteDate}>X</button>
            </div>
        );
    };

    return (
        <div css={S.Layout}>
            <div css={S.ImgBox}>
                <img src={img} alt='' />
            </div>
            <div css={S.Component}>
                <h1 css={S.Title}>이벤트를 만들어보세요</h1>
                <div css={S.Top}>
                    <h5>이벤트 제목</h5>
                    <input 
                        type="text" 
                        name="title"
                        placeholder='ex. 개발팀 회식, 동아리 친목회' 
                        value={eventData.title} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div css={S.Bottom}>
                    <h5>(선택) 이벤트 세부내용</h5>
                    <input 
                        type="text" 
                        name="detail"
                        placeholder='ex. 이번 프로젝트도 화이팅입니다!' 
                        value={eventData.detail} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div css={S.CalendarLayout}>
                    <div css={S.CalendarBox}>
                        <h5 css={S.H5}>가능한 빈타임</h5>
                        <div css={S.calendarContainer}>
                            <Calendar
                                defaultView={'month'}
                                formatMonthYear={(locale, date) => moment(date).local('ko').format('YYYY년 MM월')}
                                formatDay={(local, date) => moment(date).local('ko').format('DD')}
                                formatShortWeekday={(locale, date) => {
                                    const englishDay = moment(date).locale('en').format('dd');
                                    const koreanDays = {
                                        Su: '일',
                                        Mo: '월',
                                        Tu: '화',
                                        We: '수',
                                        Th: '목',
                                        Fr: '금',
                                        Sa: '토',
                                    };
                                    return koreanDays[englishDay];
                                }}
                                showNeighboringMonth={false}
                                onClickDay={(value) => handleDateClick(value)}
                                tileDisabled={({ date }) => moment(date).isBefore(moment().startOf('day'), 'day')}
                                tileClassName={({ date }) => {
                                    const formattedDate = moment(date).startOf('day').format('YYYY-MM-DD');
                                    const today = moment().startOf('day').format('YYYY-MM-DD');
                                    return formattedDate === today ? ' today' : '';
                                }}
                                tileContent={tileContent}
                                locale="en-US"
                            />
                        </div>
                    </div>
                    <div css={S.TimeBox}>
                        <div css={S.TimeBoxContainer}>
                            {selectedDates.length > 0 ? (
                                selectedDates.map((date, index) => (
                                    <SelectedDateBox key={index} date={date} index={index} />
                                ))
                            ) : (
                                <div css={S.PlaceHolder}>
                                    <div>선택된 날짜가 없어요.</div>
                                    <div>캘린더에서 날짜를 선택해주세요.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={handleEventCreate} css={selectedDates.length ? S.BtnTrue : S.BtnFalse}>
                    {eventId ? "이벤트 수정하기" : "이벤트 만들기"}
                </button>
            </div>
        </div>
    );
}

export default CreateEventPage;