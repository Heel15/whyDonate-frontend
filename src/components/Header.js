import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function Header() {
    const navigate = useNavigate();
    const loginBtnHandler = () => {
        navigate('/login');
    }
    const homeBtnHandler = () => {
        navigate('/home');
    }
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            WhyDonate
                        </Typography>
                        <Button onClick={homeBtnHandler} color="inherit">Home</Button>
                    </div>
                    <Button onClick={loginBtnHandler} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}