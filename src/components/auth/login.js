import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../nav/navbar'



const theme = createTheme();

export default function Login() {
  const history = useHistory()
    const intialFormData = Object.freeze({
        username: '',
        password: '',
    });

    const [formData, updateFormData] = useState(intialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            //Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
        .post(`token/`, {
            email: formData.email,
            password: formData.password,
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.access);;
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
            history.push('/main')
            //console.log(res)
            //console.log(res.data)
        })
  };
  

  return (
    <React.StrictMode>
      <Navbar/>
      <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            Logic Concrete
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="contraseña-actual"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{background: '#c67649'}}
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              
            >
              Iniciar Sesion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link 
                    style={{textDecoration: 'none'}}
                    href="#" 
                    variant="body2">
                  Olvidaste tu Contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link 
                    style={{textDecoration: 'none'}}
                    to="/register" 
                    variant="body2">
                  Solicitud de Usuario
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </React.StrictMode>
    
  );
}