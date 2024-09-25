import { Route, Routes } from 'react-router-dom';
import CreateEventPage from './page/CreateEventPage/CreateEventPage';
import Sharing from './page/Sharing/Sharing';
import AttendanceEventPage from './page/AttendanceEventPage/AttendanceEventPage';
import AttendanceListPage from './page/AttendanceListPage/AttendanceListPage';

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
