import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import { Outlet, Route, Routes } from 'react-router-dom';
import Challenges from './pages/Challenges';
import Users from './pages/Users.js';
import Submissions from './pages/Submissions';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import Layout from './pages/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='challenges' element={<Challenges />} />
          <Route path='users' element={<Users />} />
          <Route path='submissions' element={<Submissions />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
