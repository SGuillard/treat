import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { EventSeat } from '@material-ui/icons';

interface SettingsServiceEditProps {
  service?: any,
  params?: object
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

const SettingsServiceForm = (props : SettingsServiceEditProps) => {
  const classes = useStyles();
  const { service } = props;

  const handleSubmit = () => null;

  return (
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
              value={service.name}
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
              value={service.duration}
              // onChange={(e) => setLastName(e.target.value)}
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
    </Container>
  );
};

const MapStateToProps = (state: any, ownProps: any) => ({
  service: state.services.list.find((service:any) => service.id === Number(ownProps.params.id)),
});

export default connect(MapStateToProps)(SettingsServiceForm);
