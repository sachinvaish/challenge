import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, Input, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React , {useState} from 'react';
import TagsInput from '../../components/TagsInput';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";

export default function SubmitDialog(props) {

    const { open, onClose } = props;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [tags, setTags] = useState([]);

    const handleTags=(tags)=>{
        setTags(tags);
    }

    const onSubmit = (data) => console.log(data);

    return (
        <Box>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='100%'>
                <Box sx={{ width: '100%' }} >
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                                <Grid item md={6} sm={12}>
                                    <Box sx={{ marginRight: '10px', height: '100%', border: '1px solid #c7c7c7', borderStyle: 'dashed', borderRadius: '10px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <Typography variant='h5' sx={{ margin: '20px', fontWeight: 'bold' }} >Upload Design*</Typography>
                                        <Input color='primary' name='photo' accept="image/*" multiple type="file" {...register("photo", { required: true })} />
                                        <Typography variant='subtitle2' sx={{ marginTop: '10px' }} >(For best results upload designs with a 4:3 ratio)</Typography>
                                        <Typography variant='subtitle2' sx={{ color:'red', marginTop: '10px' }} >{errors.photo && 'Please choose an Image'}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={6} sm={12}>
                                    <Box sx={{ marginBottom: '10px' }}>
                                        <Typography variant='body2' sx={{ marginBottom: '6px', fontWeight: 'bold' }}>How did you solve this challenge ?</Typography>
                                        <TextField {...register("description", { required: true })} fullWidth variant='outlined' multiline rows={4} placeholder='I did research and solved the challenge' helperText={errors.description && 'This field is required'} />
                                    </Box>
                                    <Box sx={{ marginY: '20px' }}>
                                        <Typography variant='body2' sx={{ fontWeight: 'bold' }} >Add tags</Typography>
                                        <TagsInput handleTags={handleTags}/>
                                        <input type='text' hidden {...register("tags")} value={tags}/>
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
                </Box>
            </Dialog>
        </Box>
    );
}
