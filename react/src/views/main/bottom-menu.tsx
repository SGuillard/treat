import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';
import { pageType } from '../../route/admin/admin-router';
import AdminROUTES from '../../route/admin/admin-routes';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
});

const BottomMenu = ({ page }: pageType) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(page);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        history.push(newValue);
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Calendar" value={AdminROUTES.CALENDAR.path} icon={<CalendarTodayIcon />} />
      <BottomNavigationAction label="Dashboard" value={AdminROUTES.DASHBOARD.path} icon={<DashboardIcon />} />
      <BottomNavigationAction label="Settings" value={AdminROUTES.SETTINGS.path} icon={<SettingsIcon />} />
    </BottomNavigation>
  );
};

export default BottomMenu;
