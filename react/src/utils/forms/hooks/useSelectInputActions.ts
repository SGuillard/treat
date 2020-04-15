import React from 'react';

export const useSelectInputActions = () => {
  const [openSelectInput, setOpen] = React.useState(false);

  const handleCloseSelectInput = () => {
    setOpen(false);
  };

  const handleOpenSelectInput = () => {
    setOpen(true);
  };

  return { openSelectInput, handleCloseSelectInput, handleOpenSelectInput };
};
