import React from 'react';
import Calendar from "../../containers/admin/calendar/calendar";
import Dashboard from "../../containers/admin/dashboard/dashboard";
import Settings from "../../containers/admin/settings/settings";
import {pageType} from "./admin-router";
import AdminROUTES from "./admin-routes";

const ContentPageRouter = ({page}: pageType) => {
    switch(page) {
        case AdminROUTES.CALENDAR.name:
            return <Calendar />;
        case AdminROUTES.DASHBOARD.name:
            return <Dashboard />;
        case AdminROUTES.SETTINGS.name:
            return <Settings />;
        default:
            return <Calendar/>;
    }
};

export default ContentPageRouter;