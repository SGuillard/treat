import React from 'react';
import BottomMenu from './bottom-menu';
import { pageType } from '../../../route/admin/admin-router';
import ContentPageRouter from '../../../route/admin/content-page-router';

const Main = ({ page }: pageType) => (
  <div>
    <ContentPageRouter page={page} />
    <BottomMenu page={page} />
  </div>
);

export default Main;
