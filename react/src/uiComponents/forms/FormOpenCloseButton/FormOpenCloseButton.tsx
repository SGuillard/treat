import { Input } from '@material-ui/core';
import React from 'react';
import { FormOpenCloseButtonProps } from './type';

export const FormOpenCloseButton = React.memo(({ row, onClick }: FormOpenCloseButtonProps) => {
  const inputCustomProps = {
    is_close: row.isClose ? 1 : 0,
    day: row.day,
    rowid: row.id,
  };

  return (
    <Input
      inputProps={inputCustomProps}
      name="is_close"
      type="button"
      onClick={onClick}
      value={row.isClose ? 'Close' : 'Open'}
      style={{ color: row.isClose ? 'red' : 'green' }}
    >
      {row.isClose ? 'Close' : 'Open'}
    </Input>
  );
});
