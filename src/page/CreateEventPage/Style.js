import { css } from '@emotion/react';

export const Layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 0 !important; 

  @media screen and (max-width: 375px) {
    padding: 0 20px; // 모바일에서 좌우 여백 추가
  }
`;

export const LogoImage = css`
  display: block;
  
  align-items: center;
  @media screen and (max-width: 375px) {
    width: 204px;
    height: 50px;
    margin-top: 40px;
    margin-bottom: 40px;
    display: block; // block으로 변경
    margin-left: auto; // 좌우 마진 auto로 설정
    margin-right: auto;
  }
`;


export const Component = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 750px;
  // max-width: 500px;
  margin: 0 auto;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

export const Title = css`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 50px;
  color: #0f1720;

  @media (max-width: 375px) {
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
  color: var(--G10, #000);

  @media (max-width: 375px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const Top = css`
  & h5 {
    ${H5}
  }

  & input {
    width: 100%;
    height: 52px;
    padding: 13.5px 18px;
    border-radius: 8px;
    border: 1.5px solid var(--G3, #F1F2F4);
    background: var(--G1, #FFF);
    outline: none;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 60px;
    box-sizing: border-box !important;

    &::placeholder {
      font-family: 'Noto Sans'
      font-weight: 400;    
      font-size: 18px;
      line-height: 22px;
      letter-spacing: -0.01em;
      color: var(--G6);
    }

    @media (max-width: 375px) {
      font-size: 18px;

      &::placeholder {
        font-size: 16px;
        line-height: 22px;
      }
    }
  }
`;

export const Bottom = css`
  & h5 {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--G10, #000);

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

export const ButtonContainer = css`
    margin-top: 60px;
    display: flex;
    justify-content: space-between; /* 버튼들을 양쪽에 배치 */
    width: 100%; /* 전체 부모 컨테이너 너비에 맞춤 */
    margin-bottom: 100px;
    gap: 14px; /* 버튼 사이의 간격 설정 */

`;

export const BtnCreate = css`
  width: 100%;
  height: 68px; 
  margin-top: 60px;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 118.182% */
  letter-spacing: -0.22px;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  color: #ffff;
  cursor: pointer;
  margin-bottom: 100px;

  @media (max-width: 375px) {
    height: 60px;
    padding: 20px 0px;
  }
`;

export const BtnTrue = css`
  width: 368px;
  height: 68px; 
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 118.182% */
  letter-spacing: -0.22px;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  color: #ffff;
  cursor: pointer;
  margin-bottom: 100px;
`;

export const BtnFalse = css`
  width: 100%;
  height: 68px; 
  margin-top: 60px;
  font-size: 22px;
  background: var(--G4, #DFE2E6);
  border: none;
  border-radius: 5px;
  color: #ffff;
  font-weight: 600;
  margin-bottom: 100px;

  @media (max-width: 375px) {
    height: 60px;
    padding: 20px 0px;
  }
`;

export const CancelButton = css`
    width: 368px; // 버튼 너비 설정
    height: 68px;
    font-size: 22px;
    background-color: #FFFFFF; /* 흰색 배경 */
    color: #000000; /* 검은색 글씨 */
    border: 1px solid #000000; /* 테두리 추가 */
    border-radius: 5px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px; /* 118.182% */
    letter-spacing: -0.22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

export const DateSelectionContainer = css`
  width: 750px;
  height: 446px;
  display: flex;
  flex-direction: column;

  @media (max-width: 375px) {
    width: 100%;
    height: auto;
  }
`;


export const CalendarLayout = css`
  display: flex;
  flex-direction: row;
  gap: 34px; /* 두 부분의 간격 */
  height: 400px; /* 남은 높이 */
  align-items: flex-start;

  @media (max-width: 375px) {
    flex-direction: column; /* 모바일에서 열 방향으로 변경 */
    gap: 20px; /* 모바일에서의 간격 조정 */
    height: auto; /* 높이 자동 조절 */
  }
`;

export const CalendarBox = css`
  width: 386px;
  height: 366px;
  justify-content: center;
  align-items: center;

  @media (max-width: 375px) {
    width: 100%; /* 모바일에서 너비를 100%로 */
    height: auto; /* 높이 자동 조절 */
  }
`;

export const calendarContainer = css`
  width: 386px !important;
  position: relative;

  @media (max-width: 375px) {
    width: 100% !important; /* 모바일에서 너비를 100%로 변경 */
  }

  .react-calendar {
    width: 100%;
    height: 100%;
    margin-top: 0 !important;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 0px;

    .react-calendar__navigation__label {
      display: flex;
      justify-content: center;
      position: relative;
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
      color: #000 !important;
    }

    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10px;
      height: 18px;
      padding: 0;
      margin: 0;
      background: none;
      border: none;
      cursor: pointer;
    }
  
    .react-calendar__navigation__prev-button {
      margin-right: 8px;
    }
  
    .react-calendar__navigation__next-button {
      margin-left: 8px;
    }

    .react-calendar__navigation__prev-button svg,
    .react-calendar__navigation__next-button svg {
      width: 9px;
      height: 16px;
      stroke: var(--G10, #000);
      stroke-width: 2;
      stroke-linecap: round;
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
    font-weight: bold;
    margin-bottom: 20px;

    .react-calendar__month-view__weekdays__weekday {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 50px);
    grid-gap: 8px 6px;
    width: 386px;
    justify-content: center;
    padding: 0 !important; /* 불필요한 패딩 제거 */
    margin: 0 !important; /* 불필요한 마진 제거 */

    .react-calendar__month-view__days__day {
      display: block !important; /* 기본 display를 block으로 설정 */
      margin: 0 !important; /* 불필요한 마진 제거 */
      padding: 0 !important; /* 불필요한 패딩 제거 */
    }
  }

  .react-calendar__tile.past-day,
  .react-calendar__tile.past-day abbr {
    color: var(--G4, #DFE2E6);
  }

  .react-calendar__tile.today {
    color: var(--T1, #2376E5) !important; 
    font-weight: 400;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .react-calendar__tile {
    box-sizing: border-box;
    width: 50px !important;
    height: 50px !important;
    text-align: center;
    position: relative;
    

    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 20px !important;
    font-style: normal;
    font-weight: 400 !important;
    line-height: 25px; /* 125% */
    letter-spacing: -0.4px;

    border: none;
    background-color: transparent;
  }

  .react-calendar__tile.today {
    display: flex !important;
    flex-direction: column !important; /* 필요 시 사용 */
    justify-content: center !important;
    align-items: center !important;
  }

  .react-calendar__month-view__days .react-calendar__tile {
    margin: 0; /* 마진 제거 */
  }
  
  .weekday-0.first-day { /* 일요일 */
    grid-column-start: 1;
  }
  .weekday-1.first-day { /* 월요일 */
    grid-column-start: 2;
  }
  .weekday-2.first-day { /* 화요일 */
    grid-column-start: 3;
  }
  .weekday-3.first-day { /* 수요일 */
    grid-column-start: 4;
  }
  .weekday-4.first-day { /* 목요일 */
    grid-column-start: 5;
  }
  .weekday-5.first-day { /* 금요일 */
    grid-column-start: 6;
  }
  .weekday-6.first-day { /* 토요일 */
    grid-column-start: 7;
  }

  .react-calendar__tile:not(.past-day):hover {
    background-color: var(--G3, #F1F2F4);
    cursor: pointer;
    border-radius: 50%;
  }

  .other-month {
    abbr {
      color: #dbdbdb;
    }
  }

  .selected-date {
    border: 1.5px solid var(--G10, #000);
    border-radius: 50%;
    width: 50px !important;
    height: 50px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 375px) {
    .react-calendar__month-view__days {
      grid-template-columns: repeat(7, 1fr);
      width: 100% !important;
    }

    .react-calendar__tile {
      width: 100% !important; /* 타일 너비를 부모에 맞게 */
      height: auto !important; /* 높이를 자동으로 */
      aspect-ratio: 1 / 1; /* 정사각형 유지 */
      font-size: 16px !important; /* 필요에 따라 폰트 크기 조정 */
    }

    .selected-date {
      width: 100% !important; /* 선택된 날짜의 너비 조정 */
      height: 100% !important;
    }
  }
`;

export const TodayText = css`
  position: absolute; /* 절대 위치로 배치 */
  margin-bottom: -38px;
  left: 50%; /* 수평 중앙을 기준으로 */
  transform: translateX(-50%); /* 수평 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 12px;
  font-size: 10px;
  color: var(--T1, #2376E5);
  font-weight: 500;
`;

export const TodayButton = css`
  display: flex;
  width: 44px;
  height: 28px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: var(--G3, #F1F2F4);
  border: none;
  gap: 10px;
  flex-shrink: 0;
  cursor: pointer;
  
  /* 버튼을 캘린더 우측 상단에 위치시키기 위해 절대 위치 설정 */
  position: absolute;
  right: 0px; /* 필요에 따라 조정 */
  
  /* 폰트 스타일 */
  color: var(--G10, #000);
  font-family: "Noto Sans";
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 153.846% */
  letter-spacing: -0.13px;
  
  &:hover {
    background: var(--G4, #DFE2E6);
  }
`;


export const TimeBox = css`
  width: 330px;
  height: 400px;
  border: 1px solid #f1f2f4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 375px) {
    width: 100% !important;
  }
`;

export const TimeBoxContainer = css`
  position: absolute;
  top: 30px;
  left: 30px;
  width: calc(100% - 40px);
  height: 368px;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  /* 스크롤바 커스텀 (크롬, 사파리, 엣지 등 Webkit 기반 브라우저) */
  ::-webkit-scrollbar {
    width: 8px;
    background-color: #F1F2F4; /* 스크롤바 배경색 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #C2C8CF; /* 스크롤바 드래그 가능한 영역 색 */
    border-radius: 4px;
  }

  /* Firefox 전용 스크롤바 스타일 (옵션) */
  scrollbar-width: thin;
  scrollbar-color: #C2C8CF #F1F2F4; /* thumb 색상 #C2C8CF, track 배경 #F1F2F4 */

  @media (max-width: 800px) {
    position: static; 
    width: 100%;
    height: auto;
    padding: 0 16px;
  }
`;

export const SelectedDateBoxWrapper = css`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;

  &.stack-enter {
    opacity: 0;
    transform: translateX(20px);
  }
  &.stack-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 300ms ease-in-out;
  }
  &.stack-exit {
    opacity: 1;
    transform: translateX(0);
  }
  &.stack-exit-active {
    opacity: 0;
    transform: translateX(20px);
    transition: all 300ms ease-in-out;
  }
`;

export const PlaceHolderWrapper = css`
  width: 100%;

  &.placeholder-enter {
    opacity: 0;
  }
  &.placeholder-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in-out;
  }
  &.placeholder-exit {
    opacity: 1;
  }
  &.placeholder-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }
`;

export const PlaceHolder = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: #c2c8cf;
  font-size: 14px;
  width: 177px;
  height: 100%;
  position: absolute;  /* 절대 위치로 설정 */
  top: 50%;  /* 상단에서 50% 위치 */
  left: 50%;  /* 좌측에서 50% 위치 */
  transform: translate(-50%, -50%);  /* 정확한 중앙 정렬을 위한 변환 */

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
  width: 216px;
  height: 34px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 13px;
`;

export const DateText = css`
  font-family: 'Noto Sans';
  font-size: 16px;
  font-weight: 900;
  margin-right: 13px;
  font-style: normal;
  width: 90px; /* 고정 너비 */
  text-align: center; /* 가운데 정렬 */
  white-space: nowrap; /* 줄 바꿈 방지 */
`;

export const TimeInput = css`
  display: flex;
  width: 70px;
  height: 34px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px; /* 118.75% */
  letter-spacing: -0.16px;

  border-radius: 4px;
  border: 0.718px solid var(--G4, #DFE2E6);
  background: var(--G1, #FFF);

  /* 드롭다운 화살표 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

`;

export const DeleteButton = css`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  color: #91979e;
  cursor: pointer;
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

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px; /* 이미지 간의 간격 */
  }

  & > div:last-of-type {
    margin-right: 0; /* 마지막 이미지 간격 제거 */
  }
  
  @media screen and (max-width: 375px) {
    flex-wrap: nowrap; /* 항목들이 한 줄에 나타나도록 설정 */
    overflow-x: auto; /* 가로 스크롤 활성화 */
    width: 100%; /* 부모 컨테이너 너비에 맞춤 */
    -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤을 위해 추가 */

    & > div {
      margin-right: 14px; /* 이미지 간의 간격 */
    }
  }
`;

export const ImageContainer = (isSelected) => css`
  width: 230px !important;
  height: 160px !important;
  flex-shrink: 0;
  position: relative;
  display: inline-block;
  border-radius: 8px;
  border: 1.5px solid ${isSelected ? 'black' : '#ccc'};
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  border: 1.5px solid ${isSelected ? 'black' : 'var(--G4, #ccc)'};

  ${isSelected
    ? css`
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
      `
    : css`
        &:hover {
        }
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; /* 이미지 하단의 여백 제거 */
  }
  
  @media screen and (max-width: 375px) {
    width: 150px !important;
    height: 110px !important;
  }
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

    @media screen and (max-width: 375px) {
      top: 8px;
      right: 8px;
      width: 18px;
      height: 18px;
    }

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

  @media screen and (max-width: 375px) {
    margin-top: 12px;
  }  
`;
