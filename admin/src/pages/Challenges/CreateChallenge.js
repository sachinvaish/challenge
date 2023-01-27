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
import { createChallenge } from '../../redux/services/challengeSlice';


// import DateFnsUtils from '@date-io/date-fns';

export default function CreateChallenge(props) {

    const { open, onClose } = props;
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { submission, error, loading } = useSelector((state) => ({ ...state.submissionReducer }));
    const [tags, setTags] = useState([]);
    const [img, setImg] = useState(null);
    const [deadline, setDeadline] = useState(null);
    // const dispatch = useDispatch();   

    const handleOnClose = () => {
        reset({ photo: null, description: null, tags: null, feedback: null });
        setImg(null);
        onClose();
    }

    // const handleOnChange = (e) => {
    //     console.log('onChange : ', e)
    //     setDeadline(e)
    // }

    // "photo_url": data.photo[0].name,
    const onSubmit = (data) => {
        // console.log(data);
        const challenge = {
            "title": data.title,
            "description": data.description,
            "firstPrize": data.firstPrize,
            "secondPrize": data.secondPrize,
            "feedbackPrize": data.feedbackPrize,
            "deadline": deadline
        }
        const authToken = localStorage.getItem('authToken');
        // console.log(challenge, authToken);
        dispatch(createChallenge({challenge, authToken}));
        handleOnClose();
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
                            <Grid item md={12} sm={12}  xs={12}>
                                <Box sx={{ marginBottom: '10px' , mr:2 }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Deadline</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            value={deadline}
                                            onChange={(newValue) =>setDeadline(newValue)}
                                            renderInput={(params) => <TextField size="small" disabled {...params} />}
                                            minDateTime={dayjs()}
                                            // {...register("deadline", { required: true })} helperText={errors.description && 'This field is required'}
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box sx={{ my: '0px', display: 'flex' }}>
                                    <Box xs={6}>
                                        <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>1st Prize</Typography>
                                        <TextField
                                            type='number'
                                            size='small'
                                            sx={{ mr: 1, width: 'auto' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            {...register("firstPrize", { required: true })}
                                        />
                                    </Box>
                                    <Box xs={6}>
                                        <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>2nd Prize</Typography>
                                        <TextField
                                            type='number'
                                            size='small'
                                            sx={{ mr: 1, width: 'auto' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            {...register("secondPrize", { required: true })}
                                        />
                                    </Box>
                                    <Box xs={6}>
                                        <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Feedback Prize</Typography>
                                        <TextField
                                            type='number'
                                            size='small'
                                            sx={{ mr: 1, width: 'auto' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            {...register("feedbackPrize", { required: true })}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', mt:2, justifyContent: 'right', alignItems: 'center' }}>
                            <Typography fontWeight='bold'>Total Spent : ₹ 1500</Typography>
                            <Button name='submit' type='submit' variant='contained' sx={{ width: '150px', ml: 2 }}>Post</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
