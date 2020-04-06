import React, {
  useReducer,
  useState,
} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Switch } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { AdminUserFormInterface, AdminUserInterface } from '../../types/types';
import { addEditAdminUser } from '../../../store/actions/adminUsersActions';
import AdminROUTES from '../../../route/admin/admin-routes';
import { useStyles } from './style';
import FormButtons from '../../../uiComponents/FormButtons';

interface SettingsAdminUserFormAddProps {
  addEditTeamMember: (User: AdminUserInterface) => (payload: any) => void;
  history: any
  params?: object;
  adminUser?: AdminUserFormInterface;
}

interface reducerPayloadType {
  name: string,
  value: any
}

const initialArg = {
  firstName: '',
  lastName: '',
  active: '',
};

const validateForm = (store: AdminUserFormInterface) => true;

const reducer = (state: any, { name, value }: reducerPayloadType) => ({
  ...state,
  [name]: value,
});

const SettingsAdminUserForm = (props: SettingsAdminUserFormAddProps) => {
  const classes = useStyles();
  const { adminUser, addEditTeamMember } = props;

  const [store, dispatch] = useReducer(reducer, adminUser ?? initialArg);

  const { firstName, lastName, active } = store;

  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm(store)) {
      if (adminUser) dispatch({ name: 'id', value: adminUser.id });
      addEditTeamMember(store);
      setRedirect(true);
    }
  };

  const onCancel = () => setRedirect(true);

  const onChangeActionString = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(e.target);

  const onChangeActionToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value !== 'true';
    dispatch({ name: e.target.name, value: newVal });
  };

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {`${adminUser ? 'Edit' : 'Add'} Team Member`}
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
              onChange={onChangeActionString}
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
              onChange={onChangeActionString}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            This member can take appointment
            <Switch
              edge="end"
              onChange={onChangeActionToggle}
              checked={active}
              name="active"
              value={active}
              inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
            />
          </Grid>
          <FormButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};

const MapStateToProps = (state: any, ownProps: any) => ({
  adminUser: state.adminUsers.list.find((adminUser: any) => adminUser.id === Number(ownProps.params.id)),
});

const MapDispatchToProps = (dispatch: any) => bindActionCreators({
  addEditTeamMember: (user: AdminUserInterface) => addEditAdminUser(user),
}, dispatch);

export default connect(MapStateToProps, MapDispatchToProps)(SettingsAdminUserForm);
