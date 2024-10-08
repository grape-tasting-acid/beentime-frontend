import { css } from '@emotion/react';

export const Layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 100px;

  @media (max-width: 430px) {
    height: auto;
    margin-top: 20px;
  }
`;

export const Component = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 750px;
  // max-width: 500px;
  margin: 0 auto;

  @media (max-width: 430px) {
    width: 90%;
  }
`;

export const Title = css`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 50px;
  color: #0f1720;

  @media (max-width: 800px) {
    font-size: 26px;
  }
`;

export const H5 = css`
  font-family: 'Noto Sans', sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.01em;
  margin-bottom: 20px;
  color: #2e343f;

  @media (max-width: 800px) {
    font-size: 18px;
  }
`;

export const Top = css`
  & h5 {
    ${H5}
  }

  & input {
    width: 750px;
    height: 50px;
    gap: 10px;
    padding: 15px 18px;
    border-radius: 8px;
    border: 1.5px solid var(--G3, #F1F2F4);
    background: var(--G1, #FFF);
    outline: none;
    font-size: 18px;
    margin-bottom: 60px;

    &::placeholder {
      font-family: 'Noto Sans'
      font-weight: 400;    
      font-size: 18px;
      line-height: 22px;
      letter-spacing: -0.01em;
      color: var(--G6);
    }

    @media (max-width: 800px) {
      font-size: 16px;

      &::placeholder {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
`;

export const Bottom = css`
  & h5 {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #2e343f;

    @media (max-width: 800px) {
      font-size: 18px;
    }
  }

  & input {
    width: 100%;
    height: 50px;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid #f1f2f4;
    outline: none;
    font-size: 18px;
    &::placeholder {
      color: #a9afb6;
    }
    margin-bottom: 60px;

    @media (max-width: 800px) {
      font-size: 16px;
    }
  }
`;

export const BtnTrue = css`
  margin-top: 60px;
  width: 750px;
  height: 68px; 
  font-size: 22px;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  color: #ffff;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 100px;

  @media (max-width: 800px) {
    margin-bottom: 20px;
    /* 높이를 변경하지 않음 */
  }
`;

export const BtnFalse = css`
  margin-top: 60px;
  width: 750px;
  height: 68px; 
  font-size: 22px;
  background: var(--G4, #DFE2E6);
  border: none;
  border-radius: 5px;
  color: #ffff;
  font-weight: 600;
  margin-bottom: 100px;

  @media (max-width: 800px) {
    margin-bottom: 20px;
    /* 높이를 변경하지 않음 */
  }
`;

export const LogoImage = css`
  display: block;
  margin: 300px auto 0 auto;
`;


export const CalendarLayout = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const CalendarBox = css`
  @media (max-width: 800px) {
    width: 100%;
    height: 40vh;
    margin-bottom: 20px;
  }
`;

export const calendarContainer = css`
  width: 386px;
  height: 366px;

  .react-calendar__navigation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    .react-calendar__navigation__label {
      display: flex;
      width: 67px !important;
      height: 24px;
      flex-grow: 0 !important;
      align-items: center;
      border: none;
      background-color: transparent;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%;
      letter-spacing: -0.2px;
      padding: 0;
    }

    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6px;
      height: 14px;
      padding: 0;
      margin: 0;
      background: none;
      border: none;
      cursor: pointer;
    }
  
    .react-calendar__navigation__prev-button {
      margin-right: 6px;
    }
  
    .react-calendar__navigation__next-button {
      margin-left: 8px;
    }

    .react-calendar__navigation__next2-button {
      display: none;
    }
    .react-calendar__navigation__prev2-button {
      display: none;
    }
  }

  .react-calendar__month-view__weekdays {
    color: #c2c8cf;
    font-size: 14px;
    margin-bottom: 20px;

    .react-calendar__month-view__weekdays__weekday {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .react-calendar__month-view__days {
    width: 100%;
    height: auto;

    .react-calendar__month-view__days__day {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      border: none;
      background-color: transparent;
      display: flex;
      justify-content: center;
    }

    .past-day {
      color: #dfe2e6;
    }
  }

  .react-calendar__tile {
    display: flex;
    width: 50px !important;
    height: 50px !important;
    padding: 12px 14px 0px 14px;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 20px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 25px; /* 125% */
    letter-spacing: -0.4px;

    border: none;
    background-color: transparent;
  }

  .today {
    abbr {
      color: color: var(--T1, #2376E5);
      font-weight: 600;
    }
  }

  .other-month {
    abbr {
      color: #dbdbdb;
    }
  }
`;


export const TodayText = css`
  font-size: 10px;
  color: var(--T1, #2376E5);
  font-weight: 600;
`;

export const TimeBox = css`
  width: 330px;
  height: 400px;
  border: 1px solid #f1f2f4;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    border: none;
    margin-top: 10px;
    height: 200px;
    width: 100%;
  }
`;

export const TimeBoxContainer = css`
  width: 330px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: auto;
  margin-top: 10px;
  margin-top: 30px; /* 추가됨 */
  margin-left: 30px; /* 추가됨 */

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    height: 200px;
  }
`;

export const PlaceHolder = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c2c8cf;
  font-size: 14px;
  height: 100%;
`;

export const SelectedDateContainer = css`
  width: 90%;
`;

export const Box = css`
  display: flex;
  justify-content: center;
  align-items: center;

  .css-13cymwt-control {
    width: 200px;
  }
  .css-t3ipsp-control {
    width: 200px;
  }
`;

export const SelectedDateBox = css`
  width: 216px; /* 수정됨: 고정 너비 */
  height: 34px; /* 수정됨: 고정 높이 */
  justify-content: start;
  align-items: center;
  color: #2e343f;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 17px;
  gap: 13px;

  /* 날짜 부분 스타일 */
  .date {
    width: 90px;
    color: var(--G10, #000);
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 19.2px */
    letter-spacing: -0.16px;
  }

  /* 시간 부분 스타일 */
  .time {
    width: 41px;
    flex-shrink: 0;
    color: var(--G10, #000);
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px; /* 118.75% */
    letter-spacing: -0.16px;
  }

  div {
    margin-right: 10px;
  }

  input {
    width: 110px;
  }

  button {
    background-color: transparent;
    border: none;
    color: #91979e;
  }

  @media (max-width: 1710px) {
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const DateBox = css`
  width: 150px;
`;

export const ImgBox = css`
  width: 100%;
  margin: 30px 0px 0px 50px;

  @media (max-width: 800px) {
    margin: 0px 0px 30px 0px;
  }
`;

export const AddBtn = css`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  font-size: 30px;
`;

export const SelectImagesContainer = css`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px; /* 이미지 간의 간격 */
  }

  & > div:last-of-type {
    margin-right: 0; /* 마지막 이미지 간격 제거 */
  }
`;

export const ImageContainer = (isSelected) => css`
  width: 230px;
  height: 160px;
  flex-shrink: 0;
  position: relative;
  display: inline-block;
  border-radius: 8px;
  border: 1.5px solid ${isSelected ? 'black' : '#ccc'};
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  border: 1.5px solid ${isSelected ? 'black' : 'var(--G4, #ccc)'};

  ${isSelected &&
    css`
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
    `}
`;

export const CheckboxIcon = css`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    border-radius: 50%;
    cursor: pointer;
`;

export const ImageLabel = css`
  display: flex;
  color: var(--G10, #000);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 122.222% */
  letter-spacing: -0.18px;
  margin-top: 18px; 
  margin-bottom: 60px;
  text-align: center;
`;
