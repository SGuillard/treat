import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';

interface FormActionButtonProps {
  onCancel: () => void;
}

const FormActionButtons = React.memo((props: FormActionButtonProps) => {
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
});

export default FormActionButtons;
