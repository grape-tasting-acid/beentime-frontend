import './App.css';
import reset, { Reset } from 'styled-reset';
import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import CreateEventPage from './page/CreateEventPage/CreateEventPage';
import Sharing from './page/Sharing/Sharing';
import AttendanceEventPage from './page/AttendanceEventPage/AttendanceEventPage';
import AttendanceListPage from './page/AttendanceListPage/AttendanceListPage';

function App() {
  return (
    <>
      <Reset />
      <Global styles={[reset]} />
        <Routes>
          <Route path='/' element={<CreateEventPage />} />
          <Route path='/sharing' element={<Sharing />} />
          <Route path='/attend' element={<AttendanceEventPage />} />
          <Route path='/list' element={<AttendanceListPage />} />
        </Routes>
    </>
  );
} 

export default App;
  