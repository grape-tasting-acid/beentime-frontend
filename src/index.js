/** @jsxImportSource @emotion/react */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Global, css } from "@emotion/react"; // Global과 css 가져오기

const resetStyles = css`
  /* Safari의 user agent stylesheet 재정의 */
  * {
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Safari의 테이블 관련 기본 스타일 초기화 */
  table {
    -webkit-border-horizontal-spacing: 0;
    -webkit-border-vertical-spacing: 0;
  }
`;

export const GlobalStyle = () => <Global styles={resetStyles} />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      {/* Global 컴포넌트를 사용하여 전역 스타일 적용 */}
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap");

          *,
          span,
          div,
          button,
          input,
          select,
          textarea {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Noto Sans", sans-serif;
            // font-weight: bold;
          }

          // body {
          //   font-family: "Noto Sans", "Helvetica Neue", Helvetica, Arial,
          //     sans-serif !important;
          // }

          /* CSS 변수 정의 */
          :root {
            --G1: #ffffff;
            --G2: #f9fafa;
            --G3: #f1f2f4;
            --G4: #dfe2e6;
            --G5: #c2c8cf;
            --G6: #a9afb6;
            --G7: #71777E;
            --G10: #000000;
            --M1: #e5fff7;
            --M2: #9bfbd9;
            --M3: #31edb5;
            --B1: #2376e5;
            --B2: #ff2d05;
            --sat: env(safe-area-inset-top);
            --sar: env(safe-area-inset-right);
            --sab: env(safe-area-inset-bottom);
            --sal: env(safe-area-inset-left);
          }
          img {
            -webkit-user-drag: none;
            user-select: none;
          }
          @media (max-width: 430px) {
            div::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background: rgba(0, 0, 0, 0.3); /* 스크롤바 막대 색상 */
            }

            div::-webkit-scrollbar {
              height: 6px;
              width: 6px;
            }
          }
          /* 필요에 따라 다른 전역 스타일 추가 */

          /* 세이프 에어리어 적용 */
          body {
            padding: var(--sat) var(--sar) var(--sab) var(--sal);
            padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);
            background-color: #ffffff;
          }

          /* 모바일 웹뷰에서 하단 여백 확보 */
          #root {
            min-height: calc(100vh + env(safe-area-inset-bottom));
            padding-bottom: env(safe-area-inset-bottom);
          }

          /* 기존 스크롤바 스타일 유지 */
          @media (max-width: 430px) {
            // ... 기존 스크롤바 스타일 ...
          }

          /* 하단 고정 버튼용 세이프 에어리어 */
          .btn {
            padding-bottom: env(safe-area-inset-bottom);
            padding-bottom: constant(safe-area-inset-bottom);
            margin-bottom: env(safe-area-inset-bottom);
            margin-bottom: constant(safe-area-inset-bottom);
          }

          /* 하단 고정 요소를 위한 설정 */
          .fixed-bottom {
            padding-bottom: var(--sab);
            padding-bottom: constant(safe-area-inset-bottom);
            margin-bottom: var(--sab);
            margin-bottom: constant(safe-area-inset-bottom);
          }

          /* 스크롤 가능한 컨텐츠 영역 */
          .scroll-content {
            padding-bottom: calc(var(--sab) + 16px);
            padding-bottom: calc(constant(safe-area-inset-bottom) + 16px);
          }
        `}
      />
      <App />
    </BrowserRouter>
  </RecoilRoot>
);

reportWebVitals();
