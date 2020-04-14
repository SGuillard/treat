import { useState } from 'react';

export const useListRedirection = (route: string) => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>(route);


  const editElement = (id: number) => {
    setRedirect(true);
    setRedirectUrl(`${route}/${id}`);
  };

  const redirectToAdd = () => {
    setRedirect(true);
  };

  return { redirect, redirectUrl, editElement, redirectToAdd };
};
