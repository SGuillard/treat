import React from 'react';
import { Select } from '@material-ui/core';

export const FormSelect = React.memo(({ value, fieldName, onChange, options, errorFields }: any) => {
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
      error={errorFields.includes(fieldName)}
      onOpen={onOpen}
      value={value}
      name={fieldName}
      onChange={onChange}
    >
      {options}
    </Select>
  );
});
