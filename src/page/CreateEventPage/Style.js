import { css } from '@emotion/react';

export const Layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    @media (max-width: 800px) {
        height: auto;
        margin-top: 20px;
    }
`;

export const Component = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 45vw;
    height: 100vh;

    @media (max-width: 800px) {
        width: 90%;
        height: auto;
    }
`;

export const Title = css`
    font-size: 40px;
    font-weight: 900;
    margin-bottom: 50px;
    color: #0F1720;

    @media (max-width: 800px) {
        font-size: 26px;
    }
`;

export const Top = css`
    & h5 {
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #2E343F;

        @media (max-width: 800px) {
            font-size: 18px;
        }
    }

    & input {
        width: 100%;
        height: 50px;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid #F1F2F4;
        outline: none;
        font-size: 18px;
        &::placeholder {
            color: #A9AFB6;
        }
        margin-bottom: 50px;

        @media (max-width: 800px) {
            font-size: 16px;
        }
    }
`;

export const Bottom = css`
    & h5 {
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #2E343F;

        @media (max-width: 800px) {
            font-size: 18px;
        }
    }

    & input {
        width: 100%;
        height: 50px;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid #F1F2F4;
        outline: none;
        font-size: 18px;
        &::placeholder {
            color: #A9AFB6;
        }
        margin-bottom: 50px;

        @media (max-width: 800px) {
            font-size: 16px;
        }
    }
`;

export const H5 = css`
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #2E343F;

    @media (max-width: 800px) {
        font-size: 18px;
    }
`;

export const CalendarLayout = css`
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

export const BtnTrue = css`
    margin-top: 50px;
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
    margin-top: 50px;
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

export const CalendarBox = css`
    width: 50%;
    height: 40vh;

    @media (max-width: 800px) {
        width: 100%;
        height: 40vh;
        margin-bottom: 20px;
    }
`;

export const calendarContainer = css`

    .react-calendar__navigation {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;

        .react-calendar__navigation__label {
            border: none;
            background-color: transparent;
            font-size: 17px;
            font-weight: 600;
        }

        .react-calendar__navigation__prev-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3vw;
            height: 3vh;
            font-size: 30px;
            border: none;
            background-color: transparent;
        }
        .react-calendar__navigation__next-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3vw;
            height: 3vh;
            font-size: 30px;
            border: none;
            background-color: transparent;
        }

        .react-calendar__navigation__next2-button {
            display: none;
        }
        .react-calendar__navigation__prev2-button {
            display: none;
        }
    }

    .react-calendar__month-view__weekdays {
        color: #C2C8CF;
        font-size: 14px;
        margin-bottom: 20px;

        .react-calendar__month-view__weekdays__weekday {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .react-calendar__month-view__days {
        width: 100%;
        height: 30.8vh;

        .react-calendar__month-view__days__day {
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            border: none;
            background-color: transparent;
            display: flex;
            justify-content: center;
        }

        .past-day {
            color: #DFE2E6;
        }
    }

    .today {
        abbr {
            color: #2376E5;
            font-weight: 600;
        }
    }

    .other-month {
        abbr {
            color: #dbdbdb;
        }
    }
`;

export const TodayText = css`
    font-size: 10px;
    color: #2376E5;
    font-weight: 600;
`;

export const TimeBox = css`
    width: 50%;
    height: 40vh;
    border: 1px solid #F1F2F4;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 800px) {
        border: none;
        margin-top: 10px;
        height: 200px;
        width: 100%;
    }
`;

export const TimeBoxContainer = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
    margin-top: 10px;
    height: 40vh;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        height: 200px;
    }
`;

export const PlaceHolder = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #C2C8CF;
    font-size: 14px;
    height: 100%;
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
    width: 90%;
    display: flex;
    justify-content: start;
    align-items: center;
    color: #2E343F;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-left: 10px;

    div {
        margin-right: 10px;
    }

    input {
        width: 110px;
    }

    button {
        background-color: transparent;
        border: none;
        color: #91979E;
    }

    @media (max-width: 1710px) {
        font-size: 12px;
        white-space: nowrap;
    }
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