import { Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { PhotoCamera } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';

export default function EditProfile(props) {

    const { open, onClose } = props;
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [img, setImg] = useState(null);
    const dispatch = useDispatch();

    const handleOnClose = () => {
        reset({ photo: null, description: null, tags: null, feedback: null });
        setImg(null);
        onClose();
    }

    const handleImageUpload = (e) => {
        // If no image selected, return
        const file = e.target.files[0];
        if (!/^image\//.test(file.type)) {
            alert(`File ${file.name} is not an image.`);
            return false;
        } else {
            console.log('no errors, setting image')
            setImg(file);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        const submission = {
            // "_id": Math.random(),
            "challenge_id": "0123456789",
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
                        <Box flexGrow={1} >Edit Profile</Box>
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
                            <Grid item md={3} sm={12}>
                                <Box sx={{ marginRight: '10px', height: '100%', border: '1px solid #c7c7c7', borderStyle: 'dashed', borderRadius: '10px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    {img && <Box component='img' width='100%' height='430px' sx={{ objectFit: 'contain', padding: '8px', borderRadius: '15px' }} src={URL.createObjectURL(img)} />}
                                    {!img && <Typography variant='h5' sx={{ margin: '10px', fontWeight: 'bold' }} >Upload Design*</Typography>}
                                    <ButtonGroup variant='contained' size='small' sx={{ marginY: '10px' }} >
                                        <Button size='small' startIcon={<PhotoCamera />} variant='contained' color="primary" aria-label="upload picture" component="label">
                                            <input hidden accept="image/*" type="file" {...register("photo", { required: true, onChange: (e) => { handleImageUpload(e) } })} />
                                            {img ? 'Choose other Image' : 'Choose Image'}
                                        </Button>
                                        {img &&
                                            <Button component="label" color='error' mx={2} startIcon={<DeleteIcon />} onClick={() => { setImg(null) }}>Delete</Button>
                                        }
                                    </ButtonGroup>
                                    {!img && <Typography variant='subtitle2' sx={{ marginTop: '10px' }} >(For best results upload designs with a 4:3 ratio)</Typography>}
                                    {errors.photo && <Typography sx={{ color: 'red', fontWeight: 'bold' }}>Please choose a file</Typography>}
                                </Box>
                            </Grid>
                            <Grid item md={9} sm={12}>
                                <Grid container mt={1}>
                                    <Grid item md={6} sm={12} px={1}>
                                        <Grid container gap={2}>
                                            <TextField {...register("name", { required: true })} size='small' label='Name' fullWidth variant='outlined' />
                                            <TextField {...register("username", { required: true })} size='small' label='Username' fullWidth variant='outlined' />
                                            <TextField {...register("designation", { required: true })} size='small' label='Designation' fullWidth variant='outlined' />
                                            <TextField {...register("location", { required: true })} size='small' label='Location' fullWidth variant='outlined' />
                                            <TextField {...register("about", { required: true })} size='small' label='Let the world know who are you' fullWidth variant='outlined' multiline rows={4} placeholder='Describe yourself'/>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} sm={12} pl={1}>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                            <Button name='submit' type='submit' variant='contained'>Save changes</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
