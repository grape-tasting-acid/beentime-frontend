import { Route, Routes } from 'react-router-dom';
import CreateEventPage from './page/CreateEventPage/CreateEventPage';
import Sharing from './page/Sharing/Sharing';
import AttendanceEventPage from './page/AttendanceEventPage/AttendanceEventPage';
import AttendanceListPage from './page/AttendanceListPage/AttendanceListPage';
import { css, Global } from '@emotion/react';


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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateEventPage />} />
        <Route path="/edit" element={<CreateEventPage />} />
        <Route path="/sharing" element={<Sharing />} />
        <Route path="/attend" element={<AttendanceEventPage />} />
        <Route path="/list" element={<AttendanceListPage />} />
      </Routes>
    </>
  );
}

export default App;
