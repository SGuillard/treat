import { useDispatch } from 'react-redux';
import React, { FormEvent, useCallback, useState } from 'react';
import {
  submitRequest,
} from '../../api/apiRequest';
import API from '../../../API';
import { setServiceAction } from '../../../store/actions/ServicesActions';
import { AdminUserInterface, ServiceInterface } from '../../../views/types/types';
import { setAdminUsersAction } from '../../../store/actions/adminUsersActions';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../api/type';
import { loginApi } from '../../../views/login/login-helper';
import { setLoginAction } from '../../../store/actions/globalActions';

export const useFormActionHandler = (componentState: any, entity?: any) => {
  const dispatchReduxReducer = useDispatch();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleSubmitServiceForm = (event: FormEvent) => {
    event.preventDefault();
    submitRequest(event, API.SERVICES, componentState, entity).then((response: object[]) => {
      dispatchReduxReducer(setServiceAction(response as ServiceInterface[]));
      setRedirect(true);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const handleSubmitAdminUserForm = (event: React.FormEvent) => {
    event.preventDefault();
    submitRequest(event, API.ADMIN_USER, componentState, entity).then((response: object[]) => {
      dispatchReduxReducer(setAdminUsersAction(response as AdminUserInterface[]));
      setRedirect(true);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const handleRegistration = (event: React.FormEvent) => {
    event.preventDefault();
    submitRequest(event, API.REGISTRATION, componentState, entity).then((response: object[]) => {
      dispatchReduxReducer(setAdminUsersAction(response as AdminUserInterface[]));
      loginApi(componentState.email, componentState.password).then((responseToken: any) => {
        localStorage.setItem('token', responseToken.data.accessToken);
        dispatchReduxReducer(setLoginAction(true));
        setRedirect(true);
      })
        .catch((e) => console.log(e));
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };


  const onCancel = useCallback(() => setRedirect(true), []);

  return { handleSubmitServiceForm, handleSubmitAdminUserForm, handleRegistration, onCancel, redirect, errors, fieldErrors };
};
