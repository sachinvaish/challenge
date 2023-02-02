import { Checkbox, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVote, VoteReducer } from '../redux/services/voteSlice';
import { useEffect } from 'react';

export default function Like(props) {
    const {submission_id } = props;
    const [like, setLike] = useState(false);
    const [votesCount, setVotesCount] = useState(0);
    const dispatch = useDispatch();
    const {user, isLoggedIn } = useSelector((state) => ({ ...state.UserReducer }));
    
    const handleVote = () => {
        if (localStorage.getItem('authToken')) {
            if(like){
                setLike(false);
            }else { setLike(true);}
            const authToken = localStorage.getItem('authToken');
            dispatch(toggleVote({ submission_id, authToken }));
            getVotes(submission_id);
            getIsLiked(submission_id, user._id);
        } else {
            alert('please login');
        }
    }

    const getVotes = async(submission_id)=>{
        let votes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/votes/${submission_id}`,{
            method:'GET',
            headers : {
                'Content-type':'application/json'
            }
        });
        votes = await votes.json();
        // console.log(votes);
        setVotesCount(votes.votesCount);
    }

    const getIsLiked = async(submission_id,user_id)=>{
        let isLiked = await fetch(`${process.env.REACT_APP_BACKEND_URL}/votes/isliked/${submission_id}/${user_id}`,{
            method:'GET',
            headers : {'Content-type':'application/json'}
        });
        isLiked = await isLiked.json();
        isLiked = isLiked.isLiked;
        if(isLiked)
            setLike(true);
        else
            setLike(false);

    }

    useEffect(() => {
        getVotes(submission_id);
        if(user)
        getIsLiked(submission_id, user._id);
    }, [])

    return (
        <>
        <Typography variant='h6'>{votesCount}</Typography>
        
            <Checkbox
                checked = {like}
                icon={<ThumbUpAltOutlinedIcon />}
                checkedIcon={<ThumbUpIcon />}
                onChange={handleVote}
            />
        </>

    )
}
