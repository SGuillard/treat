import React, { useCallback } from 'react';
import { FormOnChangeFunctionInterface } from '../../../uiComponents/forms/FormTextField/type';

export const useChangeHandler = (dispatchComponentReducer: any) => {
  const onChangeString = useCallback<FormOnChangeFunctionInterface>((e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatchComponentReducer(
      e.target,
    );
  }, [dispatchComponentReducer]);

  const onChangeNumber = useCallback<FormOnChangeFunctionInterface>((e: React.ChangeEvent<HTMLInputElement>): void => {
    const parsedInt = parseInt(e.currentTarget.value, 10);
    dispatchComponentReducer(
      { name: e.target.name, value: Number.isNaN(parsedInt) ? '' : parsedInt },
    );
  }, [dispatchComponentReducer]);

  const onChangeDecimal = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const parsedFloat = parseFloat(e.currentTarget.value);
    dispatchComponentReducer(
      { name: e.target.name, value: Number.isNaN(parsedFloat) ? '' : parsedFloat },
    );
  }, [dispatchComponentReducer]);

  const onChangeToggle = useCallback<FormOnChangeFunctionInterface>((e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVal = e.target.value !== 'true';
    dispatchComponentReducer({ name: e.target.name, value: newVal });
  }, [dispatchComponentReducer]);

  return { onChangeString, onChangeNumber, onChangeDecimal, onChangeToggle };
};
