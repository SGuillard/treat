import React, { FormEvent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAdminUser } from '../../../../store/actions/adminUsersActions';

interface SettingsAdminUserFormAddProps {
  addTeamMember: (User: any) => (payload: any) => void;
  params?: object;
  adminUser?: any;
}

const SettingsAdminUserForm = (props: SettingsAdminUserFormAddProps) => {
  const { adminUser } = props;
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const validateForm = () => firstName.length > 0 && lastName.length > 0;

  // const handleToggle = (adminUserId: number) => () => {
  //   const currentIndex = checked.indexOf(adminUserId);
  //   const newChecked = [...checked];
  //
  //   if (currentIndex === -1) {
  //     newChecked.push(adminUserId);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //
  //   changeStatusTeamMember(adminUserId);
  //   setChecked(newChecked);
  // };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      // addTeamMember({ id: 0, firstName: firstName, lastName: lastName, active: true });
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} style={{ padding: '15px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={adminUser.firstName}
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
        <Grid item xs={6}>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const MapStateToProps = (state: any, ownProps: any) => {
 console.log(ownProps);
  return {
    adminUser: state.adminUsers.list.find((adminUser:any) => adminUser.id === Number(ownProps.params.id))
  }
};

const MapDispatchToProps = (dispatch: any) => bindActionCreators({
  addTeamMember: (user: any) => addAdminUser(user),
}, dispatch);

export default connect(MapStateToProps, MapDispatchToProps)(SettingsAdminUserForm);
