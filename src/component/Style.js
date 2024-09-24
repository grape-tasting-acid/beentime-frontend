import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;

    @media (max-width: 800px) {
        height: auto;
        margin-top: 20px;
    }
`;

export const Component = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40vw; // 이전의 테이블 너비와 동일하게 설정

    @media (max-width: 800px) {
        width: 90%;
        height: auto;
    }
`;

export const AttendBox = css`
    display: flex;
    flex-direction: column;
    gap: 45px;
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
        font-size: 24px;
        font-weight: 900;
        color: #0F1720;
        margin: 0; // 불필요한 마진 제거
    }

    & input {
        margin-top: 15px;
        padding: 10px 16px; // 패딩을 약간 줄임
        border-radius: 5px;
        border: 2px solid #F1F2F4;
        font-size: 18px;
        width: 100%; // 입력창의 너비를 부모에 맞춤
        box-sizing: border-box; // 패딩과 보더를 포함하여 너비를 계산

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
            padding: 8px 12px; // 모바일에서 패딩 조정
        }
    }
`;

export const TimeItem = css`
    display: flex;
    flex-direction: column;
    width: 100%; // 부모 컨테이너의 너비에 맞춤

    & h3 {
        font-size: 24px;
        font-weight: 900;
        color: #0F1720;
        margin: 0; // 불필요한 마진 제거
    }

    @media (max-width: 800px) {
        & h3 {
            font-size: 18px;
        }
    }
`;

export const TimeBox = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-x: auto;
    height: 30vh;
    width: 100%; // 부모 컨테이너의 너비에 맞춤
    box-sizing: border-box; // 패딩과 보더를 포함하여 너비를 계산
`;

export const Times = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Btns = css`
    display: flex;
    gap: 10px;
    margin-right: 10px;
`;

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
        cursor: pointer;
    }

    & input[type="radio"]:checked + label {
        background-color: #32E3AE;
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

export const BtnTrue = css`
    width: 100%; // 부모 컨테이너의 너비에 맞춤
    height: 68px;
    font-size: 18px;
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

    @media (max-width: 800px) {
        width: 100%; // 모바일에서도 너비를 100%로 설정
        height: 50px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;
