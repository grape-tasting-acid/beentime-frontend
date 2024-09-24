/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Global, css } from '@emotion/react'; // Global과 css 가져오기

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
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
            font-family: 'Noto Sans', sans-serif;
          }

          /* 필요에 따라 다른 전역 스타일 추가 */
        `}
      />
      <App />
    </BrowserRouter>
  </RecoilRoot>
  // </React.StrictMode>
);

reportWebVitals();
