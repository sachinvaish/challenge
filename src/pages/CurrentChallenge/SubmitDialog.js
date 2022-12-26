import { Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import TagsInput from '../../components/TagsInput';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { PhotoCamera } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

// import {useDispatch} from 'react-redux';
// import {addSubmission} from '../../redux/actions';

export default function SubmitDialog(props) {

    const { open, onClose } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tags, setTags] = useState([]);
    const [img, setImg] = useState('');
    // const dispatch = useDispatch();


    const handleTags = (tags) => {
        setTags(tags);
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

    const handleOnClose = () => {
        onClose();
        setImg(null);
    }

    // "photo_url": data.photo[0].name,
    const onSubmit = (data) => {
        const newSubmission = {
            // "_id": Math.random(),
            "challenge_id": "63748a4dfcc73c0697996999",
            "user_id": "63748a4dfcc73c064d0000010",
            "photo_url": "https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/4076/thumb_world_cup_challenge.png",
            "description": data.description
        }
        // dispatch(addSubmission(newSubmission));
        onClose();
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth='lg'>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} >Submit Design</Box>
                        <Box>
                            <IconButton onClick={handleOnClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={() => { handleSubmit(onSubmit) }} encType='multipart/form-data'>
                        <Grid container>
                            <Grid item md={6} sm={12}>
                                <Box sx={{ marginRight: '10px', height: '100%', border: '1px solid #c7c7c7', borderStyle: 'dashed', borderRadius: '10px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    {img ? (
                                        <>
                                            <Box component='img' width='100%' height='430px' sx={{ objectFit: 'contain', padding: '8px', borderRadius: '15px' }} src={URL.createObjectURL(img)} />
                                            <ButtonGroup variant='contained' size='small'  sx={{ marginY: '10px' }} >
                                                <Button size='small' startIcon={<PhotoCamera />} variant='contained'color="primary" aria-label="upload picture" component="label">
                                                    <input hidden name='photo' accept="image/*" multiple type="file" {...register("photo", { required: true, onChange: (e) => { handleImageUpload(e) } })} />
                                                    Choose other image
                                                </Button>
                                                <Button component="label" color='error' mx={2} startIcon={<DeleteIcon/>} onClick={() => { setImg(null) }}>Delete</Button>
                                            </ButtonGroup>
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant='h5' sx={{ margin: '20px', fontWeight: 'bold' }} >Upload Design*</Typography>
                                            <Button size='small' startIcon={<PhotoCamera />} variant='contained' sx={{ marginY: '10px' }} color="primary" aria-label="upload picture" component="label">
                                                <input hidden color='primary' name='photo' accept="image/*" multiple type="file" {...register("photo", { required: true, onChange: (e) => { handleImageUpload(e) } })} />
                                                Choose image
                                            </Button>
                                            <Typography variant='subtitle2' sx={{ marginTop: '10px' }} >(For best results upload designs with a 4:3 ratio)</Typography>
                                            <Typography variant='subtitle2' sx={{ color: 'red', marginTop: '10px' }} >{errors.photo && 'Please choose an Image'}</Typography>
                                        </>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>How did you solve this challenge ?</Typography>
                                    <TextField {...register("description", { required: true })} fullWidth variant='outlined' multiline rows={4} placeholder='I did research and solved the challenge' helperText={errors.description && 'This field is required'} />
                                </Box>
                                <Box sx={{ marginY: '20px' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 'bold' }} >Add tags</Typography>
                                    <TagsInput handleTags={handleTags} />
                                    <input type='text' hidden {...register("tags")} value={tags} />
                                </Box>
                                <Box sx={{ marginY: '20px' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 'bold' }}  >Would you like feedback from the Crowwwn community?*</Typography>
                                    <RadioGroup row {...register("feedback")}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No Thanks" />
                                    </RadioGroup>
                                </Box>
                                <Button type='submit' variant='contained' fullWidth>Save changes</Button>
                            </Grid>

                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
