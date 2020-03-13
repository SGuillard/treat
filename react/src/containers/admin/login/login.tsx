import React, { FormEvent, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Link } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { LoginApi } from './api-login';
import API from '../../../API';
import { SET_LOGIN_ACTION } from '../../../store/actions/constants';
import { setLoginAction, statusAdminUser } from '../../../store/actions/adminUsersActions';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    backgroundColor: 'red',
    borderRadius: '10px',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
  },
}));

const loginApi = async (login: any, password: any) => {
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    const getToken = await instance.request({
      url: `${API.API_URL}${API.LOGIN}`,
      method: 'post',
      data: JSON.stringify({ username: login, password }),
    });
    return getToken;
  } catch (e) {
    if (e.response.status && e.response.status === 401) {
      return false;
    }
    throw Error(e);
  }
};

const Login = (props: any) => {
  const { setLogin } = props;
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorCredentials, setErrorCredentials] = useState(false);
  const [errorValidation, setErrorValidation] = useState(false);
  const [redirect] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validateForm = () => email.length > 0 && password.length > 0;

    if (validateForm()) {
      setLogin(true);

      loginApi(email, password).then((response) => {
        if (!response) {
          setErrorCredentials(true);
        } else {
          localStorage.setItem('token', response.data.accessToken);
          setLogin(true);
        }
      });
    } else {
      setErrorValidation(true);
    }
    return false;
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
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          {errorValidation || errorCredentials ? displayErrorMessage() : ''}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/admin/forgot-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/admin/register">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );

  return redirect ? <Redirect to="dashboard" /> : form();
};

const MapDispatchToProps = (dispatch: any) => bindActionCreators({
  setLogin: (isLogged: boolean) => setLoginAction(isLogged),
}, dispatch);

export default connect(null, MapDispatchToProps)(Login);
