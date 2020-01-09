import React from 'react';
import {pageType} from "./admin-root";
import PageList from "./enum";
import Calendar from "./calendar";
import Dashboard from "./dashboard";


const getPageComponent = (page: string) => {
    switch(page) {
        case PageList.CALENDAR:
            return <Calendar />;
        case PageList.DASHBOARD:
            return <Dashboard />;
        default:
            return <Calendar/>;
    }
}

const ContentPageRouter = ({page}: pageType) => {
    return getPageComponent(page);
};

export default ContentPageRouter;