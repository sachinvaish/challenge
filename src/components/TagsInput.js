import { Box, Chip, InputBase, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function TagsInput() {

    const [chips, setChips] = useState([]);
    const tagSuggestions = ['UX', 'UI', 'Graphic Design', 'UX Research', 'Web'];

    const handleDeleteChip = (chip, index) => {
        let newChips = chips.filter((x) => { return x !== chip });
        setChips(newChips);
    }

    const addChip = (e) => {
        if (e.key === 'Enter') {
            if(!chips.includes(e.target.value)){
                setChips(chips.concat(e.target.value));
            }
            e.target.value = null;
        }
    }

    const addTag = (tag) => {
        if(!chips.includes(tag)){
            setChips(chips.concat(tag));
        }

    }

    return (
        <>
            <Box sx={{ border: '1px solid #c7c7c7', borderRadius: '4px' }}>
                {chips.map((chip, index) => (
                    <Chip key={index} sx={{ margin: '4px', borderRadius: '7px' }} color='primary' label={chip} onDelete={() => { handleDeleteChip(chip, index) }} />
                ))}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter tags here"
                    inputProps={{ 'aria-label': 'Enter Tags' }}
                    onKeyUp={addChip}
                    fullWidth
                    maxLength={200}
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
