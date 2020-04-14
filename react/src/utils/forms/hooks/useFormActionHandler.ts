import { useDispatch } from 'react-redux';
import React, { FormEvent, useCallback, useState } from 'react';
import {
  ErrorHandlerResponseInterface,
  ErrorObjectInterface,
  submitRequest
} from '../../api/apiRequest';
import API from '../../../API';
import { setServiceAction } from '../../../store/actions/ServicesActions';
import { AdminUserInterface, ServiceInterface } from '../../../views/types/types';
import { setAdminUsersAction } from '../../../store/actions/adminUsersActions';

export const useFormActionHandler = (componentState: any, entity: any) => {
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

  const onCancel = useCallback(() => setRedirect(true), []);

  return { handleSubmitServiceForm, handleSubmitAdminUserForm, onCancel, redirect, errors, fieldErrors };
};
