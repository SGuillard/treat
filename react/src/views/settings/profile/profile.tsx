import React, { useReducer } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { useStyleForm } from '../adminUsers/style';
import { formReducer } from '../../../utils/forms/formReducer';
import { useChangeHandler } from '../../../utils/forms/hooks/useChangeHandler';
import { useFormActionHandler } from '../../../utils/forms/hooks/useFormActionHandler';
import { FormTitle } from '../../../uiComponents/forms/FormTitle/FormTitle';
import { FormErrorMessage } from '../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { FormTextField } from '../../../uiComponents/forms/FormTextField/FormTextField';
import FormActionButtons from '../../../uiComponents/forms/FormActionButtons/FormActionButtons';
import AdminROUTES from '../../../router/admin/admin-routes';

export const Profile = ({ salon }: any) => {
  const classes = useStyleForm();

  const [componentState, dispatchComponentReducer] = useReducer(formReducer, salon);

  const { name, street } = componentState;

  const { onChangeString } = useChangeHandler(dispatchComponentReducer);

  const { handleSubmitProfileForm, errors, fieldErrors, redirect, onCancel } = useFormActionHandler(componentState, salon);

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmitProfileForm}>
        <FormTitle title="Business Profile" />
        <FormErrorMessage show={errors.length > 0} errors={errors} />
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <FormTextField
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={name}
            fieldName="Business Name"
            label="Business Name"
          />
          <FormTextField
            onChange={onChangeString}
            errorFields={fieldErrors}
            value={street}
            fieldName="street"
            label="Street"
          />
          <FormActionButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};
