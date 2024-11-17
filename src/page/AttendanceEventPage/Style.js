import { css } from '@emotion/react';

// Layout 설정
export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    padding-top: 0 !important; 

    @media (max-width: 800px) {
        height: auto;
        padding-top: 0px;
        margin-top: 20px;
    }
`;

// Header 스타일
export const Header = css`
    display: flex;
    width: 1020px;
    gap: 14px;
    flex-direction: column;
    align-items: center;
`;

// ImgBox 스타일
export const ImgBox = css`
    width: 148px;
    height: 21px;
`;

// HeaderBox 스타일
export const HeaderBox = css`
    display: flex;
    width: 1020px;
    height: 42px;
    margin-top: 100px;
    margin-bottom: 60px;
    flex-direction: column;
    justify-content: center;

    & h3 {
        color: var(--G10, #000);
        font-family: "Noto Sans";
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px; /* 100% */
        letter-spacing: -0.3px;
    }

    @media (max-width: 800px) {
        margin-left: 20px;
        margin-bottom: 20px;
        width: 100%;
        
        & h3 {
            margin-top: 6px;
            font-size: 14px;
        }
    }
`;

// HeaderItem 스타일
export const HeaderItem = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-top: 14px;

    & h1 {
        color: var(--G10, #000);
        font-family: "Noto Sans";
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px; /* 100% */
        letter-spacing: -0.3px;
    }

    & button {
        height: 42px; // 버튼 높이 설정
        width: 150px; // 버튼 너비 고정
        padding: 4px 14px;  
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px; /* 162.5% */
        letter-spacing: -0.16px;
        background: var(--G3, #F1F2F4);
        cursor: pointer;
        display: flex; // 아이콘과 텍스트 수평 정렬
        align-items: center; // 수직 정렬
        justify-content: center; // 텍스트 중앙 정렬
    }

    @media (max-width: 800px) {
        justify-content: start;
        gap: 10px;
        height: 30px;

        & h1 {
            font-size: 24px;
        }

        & button {
            height: 30px; // 모바일 버튼 높이 조정
            width: auto; // 내용에 맞게 너비 조정
            border: 1px solid;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 900;
            color: var(--G10, #000);
            cursor: pointer;
            display: none; // 모바일에서 숨김
        }
    }
`;

// Component 스타일 (리스트 및 참여 신청 컴포넌트)
export const Component = css`
    display: flex;
    flex-direction: column;
    align-items: center; // 오타 수정 및 중앙 정렬 적용
    justify-content: center;
    width: 100%; // 너비를 100%로 설정하여 부모 요소에 맞춤
    max-width: 1020px; // 최대 너비를 설정하여 내용물이 너무 넓어지지 않도록 제한
    margin: 0 auto; // 컨테이너를 화면 중앙에 배치
    margin-top: 30px;

    @media (max-width: 800px) {
        width: 90%;
        height: auto;
    }
`;

export const EventContainer = css`
    width: 100%
    max-width: 1020px;
    height: 478px;
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TooltipContainer = css`
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Tooltip = css`
    position: relative;
    background-color: black;
    padding: 10px 20px;
    border-radius: 20px;
    max-width: 80%;
    text-align: center;

    height: 52px;
    padding: 15px 20px;
    gap: 10px;
    max-width: 80%;
    border-radius: 8px;
    background: var(--G10, #000);
    text-align: center;

    color: var(--G1, #FFF);
    font-family: "Noto Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.18px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
        content: '';
        position: absolute;
        bottom: -10px; /* 말풍선 아래쪽 화살표 */
        left: 50%;
        transform: translateX(-50%);
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }
`;

// 캐릭터+캡션+테이블 이미지 컨테이너 (A) (720x396px)
export const CharacterAndTableContainer = (numTables) => css`
    position: relative;
    margin-top: 20px;
    top: 62px;
    width: ${numTables === 1 ? '720px' : '1020px'}; // 테이블 수에 따라 너비 조정
    height: 396px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: auto; // 내용이 넘칠 경우 스크롤 표시
`;

export const TableAndCharactersWrapper = (tableIndex) => css`
    position: relative;
    width: 720px;
    height: 396px;
    margin-left: ${tableIndex > 0 ? '50px' : '0'}; // 첫 번째 테이블을 제외하고 좌측 마진 적용
    flex-shrink: 0; // 아이템이 줄어들지 않도록 설정
`;

// 메인 이미지 박스 (테이블과 캐릭터 배치)
export const MainImgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 테이블 컨테이너 스타일
export const TableContainer = css`
    position: relative;
    width: 720px;
    height: 170px;
    margin: 0 auto;
`;

// 테이블 이미지 스타일
export const TableImage = css`
    position: absolute;
    bottom: 74px; /* A 컨테이너의 하단에서 위로 74px */
    left: 50%;
    transform: translateX(-50%);
    width: /* 테이블 이미지의 너비 */;
    height: /* 테이블 이미지의 높이 */;
    z-index: 2;
`;

// 캐릭터 컨테이너 스타일
export const CharacterContainer = (leftPosition, row) => css`
    position: absolute;
    left: ${leftPosition}px;
    ${row === 'top' ? 'top: 0;' : 'bottom: 0;'}
    transform: translateX(-50%);
    width: 100px;
    height: 232px;
    height: ${row === 'top' ? '244px' : '254px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: ${row === 'top' ? 1 : 3};
    `;

// 캐릭터 이미지 스타일
export const CharacterImage = (row) => css`
    width: 100px;
    height: 210px;
`;

// 이름 스타일
export const CharacterName = (row) => css`
    color: var(--G10, #000);
    -webkit-text-stroke-width: 1.5;
    -webkit-text-stroke-color: var(--G1, #FFF);
    font-family: "Noto Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.16px;
    width: 104px;
    text-align: center;
    //overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표 표시 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    ${row === 'bottom' ? 'margin-top: 0px;' : 'margin-bottom: 0px;'}
`;

export const NameAbove = css`
    position: absolute;
    bottom: 100%;  /* 캐릭터 위에 배치 */
    transform: translateY(-10px);  /* 캐릭터와의 간격 조정 */
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #333;
`;

export const NameBelow = css`
    position: absolute;
    top: 100%;  /* 캐릭터 아래에 배치 */
    transform: translateY(10px);  /* 캐릭터와의 간격 조정 */
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #333;
    margin-top: 10px;
`;

export const BackCharacter = css`
    position: absolute;
    bottom: 78px;
    width: 104px;
    height: 222px;
    z-index: 1;  // 테이블 이미지 뒤에 배치
`;

export const FrontCharacter = css`
    position: absolute;
    bottom: -42px;
    width: 104px;
    height: 222px;
    z-index: 3;
`;

// 참석자 리스트 박스
export const AttendBox = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-top: 60px;
`;

// 시간 아이템 (모두의 빈타임)
export const TimeItem = css`
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 24px;

    & h3 {
        font-size: 24px;
        font-weight: 900;
        color: var(--G10, #000);
    }

    & span {
        font-size: 18px;
        font-weight: 700;
        color: var(--G10, #000);
    }

    @media (max-width: 800px) {
        & h3 {
            font-size: 20px;
            font-weight: 900;
            color: var(--G10, #000);
        }

        & span {
            font-size: 14px;
            font-weight: 700;
            color: var(--G10, #000);
        }
    }
`;

// 테이블 박스 (참석자 상태)
export const TableBox = css`
    text-align: center;
    overflow-x: auto;
    margin-bottom: 60px;
    width: 100%; // 테이블 박스 너비 100%로 설정
`;

export const Table = css`
    margin: 0 auto; 
    width: 100%;
    border-radius: 8px; 
    overflow: hidden;
    border-collapse: collapse; /* 셀 간격 제거 */
    border-spacing: 0; /* 셀 간격 제거 */
`;

// 참석자 수에 따른 동적 스타일 적용
export const ThItem = (participantColumnWidth) => css`
    & > th {
        height: 64px;
        font-size: 18px;
        background-color: #F9FAFA;
        border: 1px solid #DFE2E6;
        text-align: center;
        vertical-align: middle;
        width: ${participantColumnWidth}px; /* 고정 너비 설정 */
        overflow: hidden; /* 넘치는 텍스트 숨김 */
        text-overflow: ellipsis; /* 말줄임표 표시 */
        white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    }

    & > th:first-of-type {
        width: 220px; // 일정 열 고정 너비
    }

    & > th:not(:first-of-type) {
        width: ${participantColumnWidth}px;
        max-width: ${participantColumnWidth}px;
    }

    @media (max-width: 800px) {
        & > th {
            height: 40px;
            width: 70px; // 모바일에서는 70px 고정
        }
    }
`;

export const TdItem = (participantColumnWidth) => css`
    & > td {
        height: 50px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #DFE2E6;
    }

    & > td:first-of-type {
        font-size: 20px;
        background-color: #F9FAFA;
        width: 220px; // 일정 열 고정 너비
        height: 64px;
        padding: 10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    & > td:not(:first-of-type) {
        width: ${participantColumnWidth}px;
        max-width: ${participantColumnWidth}px;
    }

    & td > div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    @media (max-width: 800px) {
        & > td {
            height: 40px;
            font-size: 12px;
            width: 70px; // 모바일에서는 70px 고정
        }

        & td > div {
            display: block;
        }
    }
`;

// 버튼 박스
export const BtnBox = css`
    display: flex;
    justify-content: center;
    width: 40vw;
    margin-bottom: 100px;
`;

// 참석자 페이지 내 버튼 스타일
export const BtnLeft = css`
    width: 100%;
    height: 40px;
    font-size: 18px;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;

    @media (max-width: 800px) {
        margin-bottom: 20px;
        width: 400px;
        font-size: 12px;
    }
`;

export const BtnRight = css`
    width: 100%;
    height: 40px;
    font-size: 18px;
    background-color: #000000;
    border: none;
    border-radius: 5px;
    color: #FFFF;
    font-weight: 600;
    cursor: pointer;

    @media (max-width: 800px) {
        margin-bottom: 20px;
        width: 400px;
        font-size: 12px;
    }
`;

// 빈타임 라인
export const Line = css`
    border-top: 1px solid #dbdbdb;
`;

// 입력 아이템 스타일
export const InputItem = css`
    display: flex;
    flex-direction: column;

    & h3 {
        font-size: 24px;
        font-weight: 900;
        color: var(--G10, #000);
    }

    & input {
        margin-top: 15px;
        padding: 10px 18px;
        border-radius: 5px;
        border: 2px solid #F1F2F4;
        font-size: 18px;
        align-items: center;

        &::placeholder {
            color: #A9AFB6;
        }
    }

    @media (max-width: 800px) {
        & h3 {
            font-size: 18px;
        }

        & input {
            font-size: 14px;
        }
    }
`;

// 시간 박스
export const TimeBox = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-x: auto;
    height: 30vh;
`;

// 시간 리스트
export const Times = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 날짜 스타일
export const Date = css`
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;

    & h4 {
        font-size: 18px;
        font-weight: 900;
        color: var(--G10, #000);
    }

    & span {
        font-size: 18px;
        font-weight: 500;
        color: var(--G10, #000);
    }

    @media (max-width: 800px) {
        & h4 {
            font-size: 16px;
        }

        & span {
            font-size: 16px;
        }
    }
`;

export const AttendButton = css`
    width: 100%; // 부모 컨테이너의 너비에 맞춤
    height: 68px;
    font-size: 22px;
    background-color: #000000;
    border: none;
    border-radius: 5px;
    color: #FFFF;
    font-weight: 600;
    cursor: pointer;
    display: flex; // 아이콘 및 텍스트 수평 정렬
    align-items: center; // 수직 정렬
    justify-content: center; // 텍스트 중앙 정렬
    box-sizing: border-box; // 패딩과 보더를 포함하여 너비를 계산
    margin-bottom: 100px;

    @media (max-width: 800px) {
        width: 100%; // 모바일에서도 너비를 100%로 설정
        height: 50px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;


// 라디오 버튼 스타일
export const Radio = css`
    & input[type="radio"] {
        display: none;
    }

    & label {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        height: 45px;
        width: 45px;
        font-size: larger;
        background-color: #F1F2F4;
        color: #2E343F;
    }

    & input[type="radio"]:checked + label {
        background-color: #32E3AE;
        color: #2E343F;
    }

    & input[type="radio"] + label {
        background-color: #F1F2F4;
        color: #2E343F;
    }

    @media (max-width: 800px) {
        & label {
            height: 35px;
            width: 35px;
            font-size: medium;
        }
    }
`;

// 버튼들 그룹 스타일
export const Btns = css`
    display: flex;
    gap: 10px;
    margin-right: 10px;
`;

// 백그라운드 색상 설정
export const GreenBackground = css`
    background-color: #9BFBD9;
`;

export const BlueBackground = css`
    background-color: #DDFFEF;
`;

export const EventEdit = css`
    background-color: transparent;
`;

export const gray = css`
    color: #dbdbdb;
`;

export const HighlightedDate = css`
    color: var(--M3, #31EDB5);
    font-family: "Noto Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.18px;
`;

export const ParticipantName = css`
    text-decoration: underline;
    cursor: pointer;
    color: inherit; /* 기존 글자 색상 유지 */
    display: block; /* 블록 요소로 설정 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표 표시 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    max-width: 100%; /* 부모 요소의 너비를 넘지 않도록 설정 */
`;

export const DateTimeContainer = css`
    display: flex;
    height: 30px;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
`;

export const DatePart = css`
    color: var(--G10, #000);
    font-family: "Noto Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
    letter-spacing: -0.2px;
`;

export const TimePart = css`
    color: var(--G10, #000);
    font-family: "Noto Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; /* 150% */
    letter-spacing: -0.2px;
`;

export const Divider = css`
    width: 1020px;
    height: 1px;
    background-color: var(--G4);
    margin: 100px auto;
`;