import { Checkbox, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVote, VoteReducer } from '../redux/features/voteSlice';
import { useEffect } from 'react';

export default function Like(props) {
    const { value, submission_id } = props;
    const [like, setLike] = useState(false);
    const [votesCount, setVotesCount] = useState(0);
    const dispatch = useDispatch();
    const {user, isLoggedIn } = useSelector((state) => ({ ...state.UserReducer }));
    
    const handleVote = () => {
        if (localStorage.getItem('authToken')) {
            const authToken = localStorage.getItem('authToken');
            dispatch(toggleVote({ submission_id, authToken }));
            getVotes(submission_id);
        } else {
            alert('please login');
        }
    }

    const getVotes = async(submission_id)=>{
        let votes = await fetch(`http://localhost:5000/votes/${submission_id}`,{
            method:'GET',
            headers : {
                'Content-type':'application/json',
                'user_id' : user._id
            }
        });
        votes = await votes.json();
        console.log(votes);
        setVotesCount(votes.votesCount);
    }

    useEffect(() => {
        getVotes(submission_id);
    }, [])

    const onChange = () => {
        if (like) {
            setLike(false);
        } else {
            setLike(true);
        }
    }

    return (
        <>
        <Typography variant='h6'>{votesCount}</Typography>
        
            <Checkbox
                icon={<ThumbUpAltOutlinedIcon />}
                checkedIcon={<ThumbUpIcon />}
                onChange={handleVote}
            />
        </>

    )
}
