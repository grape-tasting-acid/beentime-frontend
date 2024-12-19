import { css } from "@emotion/react";

export const Layout = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-top: 0 !important;

  @media screen and (max-width: 430px) {
    padding: 0 20px; // 모바일에서 좌우 여백 추가
  }
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

  @media (max-width: 430px) {
    width: 100%;
    font-size: 22px;
    margin-top: 70px;
  }
`;

export const LogoContainer = css`
  display: flex;
  padding: 50px 0px 60px 0px;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  align-self: stretch;

  @media (max-width: 430px) {
    width: 100%;
    display: none;
  }
`;

export const LogoContainer2 = css`
  display: none;

  @media (max-width: 430px) {
    > img {
      max-width: 204px;
      width: 100%;
      height: 50px;
      margin-top: 40px;
      margin-bottom: 40px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }
`;

export const LogoImage = css`
  width: 750px;
  height: 200px;
  display: block;
`;

export const LogoImage2 = css`
  @media (max-width: 430px) {
    width: 204px;
    height: 50px;
    display: block;
    margin-top: 40px;
    margin-bottom: 110px;
    margin-left: auto;
    margin-right: auto;
  }
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
    border: 1.5px solid var(--G3, #f1f2f4);
    background: var(--G1, #fff);
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
    background: var(--G1, #fff);
    color: var(--G10, #000);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 166.667% */
    letter-spacing: -0.18px;
  }

  @media (max-width: 430px) {
    width: 100%; /* 모바일에서 UrlBox의 너비를 100%로 설정 */
    height: auto; /* 높이를 자동으로 조절 */
    flex-direction: column; /* 모바일에서 요소들을 세로로 배치 */
    align-items: center; /* 중앙 정렬 */
    margin-top: 12px; /* 위쪽 마진 조정 */
    margin-bottom: 12px; /* 아래쪽 마진 조정 */

    input {
      // max-width: 336px;
      width: 100%;
      height: 48px;
      display: flex;
      padding: 14px 18px;
      align-items: center;
      gap: 10px;
      align-self: stretch;
      margin-bottom: 12px; /* 위아래 마진 적용 */
      border-radius: 8px;
      border: 1.5px solid var(--G3, #f1f2f4);
      background: var(--G1, #fff);
      color: var(--G10, #000);
      font-size: 16px; /* 필요에 따라 폰트 크기 조정 */
      line-height: 20px;
      letter-spacing: -0.18px;
    }

    button {
      // max-width: 336px;
      width: 100%;
      height: 48px;
      margin-left: 0; /* 왼쪽 마진 제거 */
      border-radius: 8px;
      border: 1px solid var(--G10, #000);
      background: var(--G1, #fff);
      color: var(--G10, #000);
      font-size: 16px; /* 필요에 따라 폰트 크기 조정 */
      line-height: 24px;
      letter-spacing: -0.18px;
    }
  }
`;

export const Btn = css`
  width: 750px;
  height: 68px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--G10, #000);
  background: var(--G10, #000);
  color: var(--G1, #fff);
  font-family: "Noto Sans";
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.22px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 430px) {
    width: 100%;
    display: flex;
    height: 60px;
    font-size: 18px;
    padding: 20px 0px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    position: fixed; /* 화면에 고정 */
    bottom: 0; /* 하단에 위치 */
    left: 0; /* 좌측에 붙이기 */
    z-index: 1000; /* 다른 요소보다 위에 표시 */
    border-radius: 0; /* 모서리 둥글기를 제거하여 전체 너비에 맞춤 */
  }
`;
