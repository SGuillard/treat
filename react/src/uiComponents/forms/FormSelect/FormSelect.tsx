import React from 'react';
import { Select } from '@material-ui/core';

export const FormSelect = React.memo(({ value, name, onChange, options }: any) => {
  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <Select
      labelId="demo-controlled-open-select-label"
      id="demo-controlled-open-select"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      value={value}
      name={name}
      onChange={onChange}
    >
      {options}
    </Select>
  );
});
