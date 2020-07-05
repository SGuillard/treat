import { useState } from 'react';

export const useListRedirection = (routeEdit: string, routeAdd: string) => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>(routeAdd);


  const editElement = (id: number) => {
    setRedirect(true);
    setRedirectUrl(`${routeEdit}/${id}`);
  };

  const addElement = () => {
    setRedirect(true);
    setRedirectUrl(routeAdd);
  };

  return { redirect, redirectUrl, editElement, addElement };
};
