import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import Calendar from 'react-calendar';
import moment from 'moment';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../Img/logo/Logo.svg';

import table1 from '../../Img/tables/table1.svg';
import table2 from '../../Img/tables/table2.svg';
import table3 from '../../Img/tables/table3.svg';

import { saveEvent, editEvent, getEvent } from '../../services/supabaseService';
import queryString from 'query-string';

function CreateEventPage(props) {
    const [selectedDates, setSelectedDates] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [eventData, setEventData] = useState({ title: ''});
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const queryData = queryString.parse(location.search);
    const eventId = queryData.eventId ? JSON.parse(queryData.eventId) : null;

    useEffect(() => {
        if (eventId) {
            fetchEventData(eventId);
        }
    }, [eventId]);

    const fetchEventData = async (eventId) => {
        try {
            const response = await getEvent(eventId);
            if (response && response.length > 0) {
                const event = response[0];
                setEventData(event);
                setSelectedImage(event.imageIndex); // 선택된 이미지 인덱스 설정 (추가 필요 시)

                if (event.time) {
                    const timeList = event.time.split(', ');
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
            }
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    const handleDateClick = (date) => {
        const newSelectedDates = [...selectedDates, date];
        const newTimeSlots = [...timeSlots, { value: '7:00', label: '7:00 PM' }];
    
        // 날짜와 시간 슬롯을 함께 정렬
        const sortedData = newSelectedDates.map((date, index) => ({
            date,
            timeSlot: newTimeSlots[index],
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
        setSelectedDates(sortedData.map(item => item.date));
        setTimeSlots(sortedData.map(item => item.timeSlot));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEventCreate = async () => {
        const title = document.querySelector('input[placeholder="ex. 개발팀 회식, 동아리 친목회"]').value;

        if (!title.trim()) {
            alert('모임 제목을 입력해주세요.');
            return;
        }
        const isValidTimeSlot = timeSlots.every(slot => slot.value !== '');

        if (!isValidTimeSlot) {
            alert('시간을 선택해주세요.');
            return;
        }

        const eventList = selectedDates.map((date, index) => {
            const formattedDate = moment(date).format('M월 D일');
            let dayOfWeekShort = moment(date).locale('ko').format('ddd');
            const timeSlot = timeSlots[index];
            switch (dayOfWeekShort) {
                case 'Mon':
                    dayOfWeekShort = '월';
                    break;
                case 'Tue':
                    dayOfWeekShort = '화';
                    break;
                case 'Wed':
                    dayOfWeekShort = '수';
                    break;
                case 'Thu':
                    dayOfWeekShort = '목';
                    break;
                case 'Fri':
                    dayOfWeekShort = '금';
                    break;
                case 'Sat':
                    dayOfWeekShort = '토';
                    break;
                case 'Sun':
                    dayOfWeekShort = '일';
                    break;
                default:
                    dayOfWeekShort = '';
            }
            return `${formattedDate} (${dayOfWeekShort}) / ${timeSlot.label}`;
        });

        try {
            if (!eventId) {
                const response = await saveEvent(title, eventList);
                if (response) {
                    sessionStorage.setItem('eventId', response[0].event_id);
                    alert("모임이 생성되었습니다.");
                    navigate('/sharing');
                }
            } else {
                const response = await editEvent(eventId, title, eventList);
                if (response) {
                    sessionStorage.setItem('eventId', response[0].event_id);
                    alert("모임이 수정되었습니다.");
                    navigate('/sharing');
                }
            }
        } catch (error) {
            console.error('Error creating/editing event:', error);
        }
    };

    const handleImageSelect = (imageIndex) => {
        setSelectedImage(imageIndex);
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
        
            // 날짜와 시간 슬롯을 함께 정렬
            const sortedData = newSelectedDates.map((date, index) => ({
                date,
                timeSlot: newTimeSlots[index],
            })).sort((a, b) => new Date(a.date) - new Date(b.date));
        
            setSelectedDates(sortedData.map(item => item.date));
            setTimeSlots(sortedData.map(item => item.timeSlot));
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
                dayOfWeekShort = '월';
                break;
            case 'Tue':
                dayOfWeekShort = '화';
                break;
            case 'Wed':
                dayOfWeekShort = '수';
                break;
            case 'Thu':
                dayOfWeekShort = '목';
                break;
            case 'Fri':
                dayOfWeekShort = '금';
                break;
            case 'Sat':
                dayOfWeekShort = '토';
                break;
            case 'Sun':
                dayOfWeekShort = '일';
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
        <div css={S.Layout} style={{ paddingTop: '100px' }}>
            <div css={S.Component}>
                {/* 로고를 가운데 중앙에 배치 */}
                <img src={logo} alt="Logo" css={S.LogoImage} />

                {/* 어떤 모임이야? 선택 부분 추가 */}
                <div css={S.Top}>
                    <h5>어떤 모임이야?</h5>
                    <div css={S.SelectImagesContainer}>
                        {/* 밥모임 이미지 */}
                        <div>
                            <div css={S.ImageContainer(selectedImage === 0)}>
                                <img
                                    src={table1}
                                    alt="밥모임"
                                    onClick={() => handleImageSelect(0)}
                                    style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                                />
                                {selectedImage === 0 && (
                                    <div css={S.CheckboxIcon} aria-label="선택됨">
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path 
                                                d="M4 12l6 6L18 6" 
                                                stroke="white" 
                                                strokeWidth="4" 
                                                fill="none" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div css={S.ImageLabel}>밥모임</div>
                        </div>

                        {/* 술모임 이미지 */}
                        <div>
                            <div css={S.ImageContainer(selectedImage === 1)}>
                                <img
                                    src={table2}
                                    alt="술모임"
                                    onClick={() => handleImageSelect(1)}
                                    style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                                />
                                {selectedImage === 1 && (
                                    <div css={S.CheckboxIcon} aria-label="선택됨">
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path 
                                                d="M4 12l6 6L18 6" 
                                                stroke="white" 
                                                strokeWidth="4" 
                                                fill="none" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div css={S.ImageLabel}>술모임</div>
                        </div>

                        {/* 일모임 이미지 */}
                        <div>
                            <div css={S.ImageContainer(selectedImage === 2)}>
                                <img
                                    src={table3}
                                    alt="일모임"
                                    onClick={() => handleImageSelect(2)}
                                    style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                                />
                                {selectedImage === 2 && (
                                    <div css={S.CheckboxIcon} aria-label="선택됨">
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path 
                                                d="M4 12l6 6L18 6" 
                                                stroke="white" 
                                                strokeWidth="4" 
                                                fill="none" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div css={S.ImageLabel}>일모임</div>
                        </div>
                    </div>
                </div>

                {/* 모임 이름 입력 부분 */}
                <div css={S.Top}>
                    <h5>모임 이름은?</h5>
                    <input 
                        type="text" 
                        name="title"
                        placeholder='ex. 개발팀 회식, 동아리 친목회' 
                        value={eventData.title} 
                        onChange={handleInputChange} 
                    />
                </div>

                <div css={S.CalendarLayout}>
                    <div css={S.CalendarBox}>
                        <h5 css={S.H5}>후보 날짜를 정해볼까?</h5>
                        <div css={S.calendarContainer}>
                            <Calendar
                                defaultView={'month'}
                                formatMonthYear={(locale, date) => moment(date).locale('ko').format('YYYY년 MM월')}
                                formatDay={(local, date) => moment(date).locale('ko').format('DD')}
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
                    {eventId ? "모임 수정하기" : "모임 만들기"}
                </button>
            </div>
        </div>
    );
}

export default CreateEventPage;
