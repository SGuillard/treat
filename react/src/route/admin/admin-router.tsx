import React from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../containers/admin/login/api-login';
import AdminROUTES from './admin-routes';
import Main from '../../containers/admin/main/main';

export type pageType = { page: string, params?: {} };

const AdminRouter = ({ page, params }: pageType) => {
  const router = () => (
    <div>
      <Main page={page} params={params} />
    </div>
  );

  return isAuthenticated() ? router() : <Redirect to={AdminROUTES.LOGIN.path} />;
};

export default AdminRouter;
