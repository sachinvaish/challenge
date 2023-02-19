import { Typography, Container, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Timer from "../../components/Timer";
import { getCurrentChallenge } from "../../redux/features/challengeSlice";
import ChallengeHeader from "./ChallengeHeader";
import PrizeSection from "./PrizeSection";

export default function CurrentChallenge() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { currentChallenge } = useSelector((state) => ({...state.ChallengeReducer}));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentChallenge());
  }, []);

  useEffect(() => {
    if (currentChallenge) {
      if (!Object.hasOwn(currentChallenge, "_id")) {
        setError(currentChallenge.message);
      }
    }
  }, [currentChallenge]);

  return (
    <Container>
      {!error ? (
        currentChallenge && (
          <>
            <ChallengeHeader challenge={currentChallenge} />
            <Typography variant="h6" textAlign="center">
              Submit Your Designs Before
            </Typography>
            <Box paddingX="auto" alignItems="center" marginX="30vw">
              {currentChallenge && (
                <Timer countDownDate={currentChallenge.due_date} />
              )}
            </Box>
            {currentChallenge && <PrizeSection challenge={currentChallenge} />}
            <Typography variant="h5" textAlign="center">
              Rules for challenge
            </Typography>
            <Box>
              <ul>
                <li><Typography>You must be 18+</Typography></li>
                <li><Typography>Your Design submission should be unique and not copied from online sources</Typography></li>
                <li><Typography>Your Design should match the quality standard of crowwwn</Typography></li>
                <li><Typography>Spamming Votes will lead to account termination</Typography></li>
                <li><Typography>Bullying people on comment section will be considered a crime</Typography></li>
                <li><Typography>Blah ! Blah ! Blah ! Blah !</Typography></li>
                <li><Typography>Blah ! Blah ! Blah ! Blah ! Blah ! Blah ! Blah ! Blah !</Typography></li>
              </ul>
            </Box>
          </>
        )
      ) : (
        <Box
          sx={{ width: "500px", height: "75vh" }}
          textAlign="center"
          py={"15%"}
          m={"auto"}
        >
          <Typography variant="h3" fontWeight="bold">
            Sorry!!!
          </Typography>
          <Typography variant="h5">{error}</Typography>
          <Typography variant="h6">Stay tuned...</Typography>
          <Button variant='contained' onClick={() => { navigate('/explore') }}>Explore past challenges</Button>
        </Box>
      )}
    </Container>
  );
}
