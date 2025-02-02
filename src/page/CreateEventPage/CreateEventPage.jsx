import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
// import * as S from "./Style";
import styles from "./Style.module.css";
import classNames from "classnames";

import Calendar from "react-calendar";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import logo from "../../Img/logo/newLogo.svg";
import mainLogo from "../../Img/main_logo.svg";
import deleteIcon from "../../Img/icon/deleteIcon.svg";
import Footer from "../../component/footer/Footer";

import table1 from "../../Img/tables/shortTable1.svg";
import table2 from "../../Img/tables/shortTable2.svg";
import table3 from "../../Img/tables/shortTable3.svg";

import {
  saveEvent,
  editEvent,
  getEvent,
  getParticipation,
  updateParticipation,
} from "../../services/supabaseService";
import queryString from "query-string";
import BottomSheet from '../../component/BottomSheet/BottomSheet';

function CreateEventPage(props) {
  const [selectedDates, setSelectedDates] = useState([]); // 날짜 객체 배열로 변경
  const containerRef = useRef(null);
  const [eventData, setEventData] = useState({ title: "" });
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const queryData = queryString.parse(location.search);
  const eventCode = queryData.eventCode ? queryData.eventCode : null;
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [createdEventCode, setCreatedEventCode] = useState(null);

  useEffect(() => {
    if (eventCode) {
      fetchEventData(eventCode);
    }
  }, [eventCode]);

  const fetchEventData = async (eventCode) => {
    try {
      const response = await getEvent(eventCode);
      if (response && response.length > 0) {
        const event = response[0];
        setEventData(event);
        setSelectedImage(event.imageIndex);

        if (event.time) {
          // JSON 문자열을 객체로 파싱
          const timeList = JSON.parse(event.time);

          const today = moment().startOf("day");
          const currentYear = today.year();

          const parsedSelectedDates = timeList.map((time) => {
            const [datePart, timePart] = time.split(" / "); // 날짜와 시간 분리
            // 우선 현재 연도를 가정하여 파싱
            let parsedMoment = moment(
              `${currentYear}년 ${datePart}`,
              "YYYY년 M월 D일"
            );

            // 만약 파싱한 날짜가 오늘보다 이전이면 다음 해로 이동
            if (parsedMoment.isBefore(today, "day")) {
              parsedMoment.add(1, "year");
            }

            return {
              id: Date.now() + Math.random(), // 고유 ID 생성
              date: parsedMoment.toDate(),
              timeSlot: timePart || "19:00",
            };
          });

          setSelectedDates(parsedSelectedDates);
        }
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleDateClick = (date) => {
    const clickedDate = moment(date).startOf("day");
    // 같은 날짜로 이미 선택된 시간들이 있는지 확인
    const existingDateEntries = selectedDates.filter((dateObj) =>
      moment(dateObj.date).isSame(clickedDate, "day")
    );

    let newTimeSlot = "19:00";

    if (existingDateEntries.length > 0) {
      const lastSelected = existingDateEntries[existingDateEntries.length - 1];
      const lastTime = lastSelected.timeSlot;
      const lastMoment = moment(lastTime, "HH:mm");
      const newMoment = lastMoment.add(30, "minutes");
      newTimeSlot = newMoment.format("HH:mm");
    }

    const newDateObj = {
      id: Date.now() + Math.random(), // 고유 ID 생성
      date: date,
      timeSlot: newTimeSlot, // 기본 시간 설정
    };

    const newSelectedDates = [...selectedDates, newDateObj].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setSelectedDates(newSelectedDates);

    // 모바일 스크롤 조정 코드 수정
    if (window.innerWidth <= 430) {
      setTimeout(() => {
        const dateSelectionContainer = document.querySelector(`.${styles.DateSelectionContainer}`);
        if (dateSelectionContainer) {
          const offset = 20;
          const topPosition = dateSelectionContainer.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: topPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (selectedDates.length > 0 && containerRef.current) {
      const container = containerRef.current;
      const lastItem = selectedDates[selectedDates.length - 1];
      const itemElement = document.getElementById(`time-item-${lastItem.id}`);
      if (!itemElement) return;

      const containerRect = container.getBoundingClientRect();
      const itemRect = itemElement.getBoundingClientRect();

      const offsetTopDiff = itemRect.top - containerRect.top;
      const offsetBottomDiff = itemRect.bottom - containerRect.bottom;

      // 아이템이 위로 벗어났을 경우
      if (offsetTopDiff < 0) {
        container.scrollTo({
          top: container.scrollTop + offsetTopDiff,
          behavior: "smooth",
        });
      }
      // 아이템이 아래로 벗어났을 경우
      else if (offsetBottomDiff > 0) {
        container.scrollTo({
          top: container.scrollTop + offsetBottomDiff,
          behavior: "smooth",
        });
      }
    }
  }, [selectedDates]);

  const handleTodayClick = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setActiveStartDate(startOfMonth);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEventCreate = async () => {
    const title = eventData.title;

    if (!title.trim()) {
      alert("모임 이름을 입력해주세요.");
      return;
    }

    if (selectedDates.length === 0) {
      alert("최소 1개 이상의 날짜를 선택해주세요.");
      return;
    }

    const isValidTimeSlot = selectedDates.every(
      (dateObj) => dateObj.timeSlot !== ""
    );

    if (!isValidTimeSlot) {
      alert("시간을 선택해주세요.");
      return;
    }

    const eventList = selectedDates.map((dateObj) => {
      const formattedDate = moment(dateObj.date).format("M월 D일");
      let dayOfWeekShort = moment(dateObj.date).locale("ko").format("ddd");
      const timeSlot = dateObj.timeSlot;
      switch (dayOfWeekShort) {
        case "Mon":
          dayOfWeekShort = "월";
          break;
        case "Tue":
          dayOfWeekShort = "화";
          break;
        case "Wed":
          dayOfWeekShort = "수";
          break;
        case "Thu":
          dayOfWeekShort = "목";
          break;
        case "Fri":
          dayOfWeekShort = "금";
          break;
        case "Sat":
          dayOfWeekShort = "토";
          break;
        case "Sun":
          dayOfWeekShort = "일";
          break;
        default:
          dayOfWeekShort = "";
      }
      return `${formattedDate} (${dayOfWeekShort}) / ${timeSlot}`;
    });

    function generateRandomCode(length = 10) {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    try {
      if (!eventCode) {
        const response = await saveEvent(title, eventList, selectedImage);
        if (response) {
          const eventCode = response[0].event_code;
          sessionStorage.setItem("eventCode", eventCode);
          navigate(`/attend?eventCode=${eventCode}`, { state: { isNewEvent: true } });
        }
      } else {
        const response = await editEvent(
          eventCode,
          title,
          eventList,
          selectedImage
        );
        if (response) {
          const eventCode = response[0].event_code;
          await updateParticipationTable(eventCode, eventList);
          sessionStorage.setItem("eventCode", eventCode);
          alert("모임이 수정되었습니다.");
          navigate(`/attend?eventCode=${eventCode}`);
        }
      }
    } catch (error) {
      console.error("Error creating/editing event:", error);
    }
  };

  const updateParticipationTable = async (eventCode, updatedTimeList) => {
    try {
      // 참여자 데이터 가져오기
      const participationList = await getParticipation(eventCode);

      for (const participant of participationList) {
        const existingTimeList = JSON.parse(participant.time); // 기존 시간 리스트
        const existingCheckedList = JSON.parse(participant.checked); // 기존 체크 상태 리스트

        // 새로운 checked 리스트 생성
        const newCheckedList = updatedTimeList.map((time, index) => {
          const existingIndex = existingTimeList.indexOf(time); // 기존 시간 확인
          if (existingIndex !== -1) {
            // 기존 시간이 존재하면 기존 상태 유지 (인덱스 재정렬)
            const [status] = existingCheckedList[existingIndex].split("_");
            return `${status}_${index}`;
          } else {
            // 새로운 시간은 기본값 question 설정
            return `question_${index}`;
          }
        });

        // participation_tb 업데이트
        await updateParticipation(
          participant.name,
          JSON.stringify(newCheckedList),
          JSON.stringify(updatedTimeList)
        );

        // 로그로 확인
        console.log("Updated Participation:", {
          name: participant.name,
          checked: newCheckedList,
          time: updatedTimeList,
        });
      }
    } catch (error) {
      console.error("Error updating participation table:", error);
    }
  };

  const handleImageSelect = (imageIndex) => {
    setSelectedImage(imageIndex);
  };

  const tileContent = ({ date, view }) => {
    return null;
  };

  const SelectedDateBox = ({ dateObj, index }) => {
    const handleTimeChange = (e) => {
      const newTimeSlot = e.target.value;
      const updatedDates = selectedDates.map((d, idx) =>
        idx === index ? { ...d, timeSlot: newTimeSlot } : d
      );
      setSelectedDates(updatedDates);
    };

    const handleDeleteDate = () => {
      const newSelectedDates = selectedDates.filter((_, idx) => idx !== index);
      setSelectedDates(newSelectedDates);
    };

    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute === 0 ? "00" : `${minute}`;
        const value = `${formattedHour}:${formattedMinute}`;
        timeOptions.push({ value, label: value });
      }
    }

    const formattedDate = moment(dateObj.date);
    const formattedDateString = formattedDate.format("M월 D일");
    let dayOfWeekShort = formattedDate.locale("ko").format("ddd");
    switch (dayOfWeekShort) {
      case "Mon":
        dayOfWeekShort = "월";
        break;
      case "Tue":
        dayOfWeekShort = "화";
        break;
      case "Wed":
        dayOfWeekShort = "수";
        break;
      case "Thu":
        dayOfWeekShort = "목";
        break;
      case "Fri":
        dayOfWeekShort = "금";
        break;
      case "Sat":
        dayOfWeekShort = "토";
        break;
      case "Sun":
        dayOfWeekShort = "일";
        break;
      default:
        dayOfWeekShort = "";
    }

    return (
      <div className={styles.SelectedDateBox}>
        <div className={styles.DateText}>
          {formattedDateString} ({dayOfWeekShort})
        </div>
        <div>
          <select
            className={styles.TimeInput}
            value={dateObj.timeSlot}
            onChange={handleTimeChange}
          >
            <option value="" disabled>
              시간 선택
            </option>
            {timeOptions.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button className={styles.DeleteButton} onClick={handleDeleteDate}>
            <img src={deleteIcon} alt="삭제" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.Layout} style={{ paddingTop: "100px" }}>
      <div className={styles.Component}>
        {/* 로고를 가운데 중앙에 배치 - Link로 감싸기 */}
        <a href="/" aria-label="홈페이지로 이동">
          <img src={logo} alt="Logo" className={styles.LogoImage} />
        </a>
        <a href="/" aria-label="홈페이지로 이동">
          <img src={mainLogo} alt="Logo" className={styles.LogoImage2} />
        </a>

        {/* 어떤 모임이야? 선택 부분 추가 */}
        <div className={styles.Top}>
          <h5>어떤 모임이야?</h5>
          <div className={styles.SelectImagesContainer}>
            {/* 밥모임 이미지 */}
            <div>
              <div
                className={classNames(styles.ImageContainer, {
                  [styles.selected]: selectedImage === 0,
                })}
              >
                <img
                  src={table1}
                  alt="밥모임"
                  onClick={() => handleImageSelect(0)}
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  onDragStart={(e) => e.preventDefault()}
                />
                {selectedImage === 0 && (
                  <div className={styles.CheckboxIcon} aria-label="선택됨">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <circle cx="11" cy="11" r="11" fill="black" />
                      <path
                        d="M6.59961 10.8032L10.6513 14.6666L16.1329 8.06665"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.ImageLabel}>밥모임</div>
            </div>

            {/* 술모임 이미지 */}
            <div>
              <div
                className={classNames(styles.ImageContainer, {
                  [styles.selected]: selectedImage === 1,
                })}
              >
                <img
                  src={table2}
                  alt="술모임"
                  onClick={() => handleImageSelect(1)}
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  onDragStart={(e) => e.preventDefault()}
                />
                {selectedImage === 1 && (
                  <div className={styles.CheckboxIcon} aria-label="선택됨">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <circle cx="11" cy="11" r="11" fill="black" />
                      <path
                        d="M6.59961 10.8032L10.6513 14.6666L16.1329 8.06665"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.ImageLabel}>술모임</div>
            </div>

            {/* 일모임 이미지 */}
            <div>
              <div
                className={classNames(styles.ImageContainer, {
                  [styles.selected]: selectedImage === 2,
                })}
              >
                <img
                  src={table3}
                  alt="일모임"
                  onClick={() => handleImageSelect(2)}
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  onDragStart={(e) => e.preventDefault()}
                />
                {selectedImage === 2 && (
                  <div className={styles.CheckboxIcon} aria-label="선택됨">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <circle cx="11" cy="11" r="11" fill="black" />
                      <path
                        d="M6.59961 10.8032L10.6513 14.6666L16.1329 8.06665"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.ImageLabel}>일모임</div>
            </div>
          </div>
        </div>

        {/* 모임 이름 입력 부분 */}
        <div className={styles.Top}>
          <h5>모임 이름은?</h5>
          <input
            type="text"
            name="title"
            placeholder="개발팀 회식, 동아리 친목회"
            value={eventData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.DateSelectionContainer}>
          <h5 className={styles.H5}>후보 날짜를 모두 골라줘!</h5>
          <div className={styles.CalendarLayout}>
            <div className={styles.CalendarBox}>
              <div className={"calendarContainer"}>
                <button class={styles.TodayButton} onClick={handleTodayClick}>
                  오늘
                </button>
                <Calendar
                  activeStartDate={activeStartDate}
                  onActiveStartDateChange={({ activeStartDate }) =>
                    setActiveStartDate(activeStartDate)
                  }
                  defaultView={"month"}
                  minDetail="month"
                  formatMonthYear={(locale, date) =>
                    moment(date).locale("ko").format("YYYY.M")
                  }
                  formatDay={(local, date) =>
                    moment(date).locale("ko").format("D")
                  }
                  formatShortWeekday={(locale, date) => {
                    const englishDay = moment(date).locale("en").format("dd");
                    const koreanDays = {
                      Su: "일",
                      Mo: "월",
                      Tu: "화",
                      We: "수",
                      Th: "목",
                      Fr: "금",
                      Sa: "토",
                    };
                    return koreanDays[englishDay];
                  }}
                  showNeighboringMonth={false}
                  onClickDay={(value) => handleDateClick(value)}
                  tileDisabled={({ date }) =>
                    moment(date).isBefore(moment().startOf("day"), "day")
                  }
                  tileClassName={({ date, view }) => {
                    if (view === "month") {
                      const classes = [];

                      // 과거 날짜
                      if (
                        moment(date).isBefore(moment().startOf("day"), "day")
                      ) {
                        classes.push("past-day");
                      }

                      // 오늘 날짜
                      const formattedDate = moment(date)
                        .startOf("day")
                        .format("YYYY-MM-DD");
                      const today = moment()
                        .startOf("day")
                        .format("YYYY-MM-DD");
                      if (formattedDate === today) {
                        classes.push("today");
                      }

                      // 요일 클래스 추가 (0: 일요일, 6: 토요일)
                      const dayOfWeek = moment(date).day(); // 0 (일요일)부터 6 (토요일)까지
                      classes.push(`weekday-${dayOfWeek}`);

                      // 첫 번째 날짜 클래스 추가
                      if (moment(date).date() === 1) {
                        classes.push("first-day");
                      }

                      // 선택된 날짜 확인 로직 수정
                      const currentDate = moment(date);
                      const isSelected = selectedDates.some((dateObj) =>
                        moment(dateObj.date).isSame(currentDate, "day")
                      );

                      if (isSelected) {
                        console.log(
                          "Selected date:",
                          currentDate.format("YYYY-MM-DD")
                        );
                        classes.push("selected-date");
                      }

                      return classes.join(" ");
                    }
                    return "";
                  }}
                  tileContent={tileContent}
                  locale="en-US"
                  prevLabel={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="16"
                      viewBox="0 0 9 16"
                      fill="none"
                    >
                      <path
                        d="M8 1L2 8L8 15"
                        stroke="var(--G10, #000)"
                        strokeWidth=""
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                  nextLabel={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="16"
                      viewBox="0 0 9 16"
                      fill="none"
                    >
                      <path
                        d="M1 1L7 8L1 15"
                        stroke="var(--G10, #000)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            <div className={styles.TimeBox}>
              <div className={styles.TimeBoxContainer} ref={containerRef}>
                <TransitionGroup>
                  {selectedDates.length > 0 ? (
                    selectedDates.map((dateObj, index) => (
                      <CSSTransition
                        key={dateObj.id}
                        timeout={300}
                        classNames={{
                          enter: "stack-enter",
                          enterActive: "stack-enter-active",
                          exit: "stack-exit",
                          exitActive: "stack-exit-active",
                        }}
                      >
                        <div
                          className={"SelectedDateBoxWrapper"}
                          id={`time-item-${dateObj.id}`}
                        >
                          <SelectedDateBox dateObj={dateObj} index={index} />
                        </div>
                      </CSSTransition>
                    ))
                  ) : (
                    <CSSTransition
                      key="placeholder"
                      timeout={300}
                      classNames={{
                        enter: "placeholder-enter",
                        enterActive: "placeholder-enter-active",
                        exit: "placeholder-exit",
                        exitActive: "placeholder-exit-active",
                      }}
                    >
                      <div className={[styles.PlaceHolderWrapper]}>
                        <div className={styles.PlaceHolder}>
                          <div>캘린더에서 가능한 후보 날짜를</div>
                          <div>모두 선택해주세요</div>
                        </div>
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>

        {eventCode ? (
          <div className={styles.ButtonContainer}>
            <button
              onClick={() => navigate(-1)}
              className={styles.CancelButton}
            >
              돌아가기
            </button>
            <button
              onClick={handleEventCreate}
              className={classNames(
                selectedDates.length && eventData.title.trim() ? styles.BtnTrue : styles.BtnFalse
              )}
              disabled={!selectedDates.length || !eventData.title.trim()}
            >
              수정 완료
            </button>
          </div>
        ) : (
          <button
            onClick={handleEventCreate}
            className={classNames(
              selectedDates.length && eventData.title.trim() ? styles.BtnCreate : styles.BtnFalse
            )}
            disabled={!selectedDates.length || !eventData.title.trim()}
          >
            모임 만들기
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CreateEventPage;
