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
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { connect } from 'react-redux';
import { setLoginAction } from '../../store/actions/globalActions';
import { loginApi } from './login-helper';
import { useStyles } from './style';

interface LoginProps {
  setLogin: Function,
  isLogged: boolean
}

const Login = ({ setLogin, isLogged }: LoginProps) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorCredentials, setErrorCredentials] = useState(false);
  const [errorValidation, setErrorValidation] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validateForm = () => email.length > 0 && password.length > 0;

    if (validateForm()) {
      loginApi(email, password).then((response) => {
        if (!response) {
          setErrorCredentials(true);
        } else {
          localStorage.setItem('token', response.data.accessToken);
          setLogin(true);
        }
      })
        .catch((e) => console.log(e));
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

  return isLogged ? <Redirect to="dashboard" /> : form();
};

const MapStateToProps = (state: any) => ({
  isLogged: state.global.isLogged,
});

const MapDispatchToProps = (dispatch: any) => ({
  setLogin: () => dispatch(setLoginAction(true)),
});

export default connect(MapStateToProps, MapDispatchToProps)(Login);
