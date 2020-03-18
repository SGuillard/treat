import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BottomMenu from './bottom-menu';
import ContentPageRouter from '../../../route/admin/content-page-router';
import { initAdminUsers } from '../../../store/actions/adminUsersActions';
import { initServiceList } from '../../../store/actions/ServicesActions';
import AdminROUTES from '../../../route/admin/admin-routes';
import axios from 'axios';
import API from '../../../API';

interface mainProps {
  page: string,
  onInitAdminUsers: any,
  onInitService: any,
  adminUsers: any,
  isLogged: boolean,
  params?: object
}

const Main = ({ page, onInitAdminUsers, onInitService, adminUsers, isLogged = false, params }: mainProps) => {
  useEffect(() => {
    onInitAdminUsers();
    onInitService();
  }, [onInitAdminUsers, onInitService]);

  if (!isLogged) {
    return <Redirect push to={AdminROUTES.LOGIN.path} />;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
