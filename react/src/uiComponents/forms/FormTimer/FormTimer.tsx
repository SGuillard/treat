import { TextField } from '@material-ui/core';
import React from 'react';

export const FormTimer = React.memo(({ openHour, onChange, fieldName, day, id, isClosed }: any) => (
  <TextField
    id="time"
    type="time"
    name={fieldName}
    onChange={onChange}
    defaultValue={openHour}
    disabled={isClosed}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      day: day,
      id: id,
      step: 300, // 5 min
    }}
  />
));
