import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import React from 'react';
import { useStyles } from './style';

export const FormDeleteButton = ({ onClick, show } : any) => {
  const classes = useStyles();

  return show ? (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<DeleteIcon />}
      onClick={onClick}
    >
      Delete Appointment
    </Button>
  ) : null;
};
