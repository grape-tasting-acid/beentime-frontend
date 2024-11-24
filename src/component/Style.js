import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;

    @media (max-width: 800px) {
        height: auto;
        margin-top: 20px;
    }
`;

export const Component = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;

    @media (max-width: 800px) {
        width: 90%;
        height: auto;
    }
`;

export const AttendBox = css`
    display: flex;
    flex-direction: column;
    gap: 60px;
    margin-top: 30px;
    width: 100%; // 부모 컨테이너의 너비에 맞춤
    box-sizing: border-box; // 패딩과 보더를 포함하여 너비를 계산

    @media (max-width: 800px) {
        gap: 30px;
    }
`;

export const InputItem = css`
    display: flex;
    flex-direction: column;
    width: 100%; // 부모 컨테이너의 너비에 맞춤
    box-sizing: border-box; // 패딩과 보더를 포함하여 너비를 계산

    & h3 {
        color: var(--G10, #000);
        font-family: "Noto Sans";
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px; /* 118.182% */
        letter-spacing: -0.22px;
    }

    & input {
        margin-top: 20px;
        padding: 15px 18px;
        border-radius: 8px;
        border: 1.5px solid var(--G3, #F1F2F4);
        background: var(--G1, #FFF);
        font-size: 18px;
        width: 600px;

        &::placeholder {
            color: var(--G6, #A9AFB6);
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px; /* 122.222% */
            letter-spacing: -0.18px;
        }
    }

    @media (max-width: 800px) {
        & h3 {
            font-size: 18px;
        }

        & input {
            font-size: 14px;
            padding: 8px 12px; // 모바일에서 패딩 조정
        }
    }
`;

export const TimeItem = css`
    display: flex;
    flex-direction: column;
    width: 600px;

    & h3 {
        color: var(--G10, #000);
        font-family: "Noto Sans";
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px; /* 118.182% */
        letter-spacing: -0.22px;
        margin-bottom: 20px;
    }

    @media (max-width: 800px) {
        & h3 {
            font-size: 18px;
        }
    }
`;

export const TimeBox = css`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    align-items: flex-start;
    width: 100%;
    gap: 14px;
`;

export const Times = css`
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    width: 100%;

    & h4 {
        color: var(--G10, #000);
        font-family: "Noto Sans";
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px; /* 118.182% */
        letter-spacing: -0.22px;
        margin-right: 15px;
    }

    & span {
        color: var(--G10, #000);
        font-family: "Noto Sans";
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px; /* 118.182% */
        letter-spacing: -0.22px;
    }

    @media (max-width: 800px) {
        & h4 {
            font-size: 16px;
        }

        & span {
            font-size: 14px;
        }
    }
`;

export const Btns = css`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-left: auto; /* Btns 컨테이너를 오른쪽으로 밀기 */

    @media (max-width: 800px) {
        margin-right: 5px;
    }
`;

export const Radio = css`
    & input[type="radio"] {
        width: 54px;
        height: 54px;
        display: none;
    }

    & label {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        height: 54px;
        width: 54px;
        font-size: larger;
        background-color: #F1F2F4;
        color: #2E343F;
        cursor: pointer;
    }

    & input[type="radio"]:checked + label {
        background: var(--M3, #31EDB5);
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

export const ButtonContainer = css`
    display: flex;
    justify-content: space-between; /* 버튼들을 양쪽에 배치 */
    width: 100%; /* 전체 부모 컨테이너 너비에 맞춤 */
    margin-bottom: 100px;
    gap: 14px; /* 버튼 사이의 간격 설정 */

    @media (max-width: 800px) {
        margin-bottom: 20px;
    }
`;

export const BtnTrue = css`
    width: 293px; // 버튼 너비 설정
    height: 68px;
    font-size: 22px;
    background-color: #000000;
    border: none;
    border-radius: 5px;
    color: #FFFF;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @media (max-width: 800px) {
        width: 100%; // 모바일에서는 전체 너비 사용
        height: 50px;
        font-size: 16px;
    }
`;

export const CancelButton = css`
    width: 293px; // 버튼 너비 설정
    height: 68px;
    font-size: 22px;
    background-color: #FFFFFF; /* 흰색 배경 */
    color: #000000; /* 검은색 글씨 */
    border: 1px solid #000000; /* 테두리 추가 */
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @media (max-width: 800px) {
        width: 100%; // 모바일에서는 전체 너비 사용
        height: 50px;
        font-size: 16px;
    }
`;

export const LargeAttendButton = css`
    width: 600px;
    height: 68px;
    font-size: 22px;
    background-color: #000000;
    border: none;
    border-radius: 5px;
    color: #FFFF;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;