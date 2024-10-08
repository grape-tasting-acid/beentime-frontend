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

export const MainImgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TableContainer = css`
  position: relative;
  width: 720px;
  height: 170px;
  margin: 0 auto;
`;

export const TableImage = css`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

export const FrontCharacterContainer = css`
  position: absolute;
  text-align: center;
  width: 104px;
`;

export const BackCharacterContainer = css`
  position: absolute;
  text-align: center;
  width: 104px;
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

export const TimeItem = css`
    display: flex;
    flex-direction: column;
    gap: 7px;

    & h3 {
        font-size: 24px;
        font-weight: 900;
        color: #0F1720;
    }
    & span {
        font-size: 18px;
        font-weight: 700;
        color: #0F1720;
    }

    @media (max-width: 800px) {
        & h3 {
        font-size: 20px;
        font-weight: 900;
        color: #0F1720;
        }
        & span {
            font-size: 14px;
            font-weight: 700;
            color: #0F1720;
        }
    }
`;

export const TableBox = css`
    text-align: center;
    overflow-x: auto;
    height: 30vh;
`;

export const Table = css`
    margin: 0 auto; 
    width: 100%;
    border-radius: 8px; 
    overflow: hidden;
`;

export const ThItem = css`
    & > th {
        height: 50px;
        background-color: #F9FAFA;
        border: 1px solid #DFE2E6;
        text-align: center;
        vertical-align: middle;
    }

    @media (max-width: 800px) {
        & > th {
            height: 40px;
        }
    }
`;

export const TdItem = css`
    & > td {
        height: 50px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #DFE2E6;
    }
    & > td:first-of-type {
        background-color: #F9FAFA;
        width: 25%;
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
        }
        & td > div {
            display: block;
        }
    }
`;

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

export const BtnBox = css`
    display: flex;
    justify-content: center;
    width: 40vw;
    margin-bottom: 100px;
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

export const Line = css`
    border-top: 1px solid #dbdbdb;
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
