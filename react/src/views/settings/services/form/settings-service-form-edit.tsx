import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store/types';
import { FormLoaderProps, ServiceInterface } from '../../../types/types';
import SettingsServiceForm from './settings-service-form';

const SettingsServiceFormEdit = ({ params }: FormLoaderProps) => {
  const service = useSelector((state: ReduxState) => state.services.list.find((serviceState: ServiceInterface) => serviceState.id === Number(
    params && params.id,
  )));

  return service ? <SettingsServiceForm service={service} /> : <div>...loading</div>;
};

export default SettingsServiceFormEdit;
