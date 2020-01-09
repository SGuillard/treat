import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Icon, makeStyles} from "@material-ui/core";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        position: 'fixed',
        bottom: 0,
        width: '100%'
    },
});

const BottomMenu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Calendar" icon={<CalendarTodayIcon />} />
            <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
            <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
    );
};

export default BottomMenu;