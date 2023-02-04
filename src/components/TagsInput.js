import { Box, Chip, InputBase, Link, TextField, Typography } from '@mui/material';
import React, { useState , useEffect} from 'react';

export default function TagsInput(props) {

    const {handleTags}=props;
    const [chips, setChips] = useState([]);
    const tagSuggestions = ['UX', 'UI', 'Graphic Design', 'UX Research', 'Web'];

    // useEffect(() => {
    //   return () => {
    //     handleTags(chips);
    //   };
    // });

    const handleDeleteChip = (chip, index) => {
        let newChips = chips.filter((x) => { return x !== chip });
        setChips(newChips);
        handleTags(newChips);
    }

    const addChip = (e) => {
        if (e.key === 'Enter'&& e.target.value) {
            if(!chips.includes(e.target.value)){
                setChips(chips.concat(e.target.value));
                handleTags(chips.concat(e.target.value));
            }
            e.target.value = null;
        }
    }

    const addTag = (tag) => {
        if(!chips.includes(tag)){
            setChips(chips.concat(tag));
            handleTags(chips.concat(tag));
        }

    }

    return (
        <>
            <Box sx={{ border: '1px solid #c7c7c7', borderRadius: '4px' }}>
                {chips.map((chip, index) => (
                    <Chip key={index} sx={{ margin: '4px', borderRadius: '7px' }} color='primary' label={chip} onDelete={() => { handleDeleteChip(chip, index) }} />
                ))}
                <TextField
                multiline rows={1}
                variant="standard"
                    sx={{ ml: 1, flex: 1, border:'none' }}
                    placeholder="Enter Tags Here"
                    onKeyUp={addChip}
                    fullWidth
                    maxLength={150}
                    InputProps={{
                        disableUnderline: true // <== added this
                      }}
                />
            </Box>
            <Box sx={{ marginY: '15px', display:'flex' }}>
                <Typography variant='body2' sx={{ marginTop: '5px' }}>Suggested Tags : </Typography>
                {tagSuggestions.map((tag, index) => (
                    <Link key={index} onClick={() => { addTag(tag) }} variant='subtitle1' sx={{ userSelect:'none', fontWeight:'bold', cursor: 'pointer', textDecoration: 'none', marginX: '5px' }}>{tag}</Link>
                ))}
            </Box>
        </>
    );
}
