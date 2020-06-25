import React, { useReducer } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { FormControl, InputLabel } from '@material-ui/core';
import { formReducer } from '../../../../utils/forms/formReducer';
import { useChangeHandler } from '../../../../utils/forms/hooks/useChangeHandler';
import { useFormActionHandler } from '../../../../utils/forms/hooks/useFormActionHandler';
import { FormTitleImage } from '../../../../uiComponents/forms/FormTitleImage/FormTitleImage';
import { FormTitle } from '../../../../uiComponents/forms/FormTitle/FormTitle';
import { FormErrorMessage } from '../../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { FormTextField } from '../../../../uiComponents/forms/FormTextField/FormTextField';
import FormActionButtons from '../../../../uiComponents/forms/FormActionButtons/FormActionButtons';
import AdminROUTES from '../../../../router/admin/admin-routes';
import { FormSelect } from '../../../../uiComponents/forms/FormSelect/FormSelect';
import { useStyleForm } from './style';
import { getDayOptions } from './helper';
import { useSelectInputOptions } from '../../../../utils/common/useSelectInputOptions';

const AddPromotionForm = () => {
  const classes = useStyleForm();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, {});

  const { name, dateFrom, dateTo, day, startTime, endTime, discount, serviceId } = componentState;

  const { getServicesOptions } = useSelectInputOptions();

  const { onChangeString, onChangeDate, onChangeSelect } = useChangeHandler(dispatchComponentReducer);

  const { handleSubmitAdminUserForm, errors, fieldErrors, redirect, onCancel } = useFormActionHandler(componentState, {});

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmitAdminUserForm}>
        <FormTitleImage><AccountCircleIcon /></FormTitleImage>
        <FormTitle title="Add Promotion" />
        <FormErrorMessage show={errors.length > 0} errors={errors} />
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <FormTextField
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={name}
            fieldName="name"
            label="Promotion name"
          />
          <div>
            <h5>From Date</h5>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="From Date"
                format="MMM dd, yyyy"
                value={dateFrom}
                onChange={onChangeDate('dateFrom')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="From Time"
                value={dateFrom}
                onChange={onChangeDate('dateFrom')}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <h5>To Date</h5>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="To Date"
                format="MMM dd, yyyy"
                value={dateTo}
                onChange={onChangeDate('dateTo')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="To Time"
                value={dateTo}
                onChange={onChangeDate('TimeTo')}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Every</InputLabel>
              <FormSelect
                value={day}
                fieldName="day"
                onChange={onChangeSelect}
                errorFields={fieldErrors}
                options={getDayOptions}
              />
            </FormControl>
          </div>
          <FormTextField
            type="time"
            fieldName="startTime"
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={startTime}
            label="Start Time"
            shrink
          />
          <FormTextField
            type="time"
            fieldName="endTime"
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={endTime}
            label="End Time"
            shrink
          />
          <FormTextField
            fieldName="Discount"
            type="number"
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={discount}
            label="Discount %"
          />
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
          <FormActionButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};

export default AddPromotionForm;
