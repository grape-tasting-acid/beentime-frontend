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
    font-size: 22px;
    color: var(--G10, #000);
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px; /* 118.182% */
    letter-spacing: -0.22px;
    text-align: left;
    width: 750px;
`;

export const LogoContainer = css`
    display: flex;
    padding: 80px 0px;
    justify-content: center;
    align-items: flex-start;
    gap: 2px;
    align-self: stretch;
`;

export const LogoImage = css`
    width: 750px;
    height: 280px;
    display: block;
`;

export const UrlBox = css`
    width: 750px;
    height: 52px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 30px;

    input {
        width: 562px;
        height: 52px;
        padding: 15px 18px;
        gap: 10px;
        align-items: center;
        border-radius: 8px;
        border: 1.5px solid var(--G3, #F1F2F4);
        background: var(--G1, #FFF);
        padding-left: 10px;
        color: var(--G10, #000);
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 122.222% */
        letter-spacing: -0.18px;
    }

    button {
        display: flex;
        width: 180px;
        height: 52px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        margin-left: 8px;
        border-radius: 8px;
        border: 1px solid var(--G10, #000);
        background: var(--G1, #FFF);
        color: var(--G10, #000);
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px; /* 166.667% */
        letter-spacing: -0.18px;
    }
`;

export const Btn = css`
    width: 750px;
    height: 68px;
    padding: 20px 0px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid var(--G10, #000);
    background: var(--G10, #000);
    color: var(--G1, #FFF);
    font-family: "Noto Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px; /* 118.182% */
    letter-spacing: -0.22px;
`;
