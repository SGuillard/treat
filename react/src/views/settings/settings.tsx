import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Business from '@material-ui/icons/Business';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { AvTimer, CardGiftcard, EventSeat, HomeWork, People } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AdminROUTES from '../../router/admin/admin-routes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const [openBusiness, setOpenBusiness] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [routeToRedirect, setRouteToRedirect] = useState('');

  const handleClickBusiness = () => {
    setOpenBusiness(!openBusiness);
  };

  const redirection = (route: string): void => {
    setRouteToRedirect(route);
    setRedirect(true);
  };

  const list = () => (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={(
        <ListSubheader component="div" id="nested-list-subheader">
          Manage my Business
        </ListSubheader>
              )}
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
      <ListItem button onClick={handleClickBusiness}>
        <ListItemIcon>
          <Business />
        </ListItemIcon>
        <ListItemText primary="Business" />
        {openBusiness ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openBusiness} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={() => redirection(AdminROUTES.SETTINGS.ADMIN_USER_LIST.path)}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => redirection(AdminROUTES.SETTINGS.SERVICE_LIST.path)}>
              <ListItemIcon>
                <EventSeat />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => redirection(AdminROUTES.SETTINGS.PROFILE.path)}>
              <ListItemIcon>
                <HomeWork />
              </ListItemIcon>
              <ListItemText primary="Business profile" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => redirection(AdminROUTES.SETTINGS.OPENINGS.path)}>
              <ListItemIcon>
                <AvTimer />
              </ListItemIcon>
              <ListItemText primary="Business hours" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => redirection(AdminROUTES.SETTINGS.OPENINGS.path)}>
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => redirection(AdminROUTES.SETTINGS.PROMOTIONS_LIST.path)}>
              <ListItemIcon>
                <CardGiftcard />
              </ListItemIcon>
              <ListItemText primary="Promotions" />
            </ListItem>
          </List>
        </List>
      </Collapse>
    </List>
  );

  return redirect ? <Redirect push to={routeToRedirect} /> : list();
};

export default Settings;
