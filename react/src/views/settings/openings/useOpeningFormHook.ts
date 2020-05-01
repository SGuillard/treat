import { useDispatch } from 'react-redux';
import React, { useCallback, useReducer, useState } from 'react';
import { formTimerReducer } from '../../../utils/forms/formReducer';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../../utils/api/type';
import { OpeningHoursInterface } from '../../types/types';
import { submitRequest } from '../../../utils/api/apiRequest';
import API from '../../../API';
import { setOpeningHoursAction } from '../../../store/actions/openinHoursAction';
import {
  FormMouseEventInterface,
  FormOnChangeFunctionInterface
} from '../../../uiComponents/forms/FormTextField/type';


export const useOpeningFormHook = () => {
  const dispatchReduxReducer = useDispatch();

  const [reducer, dispatchReducer] = useReducer(formTimerReducer, {});

  const handleChangeTime = (e: any) => {
    const { value } = e.target;
    const type = e.target.name;
    const day = e.target.getAttribute('day');
    const id = e.target.getAttribute('rowid');
    dispatchReducer({ day, id, name: type, value });
  };

  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);

  const submitForm = (dayToUpdate: any) => {
    Object.entries(dayToUpdate as [string, OpeningHoursInterface][]).forEach(([day, hours]) => {
      const dayCasted = parseInt(day, 10);
      const editDay: OpeningHoursInterface = { day: dayCasted, ...hours };
      submitRequest(API.OPENINGS_HOURS, editDay, editDay).then((response: object[]) => {
        dispatchReduxReducer(setOpeningHoursAction(response as OpeningHoursInterface[]));
        // setRedirect(true);
      }).catch(({ errorMessages }: ErrorHandlerResponseInterface) => {
        setErrors(errorMessages);
      });
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitForm(reducer);
  };

  const handleChangeOpen = useCallback<FormMouseEventInterface>((event) => {
    const isClose = event.target.getAttribute('is_close') === '0' ? 1 : 0;
    const day = event.target.getAttribute('day');
    const id = event.target.getAttribute('rowid');
    const dayToUpdate = { [day]: { day, id, isClose } };
    submitForm(dayToUpdate);
  }, []);

  return { handleChangeOpen, handleSubmit, submitForm, handleChangeTime, errors };
};
