import React, { useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useStyles } from './style';
import { useFormActionHandler } from '../../../utils/forms/hooks/useFormActionHandler';
import { formReducer } from '../../../utils/forms/formReducer';
import { useChangeHandler } from '../../../utils/forms/hooks/useChangeHandler';
import { FormTextField } from '../../../uiComponents/forms/FormTextField/FormTextField';
import { FormErrorMessage } from '../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { initialArg } from './constants';

const Register = () => {
  const classes = useStyles();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, initialArg);

  const { email, password, firstName, lastName, phone, salon } = componentState;

  const { handleRegistration, errors, fieldErrors, redirect } = useFormActionHandler(componentState);

  const { onChangeString } = useChangeHandler(dispatchComponentReducer);

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
        <form className={classes.form} noValidate onSubmit={handleRegistration}>
          <Grid container spacing={2}>
            <FormErrorMessage show={errors.length > 0} errors={errors} />
            <Grid item xs={12} sm={6}>
              <FormTextField
                onChange={onChangeString}
                errorFields={fieldErrors}
                value={firstName}
                fieldName="firstName"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                onChange={onChangeString}
                errorFields={fieldErrors}
                value={lastName}
                fieldName="lastName"
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                onChange={onChangeString}
                errorFields={fieldErrors}
                value={phone}
                fieldName="phone"
                label="Phone"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                onChange={onChangeString}
                errorFields={fieldErrors}
                value={salon}
                fieldName="salon"
                label="Name of my business"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                onChange={onChangeString}
                errorFields={fieldErrors}
                value={email}
                fieldName="email"
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                onChange={onChangeString}
                errorFields={fieldErrors}
                value={password}
                fieldName="password"
                label="Password"
              />
            </Grid>
          </Grid>
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

export default Register;
