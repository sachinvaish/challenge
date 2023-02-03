import { AccountBox, Assignment, Mail, PermMedia } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '200px',
                flexShrink: 0
            }}
            variant="permanent"
            anchor='left'
            open={true}
        >
            <Box>
                {/* <h2>Crowwwn</h2>
                <Divider /> */}
                <List>
                    <ListItemButton onClick={()=>navigate('/admin/users')}>
                        <ListItemIcon>
                            <AccountBox />
                        </ListItemIcon>
                        <ListItemText>
                            Users
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/admin/challenges')}>
                        <ListItemIcon>
                            <Assignment />
                        </ListItemIcon>
                        <ListItemText>
                            Challenges
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/admin/submissions')}>
                        <ListItemIcon>
                            <PermMedia />
                        </ListItemIcon>
                        <ListItemText>
                            Submissions
                        </ListItemText>
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    );
}
