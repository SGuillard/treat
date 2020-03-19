import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';
import AdminROUTES from '../../../route/admin/admin-routes';
import { ServiceInterface } from '../../types/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface SettingsServiceListProps {
  serviceList: any,
}

const SettingsServiceList = ({ serviceList } : SettingsServiceListProps) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>(AdminROUTES.SETTINGS.SERVICE_EDIT.path);

  const editElement = (id: number) => {
    setRedirect(true);
    setRedirectUrl(`${AdminROUTES.SETTINGS.SERVICE_EDIT.path}/${id}`);
  };

  const displayTeamList = () => (
    <List dense className={classes.root}>
      { serviceList ? serviceList.map((service: ServiceInterface) => {
        const labelId = `checkbox-list-secondary-label-${service.id}`;
        return (
          <ListItem key={service.id} button onClick={() => editElement(service.id)}>
            <ListItemText id={labelId} primary={`${service.name} (${service.duration} min) ${service.price}$ `} />
            <ListItemSecondaryAction>
              <EditIcon />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })
        : <div>Start by adding a service</div>}
    </List>
  );

  const getView = () => (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardHeader
          action={
            <AddCircleOutlineIcon style={{ paddingTop: '15px' }} onClick={() => setRedirect(true)} />
          }
          title="My Services"
        />
        { displayTeamList() }
      </Card>
    </Container>
  );

  return redirect ? <Redirect push to={redirectUrl} /> : getView();
};

const mapStateToProps = (state: any) => ({
  serviceList: state.services.list,
});

export default connect(mapStateToProps)(SettingsServiceList);
