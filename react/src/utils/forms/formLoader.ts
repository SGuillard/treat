import { Dispatch } from 'react';

const formLoader = (formEntity: object | undefined, dispatch: Dispatch<{name: string, value: string}>) => {
  if (formEntity) {
    Object.entries(formEntity).map(([key, value]) => {
      dispatch({ name: key, value: value });
      return null;
    });
  }
};

export default formLoader;
