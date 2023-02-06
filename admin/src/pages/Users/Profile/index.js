import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import Submissions from "../../../components/Submissions";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Profile(props) {
  const { username } = useParams();
  //fake submission & user details below
  const [userInfo, setUserInfo] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const onClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if (localStorage.getItem("authToken")) setOpen(true);
    else alert("please login");
  };

  useEffect(() => {
    // console.log('fetching user ')
    getUserByUsername(username);
  }, [username]);

  useEffect(() => {
    if (userInfo) {
      getSubmissionsByUserID(userInfo._id);
    }
  }, [userInfo]);

  const getUserByUsername = async (username) => {
    // console.log("getting user by username");
    try {
      // setUser(null);
      const user = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${username}`
      );
      const res = await user.json();
      setUserInfo(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubmissionsByUserID = async (user_id) => {
    try {
      const user = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/submissions/user/${user_id}`
      );
      const res = await user.json();
      // console.log('got submissions',res);
      setSubmissions(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box >
        <Grid container>
          <Grid item md={3}>
            {userInfo && <UserInfo userInfo={userInfo} />}
          </Grid>
          <Grid item md={9}>
            {submissions && submissions.length > 0 && (
              <>
                <Box
                  sx={{
                    marginX: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid container>
                    <Submissions
                      sm={12}
                      md={12}
                      lg={6}
                      submissions={submissions}
                    />
                  </Grid>
                </Box>
              </>
            )}
            {submissions && submissions.length < 1 && (
              <Typography textAlign="center" py={30} variant="h5">
                No Submissions to Display
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
