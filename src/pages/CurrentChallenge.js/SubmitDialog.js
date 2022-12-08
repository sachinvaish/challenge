import { Label, PhotoCamera } from '@mui/icons-material';
import { Box, Button, Dialog, FormControl, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import TagsInput from '../../components/TagsInput';

export default function SubmitDialog(props) {

    const { open, onClose } = props;

    return (
        <Box>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
                <Box sx={{ width: '100%', height: '800px', padding: '40px' }} >
                    <Typography variant='h5'>Submit Design</Typography>
                    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                        <Grid container>
                            <Grid item md={6}>
                                <Box sx={{ marginRight: '10px', height: '100%', border: '1px solid #c7c7c7', borderStyle: 'dashed', borderRadius: '10px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                                        Upload Design
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                    <Typography variant='subtitle2' sx={{ marginTop: '10px' }} >(For best results upload designs with a 4:3 ratio)</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ marginBottom: '6px' }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px' }}>How did you solve this challenge ?</Typography>
                                    <TextField fullWidth variant='outlined' multiline rows={6} placeholder='I did research and solved the challenge' />
                                </Box>
                                <Box sx={{ marginY: '6px' }}>
                                    <Typography variant='body2' >Add tags (upto 10)</Typography>
                                    <TagsInput />
                                </Box>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Dialog>
        </Box>
    );
}
