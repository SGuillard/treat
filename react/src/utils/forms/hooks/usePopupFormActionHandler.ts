import { useDispatch } from 'react-redux';
import { FormEvent, useCallback, useState } from 'react';
import moment from 'moment';
import {
  deleteRequest,
  submitRequest,
} from '../../api/apiRequest';
import API from '../../../API';
import {
  AppointmentInterface,
} from '../../../views/types/types';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../api/type';
import { setAppointmentAction } from '../../../store/actions/appointmentAction';

export const usePopupFormActionHandler = (componentState: any, closeModal: Function, entity?: any) => {
  const dispatchReduxReducer = useDispatch();
  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleSuccessRequest = (response: AppointmentInterface[]) => {
    dispatchReduxReducer(setAppointmentAction(response));
    closeModal();
  };

  const handleErrorRequest = (errorObject: ErrorHandlerResponseInterface) => {
    const { errorMessages, errorFields } = errorObject;
    setFieldErrors(errorFields);
    setErrors(errorMessages);
  };

  const handleSubmitAppointmentForm = (event: FormEvent) => {
    event.preventDefault();
    // TODO - handle duration in the form
    const updateComponentState = () => {
      const dateFormated = moment(componentState.start).format('YYYY-MM-DD HH:mm:ss');
      const { adminUserId, serviceId, clientName } = componentState;
      return { adminUserId, serviceId, clientName, start: dateFormated, duration: 15 };
    };

    submitRequest(API.APPOINTMENTS, updateComponentState(), entity).then((response: any) => {
      handleSuccessRequest(response as AppointmentInterface[]);
    }).catch((errorObject: ErrorHandlerResponseInterface) => {
      handleErrorRequest(errorObject);
    });
  };

  const deleteAppointment = () => {
    deleteRequest(API.APPOINTMENTS, componentState.idAppointment).then((response) => {
      handleSuccessRequest(response as AppointmentInterface[]);
    }).catch((errorObject: ErrorHandlerResponseInterface) => {
      handleErrorRequest(errorObject);
    });
  };

  const onCancel = useCallback(() => closeModal(), [closeModal]);

  return { onCancel, errors, fieldErrors, deleteAppointment, handleSubmitAppointmentForm };
};
