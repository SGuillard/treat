import React, {useEffect} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Icon, makeStyles} from "@material-ui/core";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import {pageType} from "./admin-root";
import {adminRoutes, PageList} from "./enum";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        position: 'fixed',
        bottom: 0,
        width: '100%'
    },
});

const BottomMenu = ({page}: pageType) => {
    const classes = useStyles();
    let history = useHistory()
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        switch(page) {
            case PageList.DASHBOARD:
                return setValue(1);
            case PageList.SETTINGS:
                return setValue(2);
        }
    });

    const getPage = (value: number): string => {
        switch(value) {
            case 0:
                return adminRoutes.CALENDAR;
            case 1:
                return adminRoutes.DASHBOARD;
            case 2:
                return adminRoutes.SETTINGS;
        }
        return adminRoutes.CALENDAR;
    };

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                history.push(getPage(newValue))
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