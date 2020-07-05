import React, { useEffect, useReducer } from 'react';
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
import moment from 'moment';
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

const initialStartDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
const initialEndDate = moment(new Date()).add(5, 'days').format('YYYY-MM-DD HH:mm:ss');

const initialValues = { name: '', startDate: initialStartDate, endDate: initialEndDate, day: 0, serviceId: '', startHour: '10:00', endHour: '11:00', discount: 15 };

const AddPromotionForm = () => {
  const classes = useStyleForm();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, initialValues);

  console.log(initialValues);

  const { name, startDate, endDate, day, startHour, endHour, discount, serviceId } = componentState;

  const { getServicesOptions } = useSelectInputOptions();

  const { onChangeString, onChangeDate, onChangeSelect } = useChangeHandler(dispatchComponentReducer);

  const { handleSubmitPromotionForm, errors, fieldErrors, redirect, onCancel } = useFormActionHandler(componentState, {});

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmitPromotionForm}>
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
                value={startDate}
                onChange={onChangeDate('startDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="From Time"
                value={startDate}
                onChange={onChangeDate('startDate')}
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
                value={endDate}
                onChange={onChangeDate('endDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="To Time"
                value={endDate}
                onChange={onChangeDate('endDate')}
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
            fieldName="startHour"
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={startHour}
            label="Start Time"
            shrink
          />
          <FormTextField
            type="time"
            fieldName="endHour"
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={endHour}
            label="End Time"
            shrink
          />
          <FormTextField
            fieldName="discount"
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

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.PROMOTIONS_LIST.path} /> : getForm();
};

export default AddPromotionForm;
