import { AccountBox, Assignment, Mail, PermMedia } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import React , {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [value, setValue] = useState(0);
     
    useEffect(() => {
        if (location === '/admin/dashboard') {
            setValue(0);
        }
        if (location === '/admin/users') {
            setValue(1);
        }
        if (location === '/admin/challenges') {
            setValue(2);
        }
        if (location === '/admin/submissions') {
            setValue(3);
        }
    }, [location]);

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
                <List gap={1}>
                <MenuItem onClick={()=>navigate('/admin/dashboard')} selected={value===0} divider>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>navigate('/admin/users')} selected={value===1} divider>
                        <ListItemIcon>
                            <AccountBox />
                        </ListItemIcon>
                        <ListItemText>
                            Users
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>navigate('/admin/challenges')} selected={value===2} divider>
                        <ListItemIcon>
                            <Assignment />
                        </ListItemIcon>
                        <ListItemText>
                            Challenges
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>navigate('/admin/submissions')} selected={value===3} divider>
                        <ListItemIcon>
                            <PermMedia />
                        </ListItemIcon>
                        <ListItemText>
                            Submissions
                        </ListItemText>
                    </MenuItem>
                </List>
            </Box>
        </Box>
    );
}
