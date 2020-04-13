import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BottomMenu from './bottom-menu';
import ContentPageRouter from '../../route/admin/content-page-router';
import { initAdminUsers } from '../../store/actions/adminUsersActions';
import { initServiceList } from '../../store/actions/ServicesActions';
import AdminROUTES from '../../route/admin/admin-routes';
import { ReduxState } from '../../store/types';

interface mainProps {
  onInitAdminUsers: any,
  onInitService: any,
  adminUsers: any,
  isLogged: boolean
}

const Main = ({ onInitAdminUsers, onInitService, adminUsers, isLogged = true }: mainProps) => {
  useEffect(() => {
    onInitAdminUsers();
    onInitService();
  }, [onInitAdminUsers, onInitService]);

  if (!isLogged) return <Redirect push to={AdminROUTES.LOGIN.path} />;

  return adminUsers ? (
    <div>
      <ContentPageRouter />
      <BottomMenu />
    </div>
  ) : (<p>Loading...</p>);
};

const mapStateToProps = (state: ReduxState) => ({
  adminUsers: state.adminUsers,
  isLogged: state.global.isLogged,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInitAdminUsers: () => dispatch(initAdminUsers()),
  onInitService: () => dispatch(initServiceList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
