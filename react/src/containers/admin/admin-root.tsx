import React from 'react';
import ContentPage from "./content-page";
import BottomMenu from "./bottom-menu";

export type pageType = { page: string };

const AdminRoot = ({page}: pageType) => {

    return (
        <div>
            <ContentPage/>
            <BottomMenu page={page}/>
        </div>
    )
};

export default AdminRoot;
