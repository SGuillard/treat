import React, { ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useStyles } from './style';
import { FormTitleImageProps } from './type';

export const FormTitleImage = React.memo(({ children }: FormTitleImageProps) => {
  const classes = useStyles();
  return (
    <Avatar className={classes.avatar}>
      {children}
    </Avatar>
  );
});
