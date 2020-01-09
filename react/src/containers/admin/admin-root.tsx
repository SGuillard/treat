import React from 'react';
import ContentPage from "./content-page";
import BottomMenu from "./bottom-menu";

type pageProps = {page: string};

const AdminRoot = ({page}: pageProps) => {
    return (
        <div>
            <ContentPage/>
            <BottomMenu/>
        </div>)
};

export default AdminRoot;
