import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';
import TagsInput from '../../components/TagsInput';
import CloseIcon from '@mui/icons-material/Close';

export default function SubmitDialog(props) {

    const { open, onClose } = props;
    
    const handleSubmit=(e)=>{

    }

    return (
        <Box>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
                <Box sx={{ width: '100%'}} >
                    <DialogTitle id="id">
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1} >Submit Design</Box>
                            <Box>
                                <IconButton onClick={onClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item md={6}>
                                <Box sx={{ marginRight: '10px', height: '100%', border: '1px solid #c7c7c7', borderStyle: 'dashed', borderRadius: '10px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <Typography variant='h5' sx={{ margin: '20px', fontWeight: 'bold' }} >Upload Design*</Typography>
                                    <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                                        Choose Image
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                    <Typography variant='subtitle2' sx={{ marginTop: '10px' }} >(For best results upload designs with a 4:3 ratio)</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>How did you solve this challenge ?</Typography>
                                    <TextField fullWidth variant='outlined' multiline rows={4} placeholder='I did research and solved the challenge' />
                                </Box>
                                <Box sx={{ marginY: '20px' }}>
                                    <Typography variant='body2' sx={{fontWeight: 'bold'}} >Add tags</Typography>
                                    <TagsInput />
                                </Box>
                                <Box sx={{ marginY: '20px' }}>
                                    <Typography variant='body2' sx={{fontWeight: 'bold'}}  >Would you like feedback from the Crowwwn community?*</Typography>
                                    <RadioGroup row>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No Thanks" />
                                    </RadioGroup>
                                </Box>
                                <Button variant='contained' fullWidth>Save changes</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Box>
            </Dialog>
        </Box>
    );
}
