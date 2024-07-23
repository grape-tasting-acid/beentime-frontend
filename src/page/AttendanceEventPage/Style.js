import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-top: 80px;

    @media (max-width: 800px) {
        height: auto;
        padding-top: 0px;
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

export const BtnBox = css`
    width: 40vw;
`;