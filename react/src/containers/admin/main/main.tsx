import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BottomMenu from './bottom-menu';
import ContentPageRouter from '../../../route/admin/content-page-router';
import { initAdminUsers } from '../../../store/actions/adminUsersActions';
import { initServiceList } from '../../../store/actions/ServicesActions';

interface mainProps {
  page: string,
  onInitAdminUsers: any,
  onInitService: any,
  adminUsers: any,
}

const Main = ({ page, onInitAdminUsers, onInitService, adminUsers }: mainProps) => {
  useEffect(() => {
    onInitAdminUsers();
    onInitService();
  }, [onInitAdminUsers, onInitService]);
  return adminUsers ? (
    <div>
      <ContentPageRouter page={page} />
      <BottomMenu page={page} />
    </div>
  ) : (<p>Loading...</p>);
};

const mapStateToProps = (state: any) => ({
  adminUsers: state.adminUsers,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInitAdminUsers: () => dispatch(initAdminUsers()),
  onInitService: () => dispatch(initServiceList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
