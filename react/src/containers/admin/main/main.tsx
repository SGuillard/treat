import React, { useEffect } from 'react';
import BottomMenu from './bottom-menu';
import { pageType } from '../../../route/admin/admin-router';
import ContentPageRouter from '../../../route/admin/content-page-router';
import { connect } from 'react-redux';
import { initAdminUsers } from '../../../store/actions/adminUsersActions';

interface mainProps {
  page: string,
  onInitIngredients: any,
  adminUsers: any,
}

const Main = ({ page, onInitIngredients, adminUsers }: mainProps) => {
  useEffect(() => onInitIngredients(), []);
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
    onInitIngredients: () => dispatch(initAdminUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
