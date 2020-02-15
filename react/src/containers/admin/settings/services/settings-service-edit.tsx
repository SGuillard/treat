import React from 'react';
import { useParams } from 'react-router-dom';

const SettingsServiceEdit = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      Testst
    </div>
  );
};

export default SettingsServiceEdit;
