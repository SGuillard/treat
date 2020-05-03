import { useDispatch } from 'react-redux';
import React, { useCallback, useReducer, useState } from 'react';
import { formTimerReducer } from '../../../utils/forms/formReducer';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../../utils/api/type';
import { OpeningHoursInterface } from '../../types/types';
import { submitRequest } from '../../../utils/api/apiRequest';
import API from '../../../API';
import { setOpeningHoursAction } from '../../../store/actions/openinHoursAction';
import {
  FormMouseEventInterface, FormOnChangeFunctionInterface,
} from '../../../uiComponents/forms/FormTextField/type';
import { DayToUpdateInterface } from './type';
import { HandleChangeOpenType } from '../../../uiComponents/forms/FormOpenCloseButton/type';

export const useOpeningFormHook = () => {
  const dispatchReduxReducer = useDispatch();

  const [reducer, dispatchReducer] = useReducer(formTimerReducer, {});

  const handleChangeTime = useCallback<FormOnChangeFunctionInterface>((event) => {
    const element = event.target;
    const { value } = element;
    const type = element.name;
    const day = parseInt(element.getAttribute('day')!, 10);
    const id = element.getAttribute('rowid');
    dispatchReducer({ day, id, name: type, value });
  }, []);

  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);

  const submitForm = useCallback((dayToUpdate: DayToUpdateInterface) => {
    Object.entries(dayToUpdate).forEach(([day, hours]) => {
      const dayCasted = parseInt(day, 10);
      const editDay: OpeningHoursInterface = { day: dayCasted, ...hours };
      submitRequest(API.OPENINGS_HOURS, editDay, editDay).then((response: object[]) => {
        dispatchReduxReducer(setOpeningHoursAction(response as OpeningHoursInterface[]));
        // setRedirect(true);
      }).catch(({ errorMessages }: ErrorHandlerResponseInterface) => {
        setErrors(errorMessages);
      });
    });
  }, [dispatchReduxReducer]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitForm(reducer);
  };

  const handleChangeOpen: HandleChangeOpenType = useCallback<FormMouseEventInterface>((event) => {
    const element = event.target as HTMLInputElement;
    const isClose = element.getAttribute('is_close') === '0' ? 1 : 0;
    const day: number = parseInt(element.getAttribute('day')!, 10);
    const id: number = parseInt(element.getAttribute('rowid')!, 10);
    const dayToUpdate: DayToUpdateInterface = { [day]: { day, id, isClose } };
    submitForm(dayToUpdate);
  }, [submitForm]);

  return { handleChangeOpen, handleSubmit, submitForm, handleChangeTime, errors };
};
