import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Switch } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { bindActionCreators } from 'redux';
import { AdminUserInterface } from '../../types/types';
import { statusAdminUser } from '../../../../store/actions/adminUsersActions';
import SettingsAdminUserForm from './settings-admin-user-form';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface SettingsAdminUserListProps {
  adminUsers: any,
  changeStatusTeamMember: any
}

const SettingsAdminUserList = ({ adminUsers, changeStatusTeamMember } : SettingsAdminUserListProps) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<number[]>([1]);
  const [showFormAdd, setShowFormAdd] = useState<boolean>(false);

  const toggleForm = () => {
    setShowFormAdd(!showFormAdd);
  };

  const handleToggle = (adminUserId: number) => () => {
    const currentIndex = checked.indexOf(adminUserId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(adminUserId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    changeStatusTeamMember(adminUserId);
    setChecked(newChecked);
  };

  const displayTeamList = () => (
    <List dense className={classes.root}>
      { adminUsers ? adminUsers.map((member: AdminUserInterface) => {
        const labelId = `checkbox-list-secondary-label-${member.id}`;
        return (
          <ListItem key={member.id} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${member.id + 1}`}
                src={`/static/images/avatar/${member.id + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${member.first_name} ${member.last_name}`} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle(member.id)}
                checked={member.active}
                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      }) : null}
    </List>
  );

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardHeader
          action={
                        !showFormAdd ? <AddCircleOutlineIcon style={{ paddingTop: '15px' }} onClick={toggleForm} /> : ''
                    }
          title="My Team"
        />
        { showFormAdd ? <SettingsAdminUserForm toggleForm={toggleForm} /> : '' }
        { !showFormAdd ? displayTeamList() : '' }
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  adminUsers: state.adminUsers.list,
});

const MapDispatchToProps = (dispatch: any) => bindActionCreators({
  changeStatusTeamMember: (userId: any) => statusAdminUser({ adminUserId: userId }),
}, dispatch);

export default connect(mapStateToProps, MapDispatchToProps)(SettingsAdminUserList);
