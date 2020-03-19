import React, { FormEvent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Switch } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { AdminUserFormInterface } from '../../types/types';
import { addEditAdminUser } from '../../../store/actions/adminUsersActions';
import AdminROUTES from '../../../route/admin/admin-routes';

interface SettingsAdminUserFormAddProps {
  addEditTeamMember: (User: AdminUserFormInterface) => (payload: any) => void;
  history: any
  params?: object;
  adminUser?: AdminUserFormInterface;
}

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

const SettingsAdminUserForm = (props: SettingsAdminUserFormAddProps) => {
  const classes = useStyles();
  const { adminUser, addEditTeamMember } = props;
  const [firstName, setFirstName] = useState<string>(adminUser ? adminUser.firstName : '');
  const [lastName, setLastName] = useState<string>(adminUser ? adminUser.lastName : '');
  const [active, setActive] = useState<number>(adminUser ? adminUser.active : 1);
  const [redirect, setRedirect] = useState<boolean>(false);

  const validateForm = () => firstName.length > 0 && lastName.length > 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const requestData: AdminUserFormInterface = { firstName: firstName, lastName: lastName, active: active };
      // Add id in the request only if edit
      if (adminUser) requestData.id = adminUser.id;
      addEditTeamMember(requestData);
      setFirstName('');
      setLastName('');
      setActive(1);
      setRedirect(true);
    }
  };

  const toggleActive = () => {
    setActive(+!active);
  };

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          { `${adminUser ? 'Edit' : 'Add'} Team Member`}
        </Typography>
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            This member can take appointment
            <Switch
              edge="end"
              onChange={() => toggleActive()}
              checked={!!active}
              inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit">
              Validate
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={() => setRedirect(true)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};

const MapStateToProps = (state: any, ownProps: any) => ({
  adminUser: state.adminUsers.list.find((adminUser:any) => adminUser.id === Number(ownProps.params.id)),
});

const MapDispatchToProps = (dispatch: any) => bindActionCreators({
  addEditTeamMember: (user: AdminUserFormInterface) => addEditAdminUser(user),
}, dispatch);

export default connect(MapStateToProps, MapDispatchToProps)(SettingsAdminUserForm);
