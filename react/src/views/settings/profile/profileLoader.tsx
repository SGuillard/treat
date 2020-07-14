import React, { useEffect, useState } from 'react';
import { getRequest } from '../../../utils/api/apiRequest';
import API from '../../../API';
import { Profile } from './profile';

const ProfileLoader = () => {
  const [salon, setSalon] = useState({} as any);

  useEffect(() => {
    getRequest(API.USER_SALON).then((response) => {
      console.log(response);
      setSalon(response);
    });
  }, []);

  return Object.keys(salon).length ? <Profile salon={salon} /> : <div>...loading</div>;
};

export default ProfileLoader;
