import React, { useContext } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';
import AdminROUTES from '../../router/admin/admin-routes';
import RouterContext from '../../router/RouterContext';
import { useStyles } from './style';


const BottomMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const { page } = useContext(RouterContext);
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
