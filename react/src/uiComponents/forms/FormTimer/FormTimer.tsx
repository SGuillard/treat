import { TextField } from '@material-ui/core';
import React from 'react';

export const FormTimer = React.memo(({ openHour, onChange, fieldName, day }: any) => (
  <TextField
    id="time"
    type="time"
    name={fieldName}
    onChange={onChange}
    defaultValue={openHour}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      day: day,
      step: 300, // 5 min
    }}
  />
));
