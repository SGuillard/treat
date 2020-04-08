import React from 'react';
import { Alert } from 'react-bootstrap';

export const FormErrorMessage = React.memo(({ message }: {message: any}) => (
  <Alert variant="danger">
    {message}
  </Alert>
));
