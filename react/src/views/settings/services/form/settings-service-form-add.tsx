import React from 'react';
import SettingsServiceForm from './settings-service-form';

export const SettingsServiceFormAdd = () => {
  const service = {
    price: '0',
    duration: 15,
    name: '',
  };

  return <SettingsServiceForm service={service} />;
};
