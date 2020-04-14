import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';
import { AdminUserInterface } from '../../types/types';
import AdminROUTES from '../../../route/admin/admin-routes';
import { ReduxState } from '../../../store/types';
import { useStyleList } from './style';
import { useListRedirection } from '../../../utils/common/hooks/useListRedirection';

const SettingsAdminUserList = () => {
  const classes = useStyleList();

  const adminUsers: AdminUserInterface[] = useSelector((state: ReduxState) => state.adminUsers.list);

  const { redirect, redirectUrl, editElement, redirectToAdd } = useListRedirection(AdminROUTES.SETTINGS.ADMIN_USER_EDIT.path);

  const displayTeamList = () => (
    <List dense className={classes.root}>
      { adminUsers ? adminUsers.map((adminUser: AdminUserInterface) => {
        const labelId = `checkbox-list-secondary-label-${adminUser.id}`;
        return (
          <ListItem key={adminUser.id} button onClick={() => editElement(adminUser.id)}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${adminUser.id + 1}`}
                src={`/static/images/avatar/${adminUser.id + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${adminUser.firstName} ${adminUser.lastName}`} />
            <ListItemSecondaryAction>
              <EditIcon />
            </ListItemSecondaryAction>
          </ListItem>
        );
      }) : null}
    </List>
  );

  const getView = () => (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardHeader
          action={<AddCircleOutlineIcon style={{ paddingTop: '15px' }} onClick={redirectToAdd} />}
          title="My Team"
        />
        {displayTeamList()}
      </Card>
    </Container>
  );

  return redirect ? <Redirect push to={redirectUrl} /> : getView();
};

export default SettingsAdminUserList;
