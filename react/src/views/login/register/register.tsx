import React, { FormEvent, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import API from '../../../API';
import { loginApi } from '../login-helper';
import { setLoginAction } from '../../../store/actions/globalActions';
import { useStyles } from './style';

const Register = ({ setLogin }: {setLogin: any}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [salon, setSalon] = useState('');
  const [errorCredentials, setErrorCredentials] = useState(false);
  const [errorValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleRegistration = async () => {
    const instance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
    try {
      await instance.request({
        url: `${API.API_URL}${API.REGISTRATION}`,
        method: 'post',
        data: JSON.stringify({
          email, password, firstName, lastName, phone, salon,
        }),
      });
    } catch (e) {
      if (e.response.status && e.response.status !== 200) {
        return false;
      }
    }
    return true;
  };

  const validateForm = () => email.length >= 0 && password.length >= 0;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      if (await handleRegistration()) {
        loginApi(email, password).then((response) => {
          if (!response) {
            setErrorCredentials(true);
          } else {
            localStorage.setItem('token', response.data.accessToken);
            setLogin(true);
            setRedirect(true);
          }
        })
          .catch((e) => console.log(e));
      }
    }
  };

  const displayErrorMessage = () => {
    let message = '';
    if (errorValidation) {
      message = 'Please enter valid credentials';
    } else if (errorCredentials) {
      message = 'Wrong mail/password combination';
    } else {
      message = 'Something went wrong, support has been informed';
    }
    return (
      <div className={classes.error}>
        {message}
      </div>
    );
  };

  const form = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="business"
                label="Name of my business"
                name="business"
                autoComplete="business"
                value={salon}
                onChange={(e) => setSalon(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          {errorValidation || errorCredentials ? displayErrorMessage() : ''}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/admin/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return redirect ? <Redirect to="dashboard" /> : form();
};

const MapDispatchToProps = (dispatch: any) => ({
  setLogin: () => dispatch(setLoginAction(true)),
});

export default connect(null, MapDispatchToProps)(Register);