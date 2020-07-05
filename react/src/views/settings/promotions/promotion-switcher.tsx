import { PromotionInterface } from '../../types/types';
import React, { useState } from 'react';
import { ErrorHandlerResponseInterface } from '../../../utils/api/type';
import { useDispatch } from 'react-redux';
import { submitRequest } from '../../../utils/api/apiRequest';
import API from '../../../API';
import { SET_PROMOTION_ACTION } from '../../../store/actions/constants';
import { ErrorWrapper } from '../../../common/error-wrapper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export const PromotionSwitcher = ({ promotion }: {promotion: PromotionInterface}) => {
  const [errors, setErrors] = useState<ErrorHandlerResponseInterface>({
    errorFields: [],
    errorMessages: [],
  });

  const dispatch = useDispatch();

  const changeStatus = async () => {
    // Change promotion object to remove service and not useful parameters
    submitRequest(API.PROMOTIONS, { id: promotion.id, isActive: !promotion.isActive }, promotion)
    .then((response) => {
      dispatch({ type: SET_PROMOTION_ACTION, payload: response });
    })
    .catch((requestErrors) => {
      setErrors(requestErrors);
    });
  };

  return (
    <ErrorWrapper errors={errors.errorMessages}>
      <FormControlLabel
        control={(
          <Switch
            checked={promotion.isActive}
            onChange={changeStatus}
            name="checkedB"
            color="primary"
          />
        )}
        label={promotion.isActive ? 'Active' : 'Disabled'}
      />
    </ErrorWrapper>
  );
};
