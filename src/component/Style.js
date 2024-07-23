import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    width: 40vw;
    margin-bottom: 100px;

    @media (max-width: 800px) {
        width: 90%;
        height: auto;
    }
`;

export const Header = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: #F9FAFA;
`;

export const ImgBox = css`
    width: 100%;
    margin: 30px 0px 0px 50px;

    @media (max-width: 800px) {
        margin: 0px 0px 30px 0px;
    }
`;

export const HeaderBox = css`
    display: flex;
    flex-direction: column;
    width: 50vw;
    margin-bottom: 40px;
    & h3 {
        margin-top: 20px;
        font-size: 20px;
        font-weight: 900;
        color: #0F1720;
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

export const HeaderItem = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    & h1 {
        font-size: 40px;
        font-weight: 900;
        color: #0F1720;
    }
    & button {
        height: 75%;
        width: 10%;
        border: 1px solid;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 900;
        color: #0F1720;
        cursor: pointer;
    }

    @media (max-width: 800px) {
        justify-content: start;
        gap: 10px;
        height: 30px;
        & h1 {
            font-size: 24px;
        }
        & button {
            height: 75%;
            width: 10%;
            border: 1px solid;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 900;
            color: #0F1720;
            cursor: pointer;
            display: none;
        }
    }
`;

export const AttendBox = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 45px;
    margin-top: 30px;
`;

export const InputItem = css`
    display: flex;
    flex-direction: column;
    & h3 {
        font-size: 24px;
        font-weight: 900;
        color: #0F1720;
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

export const TimeItem = css`
    display: flex;
    flex-direction: column;
    & h3 {
        font-size: 24px;
        font-weight: 900;
        color: #0F1720;
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
`;

export const Times = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Date = css`
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;
    & h4 {
        font-size: 18px;
        font-weight: 900;
        color: #0F1720;
    }
    & span {
        font-size: 18px;
        font-weight: 500;
        color: #0F1720;
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

export const BtnTrue = css`
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
    }
`;

export const BtnFalse = css`
    width: 100%;
    height: 40px;
    font-size: 18px;
    background-color: #DFE2E6;
    border: none;
    border-radius: 5px;
    color: #FFFF;
    font-weight: 600;

    @media (max-width: 800px) {
        margin-bottom: 20px;
    }
`;