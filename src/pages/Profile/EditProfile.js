import { Avatar, Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputBase, Radio, RadioGroup, Slider, TextField, Typography } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { PhotoCamera } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AvatarEditor from 'react-avatar-editor';
import { deletePhoto, updateProfilePhoto, updateUser } from '../../redux/features/userSlice';

export default function EditProfile(props) {

    const { open, onClose, userInfo, getUserByID } = props;
    const [preloadedValues, setPreloadedValues] = useState({
        username: userInfo.username,
        name: userInfo.name,
        designation: userInfo.designation,
        location: userInfo.location,
        about: userInfo.about,
        facebook_url: userInfo.facebook_url,
        instagram_url: userInfo.instagram_url,
        twitter_url: userInfo.twitter_url,
        linkedin_url: userInfo.linkedin_url,
        portfolio_url: userInfo.portfolio_url
    });

    const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: preloadedValues });
    const [img, setImg] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [scale, setScale] = useState(1);
    const [enableAvatar, setEnableAvatar] = useState(false);
    const dispatch = useDispatch();
    const editor = useRef(null);

    useEffect(() => {
        if (userInfo.photo_url){
            console.log('setting photourl', userInfo.photo_url);
            setProfilePhoto(`http://localhost:5000/uploads/profile/${userInfo.photo_url}`)
        }
    }, [])


    const handleOnClose = () => {
        // setImg(null);
        // setProfilePhoto(null);
        // getUserByID(user._id); ##
        setPreloadedValues(null);
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
            setEnableAvatar(true);
        }

        // if (file.size > 716800) {
        //     alert("File is too big!");
        //     e.target.value = "";
        // };
    };

    const handleCrop = () => {
        const base64 = editor.current.getImageScaledToCanvas().toDataURL();
        setProfilePhoto(base64);
        const authToken = localStorage.getItem('authToken');
        dispatch(updateProfilePhoto({ base64, authToken }));
        // getUserByID(user._id);
        setEnableAvatar(false);
        setImg(null);
    }

    const handleDelete = ()=>{
        const authToken = localStorage.getItem('authToken');
        console.log(authToken);
        const photo_url = userInfo.photo_url;
        dispatch(deletePhoto({ photo_url, authToken }));
        setProfilePhoto(null);
    }

    const onSubmit = (data) => {
        console.log(data);
        const updatedUser = {
            "user_id": userInfo._id,
            "username": data.username,
            "name": data.name,
            "designation": data.designation,
            "location": data.location,
            "about": data.about,
            "facebook_url": data.facebook_url,
            "instagram_url": data.instagram_url,
            "twitter_url": data.twitter_url,
            "linkedin_url": data.linkedin_url,
            "portfolio_url": data.portfolio_url
        }
        const authToken = localStorage.getItem('authToken');
        console.log(authToken);
        dispatch(updateUser({ updatedUser, authToken }));
        // getUserByID(user._id);  ##
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
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Grid container>
                            <Grid item md={3} sm={12} pr={1} >
                                <Typography mb={1}>Profile Image</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        {(!enableAvatar && profilePhoto) && <Box component='img' width={230} height={230} sx={{ objectFit: 'cover', padding: '8px', borderRadius: '200px' }} src={profilePhoto} />}
                                        {(!profilePhoto && !enableAvatar) &&
                                            <Avatar sx={{ width: 200, height: 200 }}>
                                                <AddAPhotoIcon />
                                            </Avatar>
                                        }
                                        {enableAvatar &&
                                            <AvatarEditor
                                                ref={editor}
                                                image={img && URL.createObjectURL(img)}
                                                width={250}
                                                height={250}
                                                border={20}
                                                borderRadius={200}
                                                color={[255, 255, 255, 0.6]} // RGBA
                                                scale={scale}
                                                rotate={0}
                                                style={{
                                                    width: "100%",
                                                    height: "auto"
                                                }}
                                            />}
                                    </Box>
                                    {enableAvatar && <Slider onChange={(e) => setScale(e.target.value)} step={0.0001} min={1} max={5} />}
                                    <Box gap={1} sx={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
                                        {!enableAvatar && <Button size='small' fullWidth startIcon={<PhotoCamera />} variant='contained' color="primary" aria-label="upload picture" component="label">
                                            <input hidden accept="image/*" type="file" {...register("photo", { onChange: (e) => { handleImageUpload(e); } })} />
                                            {profilePhoto ? 'Change' : 'Choose'}
                                        </Button>}

                                        {(profilePhoto && !enableAvatar) && <Button variant='contained' size='small' fullWidth color='error' onClick={handleDelete}>Delete</Button>}

                                        {img && <Button variant='contained' size='small' fullWidth color='success' onClick={() => { setImg(null); setEnableAvatar(false); }}>Delete</Button>}

                                        {enableAvatar && <Button variant='contained' size='small' fullWidth onClick={handleCrop}>Set</Button>}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={9} sm={12}>
                                <Grid container>
                                    <Grid item md={6} sm={12} px={1}>
                                        <Typography mb={1}>Personal Info</Typography>
                                        <Grid container gap={2}>
                                            <TextField {...register("name")} size='small' label='Name' fullWidth variant='outlined' />
                                            <TextField InputProps={{ readOnly: true }} {...register("username", { required: true })} size='small' label='Username' fullWidth variant='outlined' />
                                            <TextField {...register("designation")} size='small' label='Designation' fullWidth variant='outlined' />
                                            <TextField {...register("location")} size='small' label='Location' fullWidth variant='outlined' />
                                            <TextField {...register("about")} size='small' label='Let the world know who are you' fullWidth variant='outlined' multiline rows={4} placeholder='Describe yourself' />
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} sm={12} pl={1}>
                                        <Typography mb={1}>Social Profiles</Typography>
                                        <Grid container gap={2}>
                                            <Input
                                                id="input-with-icon-adornment"
                                                {...register("facebook_url")}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <FacebookRoundedIcon />
                                                    </InputAdornment>
                                                }
                                                placeholder='www.facebook.com/username'
                                                fullWidth
                                            />
                                            <Input
                                                id="input-with-icon-adornment"
                                                {...register("instagram_url")}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <InstagramIcon />
                                                    </InputAdornment>
                                                }
                                                placeholder='www.instagram.com/username'
                                                fullWidth
                                            />
                                            <Input
                                                id="input-with-icon-adornment"
                                                {...register("twitter_url")}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <TwitterIcon />
                                                    </InputAdornment>
                                                }
                                                placeholder='www.twitter.com/username'
                                                fullWidth
                                            />
                                            <Input
                                                id="input-with-icon-adornment"
                                                {...register("linkedin_url")}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <LinkedInIcon />
                                                    </InputAdornment>
                                                }
                                                placeholder='in.linkedin.com/in/username'
                                                fullWidth
                                            />
                                            <Input
                                                id="input-with-icon-adornment"
                                                {...register("portfolio_url")}
                                                placeholder='Other portfolio URL'
                                                fullWidth
                                            />
                                        </Grid>
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
