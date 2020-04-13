import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AdminUserInterface } from '../../types/types';
import AdminROUTES from '../../../route/admin/admin-routes';
import { useStyleForm } from './style';
import FormActionButtons from '../../../uiComponents/forms/FormActionButtons/FormActionButtons';
import { SettingsAdminUserFormAddProps } from './types';
import {
  FormTextField
} from '../../../uiComponents/forms/FormTextField/FormTextField';
import { FormTitle } from '../../../uiComponents/forms/FormTitle/FormTitle';
import { FormSwitchField } from '../../../uiComponents/forms/FormSwitchField/FormSwitchField';
import { FormTitleImage } from '../../../uiComponents/forms/FormTitleImage/FormTitleImage';
import API from '../../../API';
import { formReducer } from '../../../utils/forms/formReducer';
import {
  ErrorHandlerResponseInterface,
  ErrorObjectInterface,
  submitRequest,
} from '../../../utils/api/apiRequest';
import { FormErrorMessage } from '../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { ReduxState } from '../../../store/types';
import { setAdminUsersAction } from '../../../store/actions/adminUsersActions';
import { FormOnChangeFunctionInterface } from '../../../uiComponents/forms/FormTextField/type';
import formLoader from '../../../utils/forms/formLoader';
import { initialArg } from './constants';

const SettingsAdminUserForm = (props: SettingsAdminUserFormAddProps) => {
  const classes = useStyleForm();
  const { params } = props;
  const adminUser = useSelector((state: ReduxState) => state.adminUsers.list.find((adminUserState: AdminUserInterface) => adminUserState.id === Number(
    params && params.id,
  )));
  const dispatchReduxReducer = useDispatch();
  const [componentState, dispatchComponentReducer] = useReducer(formReducer,
    adminUser ?? initialArg);

  useEffect(() => {
    formLoader(adminUser, dispatchComponentReducer);
  }, [adminUser]);

  const { firstName, lastName, active } = componentState;
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitRequest(event, API.ADMIN_USER, componentState, adminUser).then((response: object[]) => {
      dispatchReduxReducer(setAdminUsersAction(response as AdminUserInterface[]));
      setRedirect(true);
    }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
      setFieldErrors(errorFields);
      setErrors(errorMessages);
    });
  };

  const onCancel = useCallback(() => setRedirect(true), []);
  const onChangeString = useCallback<FormOnChangeFunctionInterface>((e: React.ChangeEvent<HTMLInputElement>): void => dispatchComponentReducer(
    e.target,
  ), []);
  const onChangeToggle: FormOnChangeFunctionInterface = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVal = e.target.value !== 'true';
    dispatchComponentReducer({ name: e.target.name, value: newVal });
  };

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
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
