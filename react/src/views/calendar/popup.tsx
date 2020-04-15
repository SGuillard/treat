import Popup from 'reactjs-popup';
import React, { useEffect, useReducer, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import { FormTitleImage } from '../../uiComponents/forms/FormTitleImage/FormTitleImage';
import { FormTitle } from '../../uiComponents/forms/FormTitle/FormTitle';
import { FormErrorMessage } from '../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { FormTextField } from '../../uiComponents/forms/FormTextField/FormTextField';
import { FormSwitchField } from '../../uiComponents/forms/FormSwitchField/FormSwitchField';
import FormActionButtons from '../../uiComponents/forms/FormActionButtons/FormActionButtons';
import { useStyleForm } from './style';
import { formReducer } from '../../utils/forms/formReducer';
import formLoader from '../../utils/forms/formLoader';
import { useChangeHandler } from '../../utils/forms/hooks/useChangeHandler';
import { useFormActionHandler } from '../../utils/forms/hooks/useFormActionHandler';
import { DateRange } from '@material-ui/icons';


interface CalendarPopupProps {
  open: boolean,
  closeModal: any,
  calendarEvent: any
}

const initialArgs = {
  date: '',
  duration: 0,
};

export const CalendarPopup = ({ open, closeModal, calendarEvent }:CalendarPopupProps) => {
  useEffect(() => {
    console.log(calendarEvent.date);
  });

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, initialArgs);

  const { onChangeString, onChangeNumber } = useChangeHandler(dispatchComponentReducer);

  const { errors, fieldErrors } = useFormActionHandler(componentState);

  const { date, duration } = componentState;

  const classes = useStyleForm();

  const handleSubmitAdminUserForm = () => {
    console.log('submitted');
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <div className="modal">
        <div className="close" onClick={closeModal}>
          &times;
        </div>
        <form className={classes.paper} onSubmit={handleSubmitAdminUserForm}>
          <FormTitleImage><DateRange /></FormTitleImage>
          <FormTitle title="Add Appointment" />
          <FormErrorMessage show={errors.length > 0} errors={errors} />
          <Grid container spacing={3} style={{ padding: '15px' }}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                onChange={onChangeNumber}
                errorFields={fieldErrors}
                value={duration}
                fieldName="duration"
                label="Duration (mn)"
                type="number"
              />
            </Grid>
            <FormTextField
              onChange={onChangeString}
              errorFields={fieldErrors}
              value={date}
              fieldName="date"
              label="Date"
            />
            <FormActionButtons onCancel={closeModal} />
          </Grid>
        </form>
      </div>
    </Popup>
  );
};
