import { useDispatch } from 'react-redux';
import { FormEvent, useCallback, useState } from 'react';
import moment from 'moment';
import {
  submitRequest,
} from '../../api/apiRequest';
import API from '../../../API';
import {
  AppointmentInterface,
} from '../../../views/types/types';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../api/type';
import { setAppointmentAction } from '../../../store/actions/appointmentAction';


// The difference between this hook and the others is the presence of the closeModal function instead
// of redirect
export const usePopupFormActionHandler = (componentState: any, closeModal: Function, entity?: any) => {
  const dispatchReduxReducer = useDispatch();
  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleSubmitAddAppointmentForm = (event: FormEvent) => {
    event.preventDefault();
    // TODO - handle duration in the form
    // TODO - Do a generic function for this format date helper
    const updateComponentState = () => {
      const dateFormated = moment(componentState.date).format('YYYY-MM-DD HH:mm:ss');
      return { ...componentState, date: dateFormated, duration: 15 };
    };

    submitRequest(API.APPOINTMENTS, updateComponentState(), entity).then((response: any) => {
      dispatchReduxReducer(setAppointmentAction(response as AppointmentInterface[]));
      closeModal();
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const onCancel = useCallback(() => closeModal(), [closeModal]);

  return { onCancel, errors, fieldErrors, handleSubmitAddAppointmentForm };
};
