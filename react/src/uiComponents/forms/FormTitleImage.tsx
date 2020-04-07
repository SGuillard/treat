import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const FormTitleImage = React.memo(({ className }: {className: string}) => (
  <Avatar className={className}>
    <AccountCircleIcon />
  </Avatar>
));
