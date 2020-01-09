import React from 'react';
import BottomMenu from "./bottom-menu";
import ContentPageRouter from "./content-page-router";

export type pageType = { page: string };

const AdminRoot = ({page}: pageType) => {

    return (
        <div>
            <ContentPageRouter page={page}/>
            <BottomMenu page={page}/>
        </div>
    )
};

export default AdminRoot;
