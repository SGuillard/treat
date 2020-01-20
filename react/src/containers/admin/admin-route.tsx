import React from 'react';
import BottomMenu from "./bottom-menu";
import ContentPageRouter from "./content-page-router";
import { Redirect } from 'react-router-dom';
import {isAuthenticated} from "./login/api-login";

export type pageType = { page: string };

const AdminRoute = ({page}: pageType) => {

    const router = () => (
        <div>
            <ContentPageRouter page={page}/>
            <BottomMenu page={page}/>
        </div>
    );

    return isAuthenticated() ? router() : <Redirect to='/admin/login' />
};

export default AdminRoute;
