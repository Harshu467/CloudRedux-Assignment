import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios'
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const [data,setdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const { firstName, lastName, email, password } = data;
  const validateForm = () => {

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    let formIsValid = true;

    if (!firstName) {
      newErrors.firstName = "First Name is required";
      toast.error(newErrors.firstName)
      formIsValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Last Name is required";
      toast.error(newErrors.lastName)
      formIsValid = false;
    }

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
      const result = await axios.post('http://localhost:5000/api/v1/register',data)
      if (result.data.success) {
        // dispatch(registerUser(result.data.data));
        navigate('/login')
        toast.success(result.data.message, { duration: 5000 })
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange={dataChange}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={dataChange}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={dataChange}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={dataChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item> 
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Toaster
        position="top-right"
        reverseOrder={false}
      />
        </Box>
      </Container>

    </ThemeProvider>
  );
}