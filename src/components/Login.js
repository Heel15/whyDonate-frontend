import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErros] = useState({ isEmailInvalid: false, isPasswordFormatInvalid: false });
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget),
            email = data.get('email'),
            password = data.get('password');
        const { isEmailInvalid, isPasswordFormatInvalid } = validateFormValues(email, password);
        if (!isEmailInvalid && !isPasswordFormatInvalid) {
            setFormErros({ isEmailInvalid, isPasswordFormatInvalid });
            setIsLoading(true);
            axios
                .post('https://why-donate-backend.vercel.app/users/login', {
                    email,
                    password
                })
                .then((response) => {
                    setIsLoading(false);
                    if (response.status == 200) {
                        localStorage.setItem('token', response.data.token);
                        navigate('/tv-show');
                    }
                }).catch((e) => {
                    setIsLoading(false);
                    if (e.response) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: e.response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        } else {
            setFormErros({ isEmailInvalid, isPasswordFormatInvalid });
        }
    };

    const validateFormValues = (email, password) => {
        let isEmailInvalid = false, isPasswordFormatInvalid = false;
        if (email) {
            if (!email.includes('@') || !email.includes('.com')) {
                isEmailInvalid = true;
            }
        } else {
            isEmailInvalid = true;
        }
        if (password) {
            if (password.length < 8 || password.length > 16 || !/^[A-Za-z0-9]*$/.test(password)) {
                isPasswordFormatInvalid = true;
            }
        } else {
            isPasswordFormatInvalid = true;
        }
        return { isEmailInvalid, isPasswordFormatInvalid };
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={formErrors.isEmailInvalid ? true : false}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={formErrors.isEmailInvalid ? "Email must be valid!" : null}
                        />
                        <TextField
                            error={formErrors.isPasswordFormatInvalid ? true : false}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={formErrors.isPasswordFormatInvalid ? "Password must be minimum 8 and maximum 16 and only alphanumeric characters are allowed!" : null}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            disabled={isLoading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <span>Sign In</span>
                            {isLoading ? <CircularProgress style={{ marginLeft: '10px' }} color='inherit' size={16} /> : null}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}