import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React from 'react';

interface FormButtonProps {
  onCancel: () => void;
}

export default (props: FormButtonProps) => {
  const { onCancel } = props;

  return (
    <Grid item container>
      <Grid item xs>
        <Button variant="contained" color="primary" type="submit">
          Validate
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant="contained" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};
