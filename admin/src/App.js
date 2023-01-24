import { Route, Routes } from 'react-router-dom';
import Challenges from './pages/Challenges';
import Users from './pages/Users';
import Submissions from './pages/Submissions';
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
