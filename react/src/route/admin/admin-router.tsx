import React from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../containers/admin/login/api-login';
import AdminROUTES from './admin-routes';
import Main from '../../containers/admin/main/main';

export type pageType = { page: string };

const AdminRouter = ({ page }: pageType) => {
  const router = () => (
    <div>
      <Main page={page} />
    </div>
  );

  return isAuthenticated() ? router() : <Redirect to={AdminROUTES.LOGIN.path} />;
};

export default AdminRouter;
