import { Dispatch } from 'react';

const formLoader = (formEntity: object | undefined, dispatch: Dispatch<{name: string, value: string}>) => {
  if (formEntity) {
    Object.entries(formEntity).forEach(([key, value]) => {
      dispatch({ name: key, value: value });
    });
  }
};

export default formLoader;
