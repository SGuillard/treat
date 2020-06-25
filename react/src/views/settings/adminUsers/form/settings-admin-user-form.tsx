import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminROUTES from '../../../../router/admin/admin-routes';
import { useStyleForm } from '../style';
import FormActionButtons from '../../../../uiComponents/forms/FormActionButtons/FormActionButtons';
import { SettingsAdminUserFormAddProps } from '../types';
import {
  FormTextField,
} from '../../../../uiComponents/forms/FormTextField/FormTextField';
import { FormTitle } from '../../../../uiComponents/forms/FormTitle/FormTitle';
import { FormSwitchField } from '../../../../uiComponents/forms/FormSwitchField/FormSwitchField';
import { FormTitleImage } from '../../../../uiComponents/forms/FormTitleImage/FormTitleImage';
import { formReducer } from '../../../../utils/forms/formReducer';
import { FormErrorMessage } from '../../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { useChangeHandler } from '../../../../utils/forms/hooks/useChangeHandler';
import { useFormActionHandler } from '../../../../utils/forms/hooks/useFormActionHandler';

const SettingsAdminUserForm = ({ adminUser }: SettingsAdminUserFormAddProps) => {
  const classes = useStyleForm();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, adminUser);

  const { firstName, lastName, active } = componentState;

  const { onChangeString, onChangeToggle } = useChangeHandler(dispatchComponentReducer);

  const { handleSubmitAdminUserForm, errors, fieldErrors, redirect, onCancel } = useFormActionHandler(componentState, adminUser);

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmitAdminUserForm}>
        <FormTitleImage><AccountCircleIcon /></FormTitleImage>
        <FormTitle title={`${adminUser ? 'Edit' : 'Add'} Team Member`} />
        <FormErrorMessage show={errors.length > 0} errors={errors} />
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <FormTextField
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={firstName}
            fieldName="firstName"
            label="First Name"
          />
          <FormTextField
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={lastName}
            fieldName="lastName"
            label="Last Name"
          />
          <FormSwitchField onChange={onChangeToggle} value={active} />
          <FormActionButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};

export default SettingsAdminUserForm;
