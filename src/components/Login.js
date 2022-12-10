import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login(props) {

    const { open, onClose } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // const newSubmission={
        //     "_id": Math.random(),
        //     "challenge_id": "63748a4dfcc73c0697996999",
        //     "user_id": "63748a4dfcc73c064d0000010",
        //     "photo_url": "https://crowwwn-prod.s3.amazonaws.com/uploads/submission/image/4049/thumb_Vending_Machine_App_-_By_Satish_Naukudkar.png",
        //     "description": data.description
        // }
        // dispatch(addSubmission(newSubmission));
        // onClose();
        console.log(data);
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth >
                <DialogTitle>
                    Login
                </DialogTitle>
                <DialogContent sx={{height:'300px'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow:'1'}}>
                            <TextField label='Email' {...register("email", {
                                required: true, pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })} helperText={errors.email && 'Please enter valid Email'} />

                            <TextField label='Password' type='password' {...register("password", { required: true })} />

                            <Button type='submit' variant='contained'>Login</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
