import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import styles from "./Style.module.css";
import classNames from "classnames";

import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import supabase from "../api/instance";
import { getParticipation } from "../services/supabaseService";

import CheckSelectedIcon from "../Img/icon/checkSelected.svg";
import CheckUnselectedIcon from "../Img/icon/checkUnselected.svg";
import QuestionSelectedIcon from "../Img/icon/questionSelected.svg";
import QuestionUnselectedIcon from "../Img/icon/questionUnselected.svg";
import CrossSelectedIcon from "../Img/icon/crossSelected.svg";
import CrossUnselectedIcon from "../Img/icon/crossUnselected.svg";

const AttendanceEvent = ({
  timeList,
  eventData,
  existingParticipation,
  onClose,
  hideBackButton,
}) => {
  const [selectedRadios, setSelectedRadios] = useState([]);
  const [attendeeName, setAttendeeName] = useState("");
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("eventCode");

  useEffect(() => {
    const initializeRadios = async () => {
      if (timeList && timeList.length > 0) {
        if (existingParticipation) {
          setSelectedRadios(existingParticipation.checked);
          setAttendeeName(existingParticipation.name);
        } else {
          try {
            const participationList = await getParticipation(id);
            const isFirstParticipant = participationList.length === 0;
            const defaultRadios = timeList.map((_, index) => 
              isFirstParticipant ? `yes_${index}` : `no_${index}`
            );
            setSelectedRadios(defaultRadios);
          } catch (error) {
            console.error("Error fetching participation:", error);
          }
        }
      }
    };

    initializeRadios();
  }, [timeList, existingParticipation, id]);

  useEffect(() => {
    const checkFirstParticipant = async () => {
      try {
        const participationList = await getParticipation(id);
        if (participationList.length === 0) {
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("Error checking first participant:", error);
      }
    };

    checkFirstParticipant();
  }, []);

  const onChangeRadio = (e, index) => {
    const updatedRadios = [...selectedRadios];
    updatedRadios[index] = e.target.id;
    setSelectedRadios(updatedRadios);
  };

  const onNameChange = (e) => {
    setAttendeeName(e.target.value);
  };

  const onAttendClick = async () => {
    if (!attendeeName.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (selectedRadios.includes(null)) {
      alert("모든 시간대에 대해 응답해주세요.");
      return;
    }

    try {
      const { data: existingParticipants = [], error: fetchError } =
        await supabase
          .from("participation_tb")
          .select("character_index")
          .eq("event_code", id);

      if (fetchError) {
        throw fetchError;
      }

      // 이미 사용된 캐릭터 번호 수집
      const usedCharacterIndices = new Set(
        existingParticipants.map((p) => p.character_index)
      );
      let newCharacterIndex;

      // 중복되지 않는 캐릭터 번호 생성
      const availableCharacterIndices = [];
      for (let i = 0; i < 20; i++) {
        if (!usedCharacterIndices.has(i)) {
          availableCharacterIndices.push(i);
        }
      }

      // 랜덤으로 캐릭터 번호 선택
      if (availableCharacterIndices.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * availableCharacterIndices.length
        );
        newCharacterIndex = availableCharacterIndices[randomIndex];
      }

      if (existingParticipation) {
        // 기존 참여 정보 수정
        const { data: updateData, error: updateError } = await supabase
          .from("participation_tb")
          .update({
            name: attendeeName,
            checked: selectedRadios,
          })
          .eq("participation_id", existingParticipation.participation_id)
          .select();

        if (updateError) {
          throw updateError;
        }

        if (updateData) {
          sessionStorage.setItem("name", JSON.stringify(attendeeName));
          alert("참여 정보가 수정되었습니다.");
          window.location.reload();
        }
      } else {
        // 새로운 참여 추가
        const { data: participationList = [], error: participationError } =
          await supabase
            .from("participation_tb")
            .select("*")
            .eq("event_code", id)
            .select();

        if (participationError) {
          throw participationError;
        }

        const isAlreadyAttended = participationList.some(
          (participation) => participation.name === attendeeName
        );

        if (isAlreadyAttended) {
          sessionStorage.setItem("name", JSON.stringify(attendeeName));
          alert("이미 참여 완료한 모임입니다.");
          window.location.reload();
        } else {
          const data = {
            name: attendeeName,
            time: timeList,
            checked: selectedRadios,
            event_code: eventData.event_code,
            character_index: newCharacterIndex,
          };

          const { data: responseData, error: responseError } = await supabase
            .from("participation_tb")
            .insert([data])
            .select();

          if (responseError) {
            throw responseError;
          }

          if (responseData) {
            sessionStorage.setItem("name", JSON.stringify(attendeeName));
            alert("참여 완료 하였습니다.");
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.error("Error during participation:", error);
    }
  };

  return (
    <div className={styles.Layout}>
      <div className={styles.Component}>
        <div className={styles.AttendBox}>
          <div className={styles.InputItem}>
            <h3>이름을 알려줘!</h3>
            <input
              type="text"
              placeholder="차은우"
              value={attendeeName}
              onChange={onNameChange}
            />
          </div>
          <div className={styles.TimeItem}>
            <h3>나의 빈타임은?</h3>
            <div className={styles.TimeBox}>
              {timeList?.map((date, index) => (
                <div key={index} className={styles.Times}>
                  <div className={styles.texts}>
                    <h4>{date.split("/")[0]}</h4>
                    <span>{date.split("/")[1]}</span>
                  </div>
                  <div className={styles.Btns}>
                    {/* 체크 아이콘 */}
                    <div className={styles.Radio}>
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
                    <div className={styles.Radio}>
                      <input
                        type="radio"
                        id={`question_${index}`}
                        name={`check_${index}`}
                        onChange={(e) => onChangeRadio(e, index)}
                        checked={selectedRadios[index] === `question_${index}`}
                      />
                      <label htmlFor={`question_${index}`}>
                        {selectedRadios[index] === `question_${index}` ? (
                          <img
                            src={QuestionSelectedIcon}
                            alt="참석 미정 선택됨"
                          />
                        ) : (
                          <img src={QuestionUnselectedIcon} alt="참석 미정" />
                        )}
                      </label>
                    </div>

                    {/* 엑스 아이콘 */}
                    <div className={styles.Radio}>
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

          <div className={styles.ButtonContainer}>
            {/* hideBackButton이 false일 때만 돌아가기 버튼 표시 */}
            {!hideBackButton && (
              <button className={styles.CancelButton} onClick={onClose}>
                돌아가기
              </button>
            )}
            {/* hideBackButton이 true이면 버튼 크기 조절 */}
            <button
              className={classNames(
                hideBackButton ? styles.LargeAttendButton : styles.BtnTrue
              )}
              onClick={onAttendClick}
            >
              {existingParticipation ? "수정 완료" : "모임 참석하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceEvent;
