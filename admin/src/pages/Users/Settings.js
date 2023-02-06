import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Input, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';

export default function Settings() {
    const [open,setOpen]=useState(true);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onClose = () => {
        setOpen(false);
      }

      const onSubmit = (data) => {
        // const challenge = {
        //     "title": data.title,
        //     "description": data.description,
        //     "firstPrize": firstPrize,
        //     "secondPrize": secondPrize,
        //     "feedbackPrize": feedbackPrize,
        //     "deadline": deadline.toDate()
        // }
        // const authToken = localStorage.getItem('authToken');
        // if (authToken) {
        //     dispatch(createChallenge({ challenge, authToken }));
        //     handleOnClose();
        // } else {
        //     alert('Please login');
        // }
    }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>Username</Box>
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
                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Permissions</Typography>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Submissions" />
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Feedbacks" />
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Vote" />
                                </Box>
                                <Box sx={{ marginBottom: '10px' }}>
                                <Typography variant='body1' sx={{  fontWeight: 'bold' }}>Roles</Typography>
                                    <RadioGroup
                                        defaultValue="user"
                                        name="radio-buttons-group"
                                    >
                                        <Box sx={{display:'flex'}}>
                                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                        <FormControlLabel value="editor" control={<Radio />} label="Editor" />
                                        <FormControlLabel value="user" control={<Radio />} label="User" />
                                        </Box>
                                    </RadioGroup>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'right', alignItems: 'justifyCon' }}>
                            <Button name='submit' type='submit' variant='contained' sx={{ width: '150px', ml: 2 }}>Apply</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
  )
}
