import { useDispatch } from 'react-redux';
import React, { FormEvent, useCallback, useState } from 'react';
import moment from 'moment';
import {
  submitRequest,
} from '../../api/apiRequest';
import API from '../../../API';
import {
  AdminUserInterface,
  AppointmentInterface, PromotionInterface,
  ServiceInterface,
} from '../../../views/types/types';
import { setAdminUsersAction } from '../../../store/actions/adminUsersActions';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../api/type';
import { loginApi } from '../../../views/login/login-helper';
import { setLoginAction } from '../../../store/actions/globalActions';
import { setAppointmentAction } from '../../../store/actions/appointmentAction';
import { setPromotionAction } from '../../../store/actions/promotionAction';
import { setServiceAction } from '../../../store/actions/servicesActions';

export const useFormActionHandler = (componentState: any, entity?: any) => {
  const dispatchReduxReducer = useDispatch();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleSubmitServiceForm = (event: FormEvent) => {
    event.preventDefault();
    submitRequest(API.SERVICES, { ...componentState }, entity).then((response: object[]) => {
      dispatchReduxReducer(setServiceAction(response as ServiceInterface[]));
      setRedirect(true);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const handleSubmitAdminUserForm = (event: React.FormEvent) => {
    event.preventDefault();
    submitRequest(API.ADMIN_USER, { ...componentState }, entity).then((response: object[]) => {
      dispatchReduxReducer(setAdminUsersAction(response as AdminUserInterface[]));
      setRedirect(true);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const handleSubmitPromotionForm = (event: React.FormEvent) => {
    event.preventDefault();
    submitRequest(API.PROMOTIONS, { ...componentState }).then((response: object[]) => {
      dispatchReduxReducer(setPromotionAction(response as PromotionInterface[]));
      setRedirect(true);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const handleRegistration = (event: React.FormEvent) => {
    event.preventDefault();
    submitRequest(API.REGISTRATION, { ...componentState }, entity).then((response: object[]) => {
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

  const handleSubmitAddAppointmentForm = (e: any) => {
    e.preventDefault();
    // TODO - handle duration in the form
    // TODO - Do a generic function for this format date helper
    const updateComponentState = () => {
      const dateFormated = moment(componentState.date).format('YYYY-MM-DD HH:mm:ss');
      return { ...componentState, date: dateFormated, duration: 15 };
    };

    submitRequest(API.APPOINTMENTS, updateComponentState(), entity).then((response: any) => {
      dispatchReduxReducer(setAppointmentAction(response as AppointmentInterface[]));
      setRedirect(true);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const handleSubmitProfileForm = (e: any) => {
    e.preventDefault();
    submitRequest(API.SALONS, { ...componentState }, entity).then((response: any) => {
      console.log(response);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const onCancel = useCallback(() => setRedirect(true), []);

  return { onCancel, redirect, errors, fieldErrors, handleSubmitAddAppointmentForm, handleSubmitProfileForm, handleSubmitPromotionForm, handleSubmitServiceForm, handleSubmitAdminUserForm, handleRegistration };
};
