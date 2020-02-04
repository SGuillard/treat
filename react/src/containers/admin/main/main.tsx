import React, { useEffect } from 'react';
import BottomMenu from './bottom-menu';
import ContentPageRouter from '../../../route/admin/content-page-router';
import { connect } from 'react-redux';
import { initAdminUsers } from '../../../store/actions/adminUsersActions';

interface mainProps {
  page: string,
  onInitAdminUsers: any,
  adminUsers: any,
}

const Main = ({ page, onInitAdminUsers, adminUsers }: mainProps) => {
  useEffect(() => onInitAdminUsers(), [onInitAdminUsers]);
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitAdminUsers: () => dispatch(initAdminUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
