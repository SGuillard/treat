import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BottomMenu from '../menu/bottom-menu';
import ContentPageRouter from '../../router/admin/content-page-router';
import { initAdminUsers } from '../../store/actions/adminUsersActions';
import { initServiceList } from '../../store/actions/ServicesActions';
import AdminROUTES from '../../router/admin/admin-routes';
import { ReduxState } from '../../store/types';

const Main = () => {
  const dispatch = useDispatch();
  const adminUsers = useSelector((state: ReduxState) => state.adminUsers);
  const isLogged = useSelector((state: ReduxState) => state.global.isLogged);

  useEffect(() => {
    if (isLogged) {
      dispatch(initAdminUsers());
      dispatch(initServiceList());
    }
  }, [dispatch, isLogged]);

  if (!isLogged) return <Redirect push to={AdminROUTES.LOGIN.path} />;

  return adminUsers ? (
    <div>
      <ContentPageRouter />
      <BottomMenu />
    </div>
  ) : (<p>Loading...</p>);
};

export default Main;
