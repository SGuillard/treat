import Popup from 'reactjs-popup';
import React, { useCallback, useEffect, useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import { DateRange } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import moment from 'moment';
import { FormTitleImage } from '../../uiComponents/forms/FormTitleImage/FormTitleImage';
import { FormTitle } from '../../uiComponents/forms/FormTitle/FormTitle';
import { FormErrorMessage } from '../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { FormTextField } from '../../uiComponents/forms/FormTextField/FormTextField';
import FormActionButtons from '../../uiComponents/forms/FormActionButtons/FormActionButtons';
import { useStyleForm } from './style';
import { formReducer } from '../../utils/forms/formReducer';
import { useChangeHandler } from '../../utils/forms/hooks/useChangeHandler';
import { useFormActionHandler } from '../../utils/forms/hooks/useFormActionHandler';
import 'date-fns';
import { useSelectInputActions } from '../../utils/forms/hooks/useSelectInputActions';
import { useAppointmentSelectInputOptions } from './useAppointmentSelectInputOptions';
import { submitRequest } from '../../utils/api/apiRequest';
import API from '../../API';
import { FormSelect } from '../../uiComponents/forms/FormSelect/FormSelect';
import { EditMode } from './calendar';

interface CalendarPopupProps {
  open: boolean,
  closeModal: any,
  calendarEvent: any
  action: EditMode
}

export const CalendarPopup = ({ action, open, closeModal, calendarEvent }: CalendarPopupProps) => {
  const classes = useStyleForm();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, { serviceId: '', adminUserId: '', clientName: '' });
  const { date, serviceId, adminUserId, clientName } = componentState;

  const { redirect, errors, fieldErrors, handleSubmitAddAppointmentForm } = useFormActionHandler(componentState);

  useEffect(() => {
    if (calendarEvent) {
      dispatchComponentReducer({ name: 'date', value: action === EditMode.Add ? calendarEvent.date : calendarEvent.start });
    }
  }, [calendarEvent]);

  useEffect(() => {
    if (redirect) closeModal();
  }, [closeModal, redirect]);

  const { getServicesOptions, getAdminUsersOptions } = useAppointmentSelectInputOptions();

  const { onChangeSelect, onChangeDate, onChangeString } = useChangeHandler(dispatchComponentReducer);


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
        <form className={classes.paper} onSubmit={handleSubmitAddAppointmentForm}>
          <FormTitleImage><DateRange /></FormTitleImage>
          <FormTitle title="Add Appointment" />
          <FormErrorMessage show={errors.length > 0} errors={errors} />
          <Grid container spacing={3} style={{ padding: '15px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Service</InputLabel>
                <FormSelect
                  value={serviceId}
                  fieldName="serviceId"
                  onChange={onChangeSelect}
                  errorFields={fieldErrors}
                  options={getServicesOptions}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Staff Member</InputLabel>
                <FormSelect
                  value={adminUserId}
                  fieldName="adminUserId"
                  onChange={onChangeSelect}
                  errorFields={fieldErrors}
                  options={getAdminUsersOptions}
                />
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  format="MMM dd, yyyy"
                  value={date}
                  onChange={onChangeDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time"
                  value={date}
                  onChange={onChangeDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
              <FormTextField
                onChange={onChangeString}
                errorFields={fieldErrors}
                value={clientName}
                fieldName="clientName"
                label="Client Name"
              />
            </Grid>
            <FormActionButtons onCancel={closeModal} />
          </Grid>
        </form>
      </div>
    </Popup>
  );
};
