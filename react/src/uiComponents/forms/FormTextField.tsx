import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export const FormTextField = React.memo(({ onChange, value, fieldName, label }: any) => (
  <Grid item xs={12} sm={6}>
    <TextField
      required
      id={fieldName}
      name={fieldName}
      label={label}
      fullWidth
      value={value}
      onChange={onChange}
    />
  </Grid>
));
