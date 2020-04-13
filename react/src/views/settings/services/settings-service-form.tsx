import React, { FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { EventSeat } from '@material-ui/icons';
import { ServiceFormInterface } from '../../types/types';
import { useStyles } from './style';
import FormActionButtons from '../../../uiComponents/forms/FormActionButtons';
import { Redirect } from 'react-router-dom';
import AdminROUTES from '../../../route/admin/admin-routes';
import { GlobalStateInterface, ReduxState } from '../../../store/types';

interface SettingsServiceEditProps {
  service?: ServiceFormInterface,
  params?: object
}

const SettingsServiceForm = (props : SettingsServiceEditProps) => {
  const classes = useStyles();
  const { service } = props;
  const [name, setName] = useState<string>(service ? service.name : '');
  const [duration, setDuration] = useState<number>(service ? service.duration : 0);
  const [price, setPrice] = useState<string>(service ? service.price : '');
  const [redirect, setRedirect] = useState<boolean>(false);

  const validateForm = () => true;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const requestData: ServiceFormInterface = { name: name, duration: duration, price: price };
      // Add id in the request only if edit
      if (service) requestData.id = service.id;
      // addEditTeamMember(requestData);
      // setFirstName('');
      // setLastName('');
      // setActive(1);
      // setRedirect(true);
    }
  };

  const onCancel = () => setRedirect(true);

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Avatar className={classes.avatar}>
          <EventSeat />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit my service
        </Typography>
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Name"
              name="Name"
              label="Name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Duration"
              name="duration"
              label="Duration (min)"
              fullWidth
              autoComplete="lname"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.currentTarget.value, 10))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Price"
              name="price"
              label="Price ($)"
              fullWidth
              autoComplete="lprice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <FormActionButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};

const MapStateToProps = (state: ReduxState, ownProps: any) => ({
  service: state.services.list.find((service:any) => service.id === Number(ownProps.params.id)),
});

export default connect(MapStateToProps)(SettingsServiceForm);
