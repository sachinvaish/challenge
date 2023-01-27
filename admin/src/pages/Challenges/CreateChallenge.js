import { Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { PhotoCamera } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment/moment';


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

    const handleOnChange = (e) => {
        console.log('onChange : ', e)
        setDeadline(e)
    }

    // "photo_url": data.photo[0].name,
    const onSubmit = (data) => {
        console.log(data);
        const submission = {
            // "_id": Math.random(),
            "challenge_id": "63748a4dfcc73c064df4c744",
            "photo": data.photo[0],
            "description": data.description,
            "feedback": data.feedback
        }
        const authToken = localStorage.getItem('authToken');
        console.log(submission, authToken);
        // dispatch(createSubmission({submission, authToken}));
        handleOnClose();
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth='lg'>
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
                            <Grid item md={6} sm={12}>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Title</Typography>
                                    <TextField {...register("title", { required: true })} size='small' fullWidth variant='outlined' placeholder='Title here' helperText={errors.description && 'This field is required'} />
                                </Box>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Problem Statement</Typography>
                                    <TextField {...register("description", { required: true })} size='small' fullWidth variant='outlined' multiline rows={4} placeholder='Describe problem statement here' helperText={errors.description && 'This field is required'} />
                                </Box>
                                <Button name='submit' type='submit' variant='contained' fullWidth>Save changes</Button>
                            </Grid>
                            <Grid item md={6} sm={12} pl={2}>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            label="Deadline"
                                            value={deadline}
                                            onChange={handleOnChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            minDateTime={moment(Date.now())}
                                            sx={{size:'small'}}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <TextField
                                        label="1st Prize"
                                        size='small'
                                        sx={{ m: 1, width: '13ch' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label="2nd Prize"
                                        size='small'
                                        sx={{ m: 1, width: '13ch' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        label="Feedback Prize"
                                        size='small'
                                        sx={{ m: 1, width: '13ch' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        disabled
                                        label="Total Spent"
                                        size='small'
                                        sx={{ m: 1, width: '13ch' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        }}
                                    />
                                </Box>
                                <Button name='submit' type='submit' variant='contained' fullWidth>Save changes</Button>
                            </Grid>

                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
