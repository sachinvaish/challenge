import { Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { FormatAlignJustify, PhotoCamera } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { createChallenge, getAllChallenges } from '../../redux/services/challengeSlice';


// import DateFnsUtils from '@date-io/date-fns';

export default function CreateChallenge(props) {

    const { open, onClose } = props;
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [firstPrize, setFirstPrize] = useState(0);
    const [secondPrize, setSecondPrize] = useState(0);
    const [feedbackPrize, setFeedbackPrize] = useState(0);
    const [deadline, setDeadline] = useState(dayjs().add(1,'day'));
    // const dispatch = useDispatch();   

    const handleOnClose = () => {
        dispatch(getAllChallenges());
        setTimeout(() => {
            reset({ title: "", description: "" });
            setFirstPrize(0);
            setSecondPrize(0);
            setFeedbackPrize(0);
            setDeadline(dayjs(''));
        }, 500);
        onClose();
    }

    // const handleOnChange = (e) => {
    //     console.log('onChange : ', e)
    //     setDeadline(e)
    // }

    // "photo_url": data.photo[0].name,
    const onSubmit = (data) => {
        const challenge = {
            "title": data.title,
            "description": data.description,
            "firstPrize": firstPrize,
            "secondPrize": secondPrize,
            "feedbackPrize": feedbackPrize,
            "deadline": deadline.toDate()
        }
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            dispatch(createChallenge({ challenge, authToken }));
            handleOnClose();
        } else {
            alert('Please login');
        }
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>Create Challenge</Box>
                        <Box>
                            <IconButton onClick={handleOnClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                        <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Title</Typography>
                                    <TextField {...register("title", { required: true })} size='small' fullWidth variant='outlined' placeholder='Title here' helperText={errors.description && 'This field is required'} />
                                </Box>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Problem Statement</Typography>
                                    <TextField {...register("description", { required: true })} size='small' fullWidth variant='outlined' multiline rows={4} placeholder='Describe problem statement here' helperText={errors.description && 'This field is required'} />
                                </Box>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Deadline</Typography>
                                <Box sx={{ marginBottom: '10px', mr: 2, display: 'flex', alignItems:'center' }}>
                                    <Box>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={deadline}
                                                inputFormat='lll'
                                                onChange={(newValue) => setDeadline(newValue)}
                                                renderInput={(params) => <TextField size="small" required disabled {...params} />}
                                                minDateTime={dayjs()}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1, marginLeft: 2 }}>
                                        <Typography color='primary' onClick={() => { setDeadline(dayjs().add(3, 'day')) }} variant='body2' sx={{cursor:'pointer', fontWeight:'bold'}} >3 Days</Typography>
                                        <Typography color='primary' onClick={() => { setDeadline(dayjs().add(7, 'day')) }} variant='body2' sx={{cursor:'pointer', fontWeight:'bold'}}>7 Days</Typography>
                                        <Typography color='primary' onClick={() => { setDeadline(dayjs().add(10, 'day')) }} variant='body2' sx={{cursor:'pointer', fontWeight:'bold'}}>10 Days</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ my: '0px', display: 'flex' }}>
                                    <Box xs={6}>
                                        <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>1st Prize</Typography>
                                        <TextField
                                            value={firstPrize}
                                            type='number'
                                            size='small'
                                            sx={{ mr: 1, width: 'auto' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            onChange={(e) => setFirstPrize(Number(e.target.value))}
                                        />
                                    </Box>
                                    <Box xs={6}>
                                        <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>2nd Prize</Typography>
                                        <TextField
                                            value={secondPrize}
                                            type='number'
                                            size='small'
                                            sx={{ mr: 1, width: 'auto' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            onChange={(e) => setSecondPrize(Number(e.target.value))}
                                        />
                                    </Box>
                                    <Box xs={6}>
                                        <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Feedback Prize</Typography>
                                        <TextField
                                            value={feedbackPrize}
                                            type='number'
                                            size='small'
                                            sx={{ mr: 1, width: 'auto' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            onChange={(e) => setFeedbackPrize(Number(e.target.value))}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'right', alignItems: 'center' }}>
                            <Typography fontWeight='bold'>Total Spent : ₹ {firstPrize + secondPrize + feedbackPrize}</Typography>
                            <Button name='submit' type='submit' variant='contained' sx={{ width: '150px', ml: 2 }}>Post</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
