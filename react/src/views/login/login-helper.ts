import AdminROUTES from '../../route/admin/admin-routes';

const getStorageToken = () => localStorage.getItem('token');

export const getToken = () => {
  if (getStorageToken()) {
    return getStorageToken();
  }
  window.location.href = (`${AdminROUTES.BASE}${AdminROUTES.LOGIN}`);
  return false;
};

export const redirectToLoginPage = () => {
  document.location.href = (`${AdminROUTES.BASE}${AdminROUTES.LOGIN.path}`);
  return false;
};
