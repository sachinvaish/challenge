import { Box, Chip, InputBase, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function TagsInput() {

    const [chips, setChips] = useState([]);
    const tagSuggestions = ['UX', 'UI', 'Graphic Design', 'UX Research'];

    const handleDeleteChip = (chip, index) => {
        let newChips = chips.filter((x) => { return x !== chip });
        setChips(newChips);
    }

    const addChip = (e) => {
        if (e.key === 'Enter') {
            if (chips.length === 0) {
                setChips(chips.concat(e.target.value));
                e.target.value = null;
                return;
            }
            for (let index = 0; index < chips.length; index++) {
                const element = chips[index];
                if (element !== e.target.value) {
                    setChips(chips.concat(e.target.value));
                }
            }
            e.target.value = null;
        }
    }

    const addTag = (tag) => {
        console.log("addTag called");
        console.log("  Tag : " + tag);
        if (chips.length === 0) {
            setChips(chips.concat(tag));
            return;
        }
        for (let index = 0; index < chips.length; index++) {
            const element = chips[index];
            if (element !== tag) {
                setChips(chips.concat(tag));
            }
        }

    }

    return (
        <>
            <Box sx={{ border: '1px solid grey' }}>
                {chips.map((chip, index) => (
                    <Chip key={index} sx={{ margin: '4px', borderRadius: '7px' }} color='primary' label={chip} onDelete={() => { handleDeleteChip(chip, index) }} />
                ))}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter tags here"
                    inputProps={{ 'aria-label': 'Enter Tags' }}
                    onKeyUp={addChip}
                />
            </Box>
            <Box sx={{ marginY: '2px' }}>
                <Typography variant='body2' sx={{ marginBottom: '4px' }}>Tags Suggestions</Typography>
                {tagSuggestions.map((tag, index) => (
                    <Link key={index} onClick={() => { addTag(tag) }} variant='subtitle1' sx={{ cursor: 'pointer', textDecoration: 'none', marginRight: '8px' }}>{tag}</Link>
                ))}
            </Box>
        </>
    );
}
