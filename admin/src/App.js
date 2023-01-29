import { Route, Routes } from 'react-router-dom';
import Challenges from './pages/Challenges';
import Users from './pages/Users';
import Submissions from './pages/Submissions';
import SubmissionView from './pages/SubmissionView';
import Layout from './pages/Layout';
import ChallengeDetail from './pages/ChallengeDetail';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='challenges' element={<Challenges />} />
          <Route path='challenge/:challengeID' element={<ChallengeDetail />} />
          <Route path='users' element={<Users />} />
          <Route path='submissions' element={<Submissions />} />
          <Route path="submission/:id" element={<SubmissionView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
