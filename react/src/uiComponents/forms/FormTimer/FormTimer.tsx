import { TextField } from '@material-ui/core';
import React from 'react';

export const FormTimer = React.memo(({ openHour, onChange, fieldName, rowId, isClosed, day }: any) => (
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
      rowid: rowId,
      step: 300, // 5 min
    }}
  />
));
