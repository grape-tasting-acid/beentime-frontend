import { css } from "@emotion/react";

export const Layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin-top: 60px;

  @media (max-width: 430px) {
    width: 100%;
  }
`;

export const Component = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;

  @media (max-width: 430px) {
    width: 430px;
    padding: 0 20px; // 모바일에서 좌우 여백 추가
  }
`;

export const AttendBox = css`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-top: 30px;
  width: 100%; // 부모 컨테이너의 너비에 맞춤
  box-sizing: border-box; // 패딩과 보더를 포함하여 너비를 계산

  @media (max-width: 430px) {
    width: 100%;
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
    border: 1.5px solid var(--G3, #f1f2f4);
    background: var(--G1, #fff);
    font-size: 18px;
    width: 600px;

    &::placeholder {
      color: var(--G6, #a9afb6);
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 122.222% */
      letter-spacing: -0.18px;
    }
  }

  @media (max-width: 430px) {
    width: 100%;

    & h3 {
      font-size: 18px;
    }

    & input {
      width: 100%;
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

  @media (max-width: 430px) {
    width: 100%;
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

  @media (max-width: 430px) {
    width: 100%;
  }
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

  @media (max-width: 430px) {
    width: 100%;
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

  @media (max-width: 430px) {
    gap: 20px;
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
    background-color: #f1f2f4;
    color: #2e343f;
    cursor: pointer;
  }

  & input[type="radio"]:checked + label {
    background: var(--M3, #31edb5);
    color: #2e343f;
  }

  @media (max-width: 430px) {
    & input[type="radio"] {
      width: 42px;
      height: 42px;
      display: none;
    }

    & label {
      height: 42px;
      width: 42px;
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

  @media (max-width: 430px) {
    width: 100%;
  }
`;

export const BtnTrue = css`
  width: 293px; // 버튼 너비 설정
  height: 68px;
  font-size: 22px;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  color: #ffff;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 430px) {
    width: 100%; // 모바일에서는 전체 너비 사용
    height: 50px;
    font-size: 16px;
  }
`;

export const CancelButton = css`
  width: 293px; // 버튼 너비 설정
  height: 68px;
  font-size: 22px;
  background-color: #ffffff; /* 흰색 배경 */
  color: #000000; /* 검은색 글씨 */
  border: 1px solid #000000; /* 테두리 추가 */
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 430px) {
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
  color: #ffff;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 430px) {
    width: 100%;
  }
`;
