import React from 'react';
import { useSelector } from 'react-redux';
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
import AdminROUTES from '../../../router/admin/admin-routes';
import { ServiceInterface } from '../../types/types';
import { ReduxState } from '../../../store/types';
import { useStyleList } from './style';
import { useListRedirection } from '../../../utils/common/hooks/useListRedirection';

const SettingsServiceList = () => {
  const classes = useStyleList();

  const serviceList: ServiceInterface[] = useSelector((state: ReduxState) => state.services.list);

  const { redirect, redirectUrl, editElement, redirectToAdd } = useListRedirection(AdminROUTES.SETTINGS.SERVICE_EDIT.path);

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
            <AddCircleOutlineIcon style={{ paddingTop: '15px' }} onClick={redirectToAdd} />
          }
          title="My Services"
        />
        { displayTeamList() }
      </Card>
    </Container>
  );

  return redirect ? <Redirect push to={redirectUrl} /> : getView();
};

export default SettingsServiceList;
