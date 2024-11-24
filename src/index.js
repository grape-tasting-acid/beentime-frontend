/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Global, css } from '@emotion/react'; // Global과 css 가져오기

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      {/* Global 컴포넌트를 사용하여 전역 스타일 적용 */}
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: "Noto Sans Korean", "Helvetica Neue", Helvetica, Arial, sans-serif;
          }

          /* CSS 변수 정의 */
          :root {
            --G1: #FFFFFF;
            --G2: #F9FAFA;
            --G3: #F1F2F4;
            --G4: #DFE2E6;
            --G5: #C2C8CF;
            --G6: #A9AFB6;
            --G10: #000000;
            --M1: #E5FFF7;
            --M2: #9BFBD9;
            --M3: #31EDB5;
            --B1: #2376E5;
            --B2: #FF2D05;
          }
          img {
            -webkit-user-drag: none;
            user-select: none;
          }
          /* 필요에 따라 다른 전역 스타일 추가 */
        `}
      />
      <App />
    </BrowserRouter>
  </RecoilRoot>
);

reportWebVitals();
