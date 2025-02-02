import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "../AttendanceEventPage/Style";
import styles from "./Style.module.css";
import classNames from "classnames";

import mainLogo from "../../Img/main_logo.svg";
import tableImage1 from "../../Img/tables/table1.svg";
import tableImage2 from "../../Img/tables/table2.svg";
import tableImage3 from "../../Img/tables/table3.svg";
import CheckIcon from "../../Img/icon/checkIcon.svg";
import QuestionIcon from "../../Img/icon/questionIcon.svg";
import CrossIcon from "../../Img/icon/crossIcon.svg";
import editLogo from "../../Img/edit_logo.svg";
import shareLogo from "../../Img/share_logo.svg";
import Footer from "../../component/footer/Footer";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AttendanceEvent from "../../component/AttendanceEvent";
import {
  getEvent,
  getParticipation,
  getParticipationName,
} from "../../services/supabaseService";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import BottomSheet from '../../component/BottomSheet/BottomSheet';

const characterImages = Array.from({ length: 20 }, (_, i) =>
  require(`../../Img/characters/character${i}.svg`)
);

const AttendanceEventListPage = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [timeList, setTimeList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const name = JSON.parse(sessionStorage.getItem("name"));
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("eventCode");
  const [tableImage, setTableImage] = useState(tableImage1);
  const attendanceEventRef = useRef(null);
  const isInitialMount = useRef(true);
  const elementRef = useRef(null);
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(0);
  const updateTableWidth = () => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.scrollWidth);
    }
  };
  useEffect(() => {
    updateTableWidth();
  }, [participants, timeList]);

  // 창 크기 변경 시에도 재계산
  useEffect(() => {
    window.addEventListener("resize", updateTableWidth);
    return () => {
      window.removeEventListener("resize", updateTableWidth);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 이벤트 데이터를 가져오기
        const eventResponse = await getEvent(id);
        if (eventResponse && eventResponse.length > 0) {
          const event = eventResponse[0];
          setEventData(event);

          switch (event.imageIndex) {
            case 0:
              setTableImage(tableImage1);
              break;
            case 1:
              setTableImage(tableImage2);
              break;
            case 2:
              setTableImage(tableImage3);
              break;
            default:
              setTableImage(tableImage1); // 기본값
          }

          if (event.time) {
            const parsedTime = JSON.parse(event.time);
            setTimeList(parsedTime);
          }
        }

        // 참여자 목록을 가져오기
        const participationList = await getParticipation(id);
        if (participationList.length > 0) {
          const parsedParticipationData = participationList.map((item) => ({
            name: item.name,
            character_index: item.character_index,
            checked: JSON.parse(item.checked),
            participation_id: item.participation_id, // participation_tb의 primary key
          }));
          setParticipants(parsedParticipationData);

          const times = JSON.parse(participationList[0].time);
          setTimeList(times);
        }

        // 이미 참여한 경우 리스트 페이지로 이동
        const participationResponse = await getParticipationName(id, name);
        if (participationResponse.data > 0) {
          window.location.href = `${
            window.location.origin
          }/list?eventCode=${encodeURIComponent(id)}`;
        }

        // 참가자가 0명인 경우 AttendanceEvent를 바로 띄우기
        if (participationList.length === 0) {
          setShowAttendanceForm(true);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchData();
  }, [id, name]);

  const initialRender = useRef(true);

  useEffect(() => {
    // 초기 마운트(참가자가 0명일 때)가 아니고, showAttendanceForm이나 editingParticipant가 변경됐을 때만 스크롤
    if (!isInitialMount.current && (showAttendanceForm || editingParticipant)) {
      if (participants.length > 0) { // 참가자가 있을 때만 스크롤
        attendanceEventRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
    isInitialMount.current = false;
  }, [showAttendanceForm, editingParticipant, participants.length]);

  const onEditClick = () => {
    navigate(`/edit?eventCode=${encodeURIComponent(id)}`);
  };

  const formatDateString = (dateString) => {
    const [datePart, timePart] = dateString.split(" / ");
    const [month, dayWithWeekday] = datePart.split("월 ");
    const day = dayWithWeekday.replace("일", "");
    return (
      <div className={styles.DateTimeContainer}>
        <span className={styles.DatePart}>{`${month}.${day}`}</span>
        <span className={styles.TimePart}>{`${timePart}`}</span>
      </div>
    );
  };

  // 가장 가능성 높은 날짜를 저장할 변수
  let topDates = [];

  const getRowBackgroundColor = (rows) => {
    // 빈 배열이거나 유효하지 않은 입력 처리
    if (!rows || rows.length === 0) {
      return [];
    }

    // 각 행에 대해 yesCount와 questionCount를 계산
    const rankedRows = rows.map((row) => {
      if (!row.statuses)
        return { ...row, yesCount: 0, questionCount: 0, noCount: 0 };

      const yesCount = row.statuses.filter((status) =>
        status?.includes("yes")
      ).length;
      const questionCount = row.statuses.filter((status) =>
        status?.includes("question")
      ).length;
      const noCount = row.statuses.filter((status) =>
        status?.includes("no")
      ).length;
      return { ...row, yesCount, questionCount, noCount };
    });

    // 빈 배열이 아닌 경우에만 정렬 진행
    if (rankedRows.length === 0) {
      return [];
    }

    // yesCount 기준으로 내림차순 정렬, 같으면 questionCount 기준으로 정렬
    const sortedCounts = [...rankedRows].sort((a, b) => {
      if (b.yesCount !== a.yesCount) {
        return b.yesCount - a.yesCount; // yesCount가 높은 순서
      } else {
        return b.questionCount - a.questionCount; // questionCount가 높은 순서
      }
    });

    let rank = 1;
    sortedCounts[0].rank = rank;
    for (let i = 1; i < sortedCounts.length; i++) {
      const prevRow = sortedCounts[i - 1];
      const currentRow = sortedCounts[i];
      if (
        currentRow.yesCount === prevRow.yesCount &&
        currentRow.questionCount === prevRow.questionCount
      ) {
        currentRow.rank = rank;
      } else {
        rank += 1;
        currentRow.rank = rank;
      }
    }

    const totalParticipants = rows[0]?.statuses.length || 0;

    // Color mapping object
    const colorMapping = {};

    // Green days
    const greenDays = sortedCounts.filter(
      (row) => row.rank === 1 && row.noCount === 0
    );
    greenDays.forEach((row) => {
      colorMapping[row.time] = "GreenBackground"; // 문자열로 클래스 이름 설정
    });

    // Blue days
    const blueDays = sortedCounts.filter(
      (row) => row.rank === 2 && row.noCount <= totalParticipants / 2
    );
    blueDays.forEach((row) => {
      colorMapping[row.time] = "BlueBackground"; // 문자열로 클래스 이름 설정
    });

    // Set topDates based on the rules
    if (greenDays.length > 0) {
      topDates = greenDays.map((row) => row.time);
    } else if (blueDays.length > 0) {
      topDates = blueDays.map((row) => row.time);
    } else {
      topDates = []; // No matching times
    }

    // Assign colors to each row
    return rows.map((row) => ({
      ...row,
      // backgroundColor: colorMapping[row.time] || null,
      backgroundColor: colorMapping[row.time] || null, // CSS Module 클래스 이름
    }));
  };

  const sortedTimeList = getRowBackgroundColor(
    timeList.map((time, timeIndex) => {
      const statuses = participants.map(
        (participant) => participant.checked[timeIndex]
      );
      return { time, statuses };
    })
  );

  // 참석자 수에 따른 툴팁 메시지 생성
  const participantCount = participants.length;
  let tooltipMessage = null;

  if (participantCount === 1) {
    tooltipMessage = <span>아직은 나 혼자 뿐인가...</span>;
  } else if (participantCount === 2) {
    tooltipMessage = <span>오 친구가 생겼군!</span>;
  } else if (participantCount >= 3) {
    if (topDates.length > 0) {
      // Format the most probable dates
      const formattedDates = topDates.map((dateString) => {
        const datePart = dateString.split(" / ")[0]; // e.g., '5월 20일 (금)'
        const formattedDate = datePart.replace("월 ", ".").replace("일", "");
        return formattedDate;
      });

      tooltipMessage = (
        <span>
          가장 가능성 높은 날은{" "}
          {formattedDates.map((date, index) => (
            <React.Fragment key={index}>
              <span className={styles.HighlightedDate}>{date}</span>
              {index < formattedDates.length - 1 && ", "}
            </React.Fragment>
          ))}{" "}
          이구만~!!!
        </span>
      );
    } else {
      tooltipMessage = <span>맞는 시간이 없구만...</span>;
    }
  }

  // 참석자 수에 따른 열 너비 결정
  let participantColumnWidth;

  if (participantCount === 1) {
    participantColumnWidth = 380;
  } else if (participantCount === 2) {
    participantColumnWidth = 190;
  } else if (participantCount === 3) {
    participantColumnWidth = 126;
  } else if (participantCount >= 4) {
    participantColumnWidth = 95;
  } else {
    participantColumnWidth = 95; // 기본값
  }

  // 이름 클릭 시 호출되는 함수
  const handleParticipantNameClick = (participant) => {
    setEditingParticipant(participant);
    setShowAttendanceForm(true);
  };

  // 테이블 및 참석자 배치 계산
  const participantsPerTable = 10;
  const maxTables = 2;
  const numTables = Math.ceil(participants.length / participantsPerTable);
  const actualTables = Math.min(numTables, maxTables);

  // 중복되지 않는 캐릭터를 가져오는 함수
  const getUniqueCharacter = (usedCharacters) => {
    let characterIndex;
    do {
      characterIndex = Math.floor(Math.random() * characterImages.length);
    } while (
      usedCharacters.has(characterIndex) &&
      usedCharacters.size < characterImages.length
    );

    usedCharacters.add(characterIndex);
    return characterImages[characterIndex];
  };

  // 캐릭터 배치 함수 수정
  const getFixedCharacterPlacements = () => {
    const placements = [];
    const usedCharacters = new Set();

    // 테이블 설정
    const tableWidth = 720; // 각 테이블의 너비
    const tableGap = 50; // 테이블 간 간격
    const totalTableWidth =
      actualTables * tableWidth + (actualTables - 1) * tableGap;

    // 첫 번째 테이블의 시작 X 위치
    const startX = -(totalTableWidth / 2) + tableWidth / 2;

    // 디바이스 너비에 따라 characterSpacing과 marginLeft 설정
    const characterSpacing = window.innerWidth < 430 ? 0 : 0; // 420픽셀 미만: 10px, 이상: 30px
    const marginLeft = window.innerWidth < 430 ? 0 : 0; // marginLeft 설정
    const characterWidth = 100; // 캐릭터의 너비

    for (let t = 0; t < actualTables; t++) {
      // 각 테이블에 대한 처리
      const tableParticipants = participants.slice(
        t * participantsPerTable,
        (t + 1) * participantsPerTable
      );
      const tablePositionX = startX + t * (tableWidth + tableGap);

      const topParticipants = [];
      const bottomParticipants = [];

      // 참가자를 윗줄과 아랫줄로 분리
      tableParticipants.forEach((participant, index) => {
        if (index % 2 === 0) {
          topParticipants.push(participant);
        } else {
          bottomParticipants.push(participant);
        }
      });

      // 윗줄 캐릭터 배치
      const topRowCount = topParticipants.length;
      const totalTopRowWidth =
        topRowCount * characterWidth + (topRowCount - 1) * characterSpacing;

      // 중앙 기준으로 윗줄 시작 X 위치 계산
      const startXTop = (tableWidth - totalTopRowWidth) / 2;

      topParticipants.forEach((participant, i) => {
        const leftPosition =
          startXTop + i * (characterWidth + characterSpacing);

        placements.push({
          tableIndex: t,
          row: "top",
          position: leftPosition,
          character: characterImages[participant.character_index],
          name: participant.name,
          marginTop: "0px", // 윗줄의 marginTop 설정
          marginLeft: `${marginLeft}px`, // 윗줄의 marginLeft 설정
        });
      });

      // 아랫줄 캐릭터 배치
      const bottomRowCount = bottomParticipants.length;
      const totalBottomRowWidth =
        bottomRowCount * characterWidth +
        (bottomRowCount - 1) * characterSpacing;

      // 중앙 기준으로 아랫줄 시작 X 위치 계산
      const startXBottom = (tableWidth - totalBottomRowWidth) / 2;

      bottomParticipants.forEach((participant, i) => {
        const leftPosition =
          startXBottom + i * (characterWidth + characterSpacing);

        placements.push({
          tableIndex: t,
          row: "bottom",
          position: leftPosition,
          character: characterImages[participant.character_index],
          name: participant.name,
          marginTop: "-150px", // 아랫줄의 marginTop 설정
          marginLeft: `${marginLeft}px`, // 아랫줄의 marginLeft 설정
        });
      });
    }

    // 전체 중앙 정렬을 위한 퍼센트 변환
    placements.forEach((placement) => {
      placement.position = `${(placement.position / tableWidth) * 100 + 5}%`; // 위치를 퍼센트로 변환
    });

    return placements;
  };

  const characterPlacements = getFixedCharacterPlacements();

  // 참석자 추가하기 버튼 클릭 핸들러 추가
  const handleAttendButtonClick = () => {
    if (participants.length >= 20) {
      alert("더 이상 참석자를 추가할 수 없습니다.");
      return;
    }
    setShowAttendanceForm(true);
  };

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [eventCode, setEventCode] = useState(null);

  useEffect(() => {
    if (participants.length === 1 && location.state?.isNewEvent) {  // location.state로 새 이벤트 여부 확인
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('eventCode');
      if (code && window.innerWidth <= 430) {
        setEventCode(code);
        setShowBottomSheet(true);
      }
    }
  }, [participants.length, location.state?.isNewEvent]);

  return (
    <div className={styles.Layout}>
      <div className={"Header"}>
        <div className={styles.HeaderBox}>
          <div className={styles.ImgBox}>
            <Link to="/" style={{ display: "inline-block" }}>
              <img
                src={mainLogo}
                alt="Main Logo"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </div>
          <div className={styles.HeaderItem}>
            <h1
              onClick={() => window.location.reload()}
              style={{ cursor: "pointer" }}
            >
              {eventData?.title}
            </h1>
            <div className={styles.header_buttons}>
              <button onClick={onEditClick}>
                <img className="button-icon" src={editLogo} alt="수정하기" />
                수정하기
              </button>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      alert("링크가 클립보드에 복사되었습니다.");
                    })
                    .catch((err) => {
                      console.error("링크 복사 중 오류 발생:", err);
                      alert("링크 복사에 실패했습니다.");
                    });
                }}
              >
                <img className="button-icon" src={shareLogo} alt="공유하기" />
                공유하기
              </button>
            </div>
          </div>
          <h3>{eventData?.detail}</h3>
        </div>
      </div>

      {/* 참여자가 있을 때 리스트 컴포넌트 표시 */}
      {participants.length > 0 && (
        <div className={styles.Component}>
          {/* 메인 컨테이너 */}
          <div className={styles.EventContainer}>
            {/* 툴팁 */}
            <div className={styles.TooltipContainer}>
              <div className={styles.Tooltip}>{tooltipMessage}</div>
            </div>

            <div className={styles.CharacterAndTableContainer} ref={elementRef}>
              {Array.from({ length: actualTables }).map((_, t) => (
                <div key={t} className={styles.TableAndCharactersWrapper}>
                  <img
                    src={tableImage}
                    alt="Table"
                    className={styles.TableImage}
                  />
                  {characterPlacements
                    .filter((p) => p.tableIndex === t)
                    .map((placement, index) => {
                      // z-index를 동적으로 설정
                      const zIndex = placement.row === "top" ? 1 : 3; // 'top'은 1, 'bottom'은 3

                      return (
                        <div
                          key={index}
                          className={styles.CharacterContainer}
                          style={{
                            left: placement.position,
                            top:
                              placement.row === "top"
                                ? window.innerWidth < 430
                                  ? "0px"
                                  : "0px" // 윗줄 top 설정
                                : window.innerWidth > 430
                                ? "150px"
                                : "80px", // 아랫줄 top 설정 (430 미만: 200px, 이상: 300px)
                            zIndex: zIndex, // z-index 동적 설정
                          }}
                        >
                          {placement.row === "top" ? (
                            <>
                              <div className={styles.CharacterName}>
                                {placement.name.length > 6
                                  ? `${placement.name.slice(0, 6)}...`
                                  : placement.name}
                              </div>
                              <img
                                src={placement.character}
                                alt={`Character ${index + 1}`}
                                className={styles.CharacterImage}
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src={placement.character}
                                alt={`Character ${index + 1}`}
                                className={styles.CharacterImage}
                              />
                              <div className={styles.CharacterName}>
                                {placement.name.length > 6
                                  ? `${placement.name.slice(0, 6)}...`
                                  : placement.name}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.AttendBox}>
            <div className={styles.TimeItem}>
              <h3>모두의 빈타임</h3>
              <span>일정을 수정하려면 참석자별 이름을 누르세요</span>
            </div>
            <div className={styles.TableBox}>
              <table className={styles.Table} ref={tableRef}>
                <thead>
                  <tr className={styles.ThItem}>
                    <th>일정</th>
                    {participants.map((participant, index) => (
                      <th
                        key={index}
                        style={{
                          width: participantColumnWidth,
                          maxWidth: participantColumnWidth,
                          minWidth: participantColumnWidth,
                        }}
                      >
                        <span
                          className={styles.ParticipantName}
                          onClick={() =>
                            handleParticipantNameClick(participant)
                          }
                          title={participant.name} // 툴팁으로 전체 이름 표시
                        >
                          {participant.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedTimeList.map((row, index) => (
                    <tr
                      key={index}
                      className={`${styles.TdItem} ${
                        row.backgroundColor ? styles[row.backgroundColor] : ""
                      }`} // CSS Module 클래스를 적용
                    >
                      <td>{formatDateString(row.time)}</td>
                      {participants.map((participant, pIndex) => {
                        const status = participant.checked[index];
                        return (
                          <td key={pIndex}>
                            {status === `yes_${index}` && (
                              <img
                                src={CheckIcon}
                                alt="참석 가능"
                                width={30}
                                height={30}
                              />
                            )}
                            {status === `question_${index}` && (
                              <img
                                src={QuestionIcon}
                                alt="참석 미정"
                                width={30}
                                height={30}
                              />
                            )}
                            {status === `no_${index}` && (
                              <img
                                src={CrossIcon}
                                alt="참석 불가"
                                width={30}
                                height={30}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 모임 참석하기 버튼은 showAttendanceForm이 false이고 editingParticipant가 null일 때만 표시 */}
            {!showAttendanceForm && !editingParticipant && (
              <button
                className={styles.AttendButton}
                style={{ width: tableWidth }}
                onClick={handleAttendButtonClick}
              >
                참석자 추가하기
              </button>
            )}
          </div>
        </div>
      )}

      {/* AttendanceEvent 컴포넌트는 showAttendanceForm이 true일 때만 표시 */}
      {showAttendanceForm && (
        <>
          {participants.length > 0 && <div className={"Divider"}></div>}
          <div ref={attendanceEventRef}>
            <AttendanceEvent
              eventData={eventData}
              timeList={timeList}
              existingParticipation={editingParticipant}
              onClose={() => {
                setShowAttendanceForm(false);
                setEditingParticipant(null);
              }}
              hideBackButton={!editingParticipant}
            />
          </div>
        </>
      )}
      <Footer />
      <BottomSheet 
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        eventCode={eventCode}
      />
    </div>
  );
};

export default AttendanceEventListPage;
