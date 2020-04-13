import React from 'react';
import { useStyles } from './style';
import { FormErrorMessageProps } from './type';

export const FormErrorMessage = React.memo(({ errors, show }: FormErrorMessageProps) => {
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
