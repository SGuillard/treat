import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../views/login/api-login';
import AdminROUTES from './admin-routes';
import Main from '../../views/main/main';
import RouterContext from '../RouterContext';

export type pageType = { page: string, params?: object };

const AdminRouter = ({ page, params }: pageType) => {
  const router = () => (
    <RouterContext.Provider value={{ page, params: params ?? {} }}>
      <Main />
    </RouterContext.Provider>
  );

  return isAuthenticated() ? router() : <Redirect to={AdminROUTES.LOGIN.path} />;
};

export default AdminRouter;
