import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function SetPassword() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/setnewpassword/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                password: data.password
            })
        }).then((res) => res.json()
        ).then((res) => {
            toast(res.message);
            navigate('/');
        }).catch((error) => console.log(error));
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <Box sx={{ width: '400px' }} my={5}>
                <Typography mb={2} variant='h5'>Reset Password</Typography>
                <Box sx={{ marginBottom: '10px' }}>
                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>New Password</Typography>
                    <TextField {...register("password", { required: true })} type='password' size='small' fullWidth variant='outlined' placeholder='Enter new password' helperText={errors.password && 'This field is required'} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2, justifyContent: 'right', alignItems: 'justifyCon' }}>
                    <Button name='submit' type='submit' variant='contained' sx={{ width: '150px', ml: 2 }}>Set Password</Button>
                </Box>
            </Box>
            </form>
        </Box>
    );
}
