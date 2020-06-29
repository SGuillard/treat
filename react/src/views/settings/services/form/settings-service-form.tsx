import React, { useReducer } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { EventSeat } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import { useStyles } from '../style';
import FormActionButtons from '../../../../uiComponents/forms/FormActionButtons/FormActionButtons';
import AdminROUTES from '../../../../router/admin/admin-routes';
import { formReducer } from '../../../../utils/forms/formReducer';
import { FormTextField } from '../../../../uiComponents/forms/FormTextField/FormTextField';
import { FormTitle } from '../../../../uiComponents/forms/FormTitle/FormTitle';
import { FormTitleImage } from '../../../../uiComponents/forms/FormTitleImage/FormTitleImage';
import { FormErrorMessage } from '../../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { SettingsServiceFormProps } from '../type';
import { useChangeHandler } from '../../../../utils/forms/hooks/useChangeHandler';
import { useFormActionHandler } from '../../../../utils/forms/hooks/useFormActionHandler';

const SettingsServiceForm = ({ service }: SettingsServiceFormProps) => {
  const classes = useStyles();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, service);

  const { onChangeString, onChangeNumber, onChangeDecimal } = useChangeHandler(dispatchComponentReducer);

  const { handleSubmitServiceForm, errors, fieldErrors, redirect, onCancel } = useFormActionHandler(componentState, service);

  const { name, duration, price } = componentState;

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmitServiceForm}>
        <FormTitleImage>
          <EventSeat />
        </FormTitleImage>
        <FormTitle title={`${service ? 'Edit' : 'Add'} Service`} />
        <FormErrorMessage show={errors.length > 0} errors={errors} />
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <Grid item xs={12} sm={6}>
            <FormTextField
              onChange={onChangeString}
              errorFields={fieldErrors}
              value={name}
              fieldName="name"
              label="Name"
            />
          </Grid>
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
          <Grid item xs={12} sm={6}>
            <FormTextField
              onChange={onChangeDecimal}
              errorFields={fieldErrors}
              value={price}
              fieldName="price"
              label="Price ($)"
              type="number"
            />
          </Grid>
          <FormActionButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.SERVICE_LIST.path} /> : getForm();
};

export default SettingsServiceForm;
