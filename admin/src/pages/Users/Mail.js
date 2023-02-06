import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';


export default function Mail(props) {
    const { user, method, open, onClose } = props;
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const mailData = {
            email: user.email,
            subject: data.subject,
            message: data.message
        }
        method(mailData);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>Compose to : {user.name}</Box>
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
                                <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Subject</Typography>
                                <TextField {...register("subject", { required: true })} size='small' fullWidth variant='outlined' placeholder='Subject here' helperText={errors.subject && 'This field is required'} />
                            </Box>
                            <Box sx={{ marginBottom: '10px' }}>
                                <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>Message</Typography>
                                <TextField {...register("message", { required: true })} size='small' multiline minRows={5} maxRows={8} fullWidth variant='outlined' placeholder='Write your message here' helperText={errors.message && 'This field is required'} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', mt: 2, justifyContent: 'right', alignItems: 'justifyCon' }}>
                        <Button name='submit' type='submit' variant='contained' sx={{ width: '150px', ml: 2 }}>Send</Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    )
}
