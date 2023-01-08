import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import Submissions from '../../components/Submissions';
import { useParams } from 'react-router';
import EditProfile from './EditProfile';

export default function Profile(props) {

  const { id } = useParams();
  //fake submission & user details below
  const challenge_id = '63748a4dfcc73c064df4c744';
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState(null);

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  }

  const handleClick = () => {
    if (localStorage.getItem('authToken'))
      setOpen(true);
    else
      alert('please login');
  }

  useEffect(() => {
    // console.log('fetching user ')
    getUserByID(id);
    getSubmissionsByUserID(id);
  }, []);

  const getUserByID = async (user_id) => {
    console.log('getting user by ID');
    try {
      setUser(null);
      const user = await fetch(`http://localhost:5000/users/${user_id}`);
      const res = await user.json();
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  }

  const getSubmissionsByUserID = async (user_id) => {
    try {
      const user = await fetch(`http://localhost:5000/submissions/user/${user_id}`);
      const res = await user.json();
      setSubmissions(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box m={4}>
        {user && <EditProfile open={open} onClose={onClose} user={user}  getUserByID={getUserByID}  />}
        <Grid container>
          <Grid item md={3}>
            {user && <UserInfo user={user} handleEdit={handleClick}/>}
          </Grid>
          <Grid item md={9}>
            {(submissions && submissions.length > 0) && (<>
              <Box sx={{ marginX: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Grid container>
                  <Submissions sm={12} md={12} lg={6} challenge_id={challenge_id} submissions={submissions} />
                </Grid>
              </Box>
            </>)}
            {(submissions && submissions.length < 1) && <Typography textAlign='center' py={30} variant='h5'>No Submissions to Display</Typography>}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
