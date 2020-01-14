import React from 'react';
import {pageType} from "./admin-route";
import PageList from "./enum";
import Calendar from "./calendar/calendar";
import Dashboard from "./dashboard/dashboard";
import Settings from "./settings/settings";

const ContentPageRouter = ({page}: pageType) => {
    switch(page) {
        case PageList.CALENDAR:
            return <Calendar />;
        case PageList.DASHBOARD:
            return <Dashboard />;
        case PageList.SETTINGS:
            return <Settings />;
        default:
            return <Calendar/>;
    }
};

export default ContentPageRouter;