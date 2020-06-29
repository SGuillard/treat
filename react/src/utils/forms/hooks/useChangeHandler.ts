import { useCallback } from 'react';
import moment from 'moment';
import {
  FormOnChangeFunctionInterface,
  FormOnChangeSelectInterface,
} from '../../../uiComponents/forms/FormTextField/type';

export const useChangeHandler = (dispatchComponentReducer: any) => {
  const onChangeString = useCallback<FormOnChangeFunctionInterface>((e) => {
    dispatchComponentReducer(
      e.target,
    );
  }, [dispatchComponentReducer]);

  const onChangeNumber = useCallback<FormOnChangeFunctionInterface>((e) => {
    const parsedInt = parseInt(e.currentTarget.value, 10);
    dispatchComponentReducer(
      { name: e.target.name, value: Number.isNaN(parsedInt) ? '' : parsedInt },
    );
  }, [dispatchComponentReducer]);

  const onChangeDecimal = useCallback((e) => {
    const parsedFloat = parseFloat(e.currentTarget.value);
    dispatchComponentReducer(
      { name: e.target.name, value: Number.isNaN(parsedFloat) ? '' : parsedFloat },
    );
  }, [dispatchComponentReducer]);

  const onChangeToggle = useCallback<FormOnChangeFunctionInterface>((e) => {
    const newVal = e.target.value !== 'true';
    dispatchComponentReducer({ name: e.target.name, value: newVal });
  }, [dispatchComponentReducer]);

  const onChangeDate = (fieldName: string) => (date: any) => {
    const dateFormatted = moment(date).format('YYYY-MM-DD HH:mm:ss');
    dispatchComponentReducer({ name: fieldName, value: dateFormatted });
  };

  const onChangeSelect = useCallback<FormOnChangeSelectInterface>((e) => {
    dispatchComponentReducer(e.target);
  }, [dispatchComponentReducer]);

  return { onChangeString, onChangeSelect, onChangeNumber, onChangeDecimal, onChangeToggle, onChangeDate };
};
