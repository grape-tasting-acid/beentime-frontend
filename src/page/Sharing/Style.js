import { css } from '@emotion/react';

export const Layout = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const ImgBox = css`
    position: absolute;
    top: 30px;
    left: 30px;

    @media (max-width: 800px) {
        left: 0px;
    }
`;

export const H1 = css`
    font-size: 40px;
    font-weight: 700;
    color: #0F1720;
    margin-bottom: 50px;

    @media (max-width: 800px) {
        font-size: 26px;
    }
`;

export const UrlBox = css`
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    input {
        border: 1px solid #F1F2F4;
        width: 100%;
        height: 40px;
        border-radius: 10px;
        padding-left: 10px;
        outline: none;
        color: #0F1720;
    }

    button {
        border: 1px solid #0F1720;
        background-color: transparent;
        white-space: nowrap;
        width: 80px;
        height: 40px;
        margin-left: 10px;
        border-radius: 8px;
        cursor: pointer;

        @media (max-width: 800px) {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            flex-direction: column;
            margin-top: 10px;
            font-size: 18px;
        }
    }

    @media (max-width: 800px) {
        width: 92%;
        flex-direction: column;
    }
`;

export const Btn = css`
    width: 25%;
    height: 40px;
    border: none;
    background-color: #000000;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;
    border-radius: 6px;

    @media (max-width: 800px) {
        width: 92%;
        font-size: 18px;
    }
`;