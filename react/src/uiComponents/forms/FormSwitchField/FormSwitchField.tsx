import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Switch } from '@material-ui/core';
import { FormSwitchFieldProps } from './type';

export const FormSwitchField = React.memo(({ value, onChange }: FormSwitchFieldProps) => (
  <Grid item xs={12} sm={12}>
    This member can take appointment
    <Switch
      edge="end"
      onChange={onChange}
      checked={value}
      name="active"
      value={value}
      inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
    />
  </Grid>
));
