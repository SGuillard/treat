import React from 'react';
import Main from '../../views/main/main';
import RouterContext from '../RouterContext';

export type pageType = { page: string, params?: object };

const AdminRouter = ({ page, params }: pageType) => (
  <RouterContext.Provider value={{ page, params: params ?? {} }}>
    <Main />
  </RouterContext.Provider>
);

export default AdminRouter;
