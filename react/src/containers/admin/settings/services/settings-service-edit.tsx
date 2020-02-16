import React from 'react';
import { connect } from 'react-redux';

interface SettingsServiceEditProps {
  service?: any,
  params?: object
}

const SettingsServiceEdit = (props : SettingsServiceEditProps) => {
  const { service } = props;
  console.log(service);
  return (
    <div>
      Testst
    </div>
  );
};

const MapStateToProps = (state: any, ownProps: any) => {
  return {
    service: state.services.list.find((service:any) => service.id === Number(ownProps.params.id)),
  };
};

export default connect(MapStateToProps)(SettingsServiceEdit);
