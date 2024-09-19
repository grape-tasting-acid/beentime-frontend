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

export const H1 = css`
    font-size: 20px;  /* Changed to match the size of the "모임 페이지 가기" button text */
    font-weight: 700;
    color: #0F1720;
    margin-bottom: 20px;
    text-align: left;
    width: 750px;

    @media (max-width: 800px) {
        font-size: 18px;  /* Adjust font size for smaller screens */
        width: auto;
    }
`;

export const UrlBox = css`
    width: 750px;
    height: 52px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    input {
        border: 1px solid #F1F2F4;
        width: calc(100% - 188px); /* Adjusted width to accommodate button and spacing */
        height: 100%;
        border-radius: 10px;
        padding-left: 10px;
        outline: none;
        color: #0F1720;
        font-size: 16px;
    }

    button {
        width: 180px;
        height: 52px;
        margin-left: 8px;
        border: 1px solid #0F1720;
        background-color: transparent;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        text-align: center;

        @media (max-width: 800px) {
            width: 100%;
            margin-top: 10px;
            font-size: 18px;
        }
    }
`;

export const Btn = css`
    width: 750px;
    height: 68px;
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
