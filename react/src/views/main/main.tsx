import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BottomMenu from './bottom-menu';
import ContentPageRouter from '../../route/admin/content-page-router';
import { initAdminUsers, setLoginAction } from '../../store/actions/adminUsersActions';
import { initServiceList } from '../../store/actions/ServicesActions';
import AdminROUTES from '../../route/admin/admin-routes';

interface mainProps {
  page: string,
  onInitAdminUsers: any,
  onInitService: any,
  adminUsers: any,
  isLogged: boolean,
  setLogin: Function,
  params?: object
}

const Main = ({ page, onInitAdminUsers, onInitService, adminUsers, setLogin, isLogged = false, params }: mainProps) => {
  useEffect(() => {
    onInitAdminUsers();
    onInitService();
  }, [onInitAdminUsers, onInitService]);

  if (!isLogged) {
    if (localStorage.getItem('token')) {
      setLogin(true);
    } else {
      return <Redirect push to={AdminROUTES.LOGIN.path} />;
    }
  }

  return adminUsers ? (
    <div>
      <ContentPageRouter page={page} params={params} />
      <BottomMenu page={page} />
    </div>
  ) : (<p>Loading...</p>);
};

const mapStateToProps = (state: any) => ({
  adminUsers: state.adminUsers,
  isLogged: state.adminUsers && state.adminUsers.isLogged,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInitAdminUsers: () => dispatch(initAdminUsers()),
  onInitService: () => dispatch(initServiceList()),
  setLogin: (isLogged: boolean) => setLoginAction(isLogged),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
