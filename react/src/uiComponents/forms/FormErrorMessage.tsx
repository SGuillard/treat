import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  error: {
    backgroundColor: 'rgb(253, 236, 234)',
    color: 'rgb(97, 26, 21)',
    padding: '12px 16px',
    width: '100%',
    borderRadius: '16px',
    textAlign: 'center',
    lineHeight: '1.43',
    margin: '5px 0px',
    fontSize: '16px',
  },
}));

export const FormErrorMessage = React.memo(({ errors, show }: {show: any, errors: any}) => {
  const classes = useStyles();
  return show ? (
    <div className={classes.error}>
      <ul>
        {errors.map((error: any) => (
          <li key={error.key}>
            {error.error}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
});
