import { Checkbox, Typography, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import React, { useState } from 'react';

export default function Like(props) {
    const { value, method } = props;
    const [like, setLike] = useState(false);

    const onChange = () => {
        if (like) {
            setLike(false);
            method(value - 1);
        } else {
            setLike(true);
            method(value + 1);
        }
    }

    return (
        <Checkbox
            icon={<ThumbUpAltOutlinedIcon />}
            checkedIcon={<ThumbUpIcon />}
            onChange={onChange}
        />

    )
}
