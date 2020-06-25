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

const AddPromotionForm = () => {
  const classes = useStyleForm();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, {});

  const { name, dateFrom, dateTo, day } = componentState;

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
            <h5>From</h5>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="MMM dd, yyyy"
                value={dateFrom}
                onChange={onChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time"
                value={dateFrom}
                onChange={onChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <h5>To</h5>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="MMM dd, yyyy"
                value={dateTo}
                onChange={onChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time"
                value={dateTo}
                onChange={onChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
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
          <FormActionButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};

export default AddPromotionForm;
