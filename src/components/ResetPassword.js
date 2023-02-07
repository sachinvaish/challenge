import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ResetPassword(props) {
    const { onClose} = props;
    const [open, setOpen] = useState(props.open);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/resetpassword`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                email : data.email
            })
        }).then((res)=>res.json()
        ).then((res)=>{
            toast(res.message);
        }).catch((error)=>console.log(error));

        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>Forgot Password</Box>
                    <Box>
                        <IconButton onClick={onClose}>
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
                                <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Enter your email to receive password reset link</Typography>
                                <TextField {...register("email", { required: true })} size='small' fullWidth variant='outlined' placeholder='Enter your email' helperText={errors.subject && 'This field is required'} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', mt: 2, justifyContent: 'right', alignItems: 'justifyCon' }}>
                        <Button name='submit' type='submit' variant='contained' sx={{ width: '150px', ml: 2 }}>Send</Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
}
