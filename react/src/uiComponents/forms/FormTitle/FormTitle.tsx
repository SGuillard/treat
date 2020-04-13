import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormTitleProps } from './type';

export const FormTitle = React.memo(({ title }: FormTitleProps) => (
  <Typography component="h1" variant="h5">
    {title}
  </Typography>
));
