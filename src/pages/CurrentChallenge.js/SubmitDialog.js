import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Dialog, FormControl, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

export default function SubmitDialog(props) {

    const { open, onClose } = props;

    return (
        <Box>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
                <Box sx={{ width: '100%', height: '800px', padding: '20px' }} >
                    <Typography variant='h5'>Submit Design</Typography>
                    <FormControl sx={{ width: '100%' }}>
                        <Grid container>
                            <Grid item md={6}>
                                <Box sx={{ marginRight: '10px', height: '100%', border: '1px solid #c7c7c7', borderStyle: 'dashed', borderRadius: '10px', justifyContent:'center', alignItems:'center', display:'flex' }}>
                                    <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                                        Upload Dexign
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item md={6} sx={{ border: '2px solid red' }}>
                                <TextField fullWidth variant='outlined' helperText='Enter name here' label='Name' />
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Dialog>
        </Box>
    );
}
