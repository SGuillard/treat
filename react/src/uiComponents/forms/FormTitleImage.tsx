import React, { ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useStyles } from './style';

export const FormTitleImage = React.memo(({ children }: {children: ReactElement}) => {
  const classes = useStyles();
  return (
    <Avatar className={classes.avatar}>
      {children}
    </Avatar>
  );
});
