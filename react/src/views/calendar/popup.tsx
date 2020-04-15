import Popup from 'reactjs-popup';
import React, { useEffect, useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import { DateRange } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormControl, InputLabel, Select } from '@material-ui/core';
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

interface CalendarPopupProps {
  open: boolean,
  closeModal: any,
  calendarEvent: any
}

export const CalendarPopup = ({ open, closeModal, calendarEvent }: CalendarPopupProps) => {
  const classes = useStyleForm();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, { service: '', adminUser: '', clientName: '' });
  const { date, service, adminUser, clientName } = componentState;

  useEffect(() => {
    if (calendarEvent) {
      dispatchComponentReducer({ name: 'date', value: calendarEvent.date });
    }
  }, [calendarEvent]);

  const serviceSelectInputHandler = useSelectInputActions();
  const adminUserSelectInputHandler = useSelectInputActions();

  const { getServicesOptions, getAdminUsersOptions } = useAppointmentSelectInputOptions();

  const { onChangeSelect, onChangeDate, onChangeString } = useChangeHandler(dispatchComponentReducer);

  const { errors, fieldErrors } = useFormActionHandler(componentState);

  const handleSubmitAdminUserForm = (e: any) => {
    e.preventDefault();
    console.log(componentState);
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
              {/* <FormTextField */}
              {/*  onChange={onChangeNumber} */}
              {/*  errorFields={fieldErrors} */}
              {/*  value={duration} */}
              {/*  fieldName="duration" */}
              {/*  label="Duration (mn)" */}
              {/*  type="number" */}
              {/* /> */}
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Service</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={serviceSelectInputHandler.openSelectInput}
                  onClose={serviceSelectInputHandler.handleCloseSelectInput}
                  onOpen={serviceSelectInputHandler.handleOpenSelectInput}
                  value={service}
                  name="service"
                  onChange={onChangeSelect}
                >
                  {getServicesOptions}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Staff Member</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={adminUserSelectInputHandler.openSelectInput}
                  onClose={adminUserSelectInputHandler.handleCloseSelectInput}
                  onOpen={adminUserSelectInputHandler.handleOpenSelectInput}
                  value={adminUser}
                  name="adminUser"
                  onChange={onChangeSelect}
                >
                  {getAdminUsersOptions}
                </Select>
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
