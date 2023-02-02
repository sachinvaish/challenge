import { Route, Routes, useNavigate } from 'react-router-dom';
import Challenges from './pages/Challenges';
import Users from './pages/Users';
import Submissions from './pages/Submissions';
import SubmissionView from './pages/SubmissionView';
import Layout from './pages/Layout';
import ChallengeDetail from './pages/ChallengeDetail';
import Auth from './pages/Auth';
import { getUser } from './redux/services/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, isLoggedIn } = useSelector((state) => ({ ...state.UserReducer }));
  
  useEffect(() => {
    if (localStorage.getItem('authToken')){
        dispatch(getUser(localStorage.getItem('authToken')));
    }
    if (isLoggedIn) {
      navigate('/');
  }else{
    navigate('/auth')
  }
}, [isLoggedIn]);


  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
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
