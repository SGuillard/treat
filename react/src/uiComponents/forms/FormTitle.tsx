import React from 'react';
import Typography from '@material-ui/core/Typography';

export const FormTitle = React.memo(({ title }: {title: any}) => (
  <Typography component="h1" variant="h5">
    {title}
  </Typography>
));
