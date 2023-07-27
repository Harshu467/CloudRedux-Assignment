import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useUserContext} from '../Context/UserContext'
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const { setUser } = useUserContext(); 
  const [data,setdata] = useState({
    email:"",
    password:""
  })
  const { email, password } = data;
  const navigate = useNavigate();
  const validateForm = () => {

    const newErrors = {
      email: "",
      password: "",
    };

    let formIsValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      toast.error(newErrors.email);
      formIsValid = false;

    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      toast.error(newErrors.email)
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      toast.error(newErrors.password)
      formIsValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
      toast.error(newErrors.password)
      formIsValid = false;
    }

    return formIsValid;
  };
  const dataChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setdata(newData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle Submit")
    const formIsValid = validateForm();
    if (!formIsValid) {
      return;
    }
    try {
      const result = await axios.post('http://localhost:5000/api/v1/login',data)
      if (result.data.success) {
        setUser(result.data.data)
        console.log(result.data.data)
        localStorage.setItem('user', JSON.stringify(result.data.data));
        navigate('/profile')
        toast.success(result.data.message, { duration: 5000 })
        console.log(result)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message ?? "An error occurred", { duration: 5000 })
    }
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
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={dataChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={dataChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}