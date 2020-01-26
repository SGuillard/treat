import React from 'react';
import {MyStore} from "../../../types";
import {connect} from "react-redux";

const Dashboard = (props: any) => {
    console.log(props.count);
    return (
        <div>
            dashboard
        </div>
    );
};

const MapStateToProps = (store: MyStore) => {
    return {
        count: store.test,
    };
};

export default connect(MapStateToProps)(Dashboard);
