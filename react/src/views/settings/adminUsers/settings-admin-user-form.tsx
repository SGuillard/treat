import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AdminUserFormInterface, AdminUserInterface } from '../../types/types';
import { addEditAdminUserAction } from '../../../store/actions/adminUsersActions';
import AdminROUTES from '../../../route/admin/admin-routes';
import { useStyles } from './style';
import FormActionButtons from '../../../uiComponents/forms/FormActionButtons';
import { SettingsAdminUserFormAddProps } from './types';
import { initialArg } from './admin-users-constants';
import { FormTextField } from '../../../uiComponents/forms/FormTextField';
import { FormTitle } from '../../../uiComponents/forms/FormTitle';
import { FormSwitchField } from '../../../uiComponents/forms/FormSwitchField';
import { FormTitleImage } from '../../../uiComponents/forms/FormTitleImage';
import { RequestMethod } from '../../../types';
import API from '../../../API';
import { formReducer } from '../../../utils/forms/formReducer';
import makeRequest from '../../../utils/api/apiRequest';
import { FormErrorMessage } from '../../../uiComponents/forms/FormErrorMessage';
import { castArrayList, castOptions } from '../../../utils/api/castObjectToCamelOrSnakeCase';

const validateForm = (store: AdminUserFormInterface) => true;

interface errorObjectInterface {
  // Key is only used as a key when mapping over errors
  key: number,
  error: any,
}

const SettingsAdminUserForm = (props: SettingsAdminUserFormAddProps) => {
  const classes = useStyles();
  const { adminUser, addEditTeamMember } = props;

  const [store, dispatch] = useReducer(formReducer, adminUser ?? initialArg);

  const { firstName, lastName, active } = store;

  const [redirect, setRedirect] = useState<boolean>(false);

  const [errors, setErrors] = useState<errorObjectInterface[] | string>('');
  const [fieldErrors, setFieldErrors] = useState<any>([]);

  useEffect(() => {
    console.log('init');
    return () => {
      console.log('destroy');
    };
  });

  const handleErrors = (e: any) => {
    switch (e.status) {
      case 403:
        setErrors(e.data.message);
        break;
      case 422:
        const backendErrors = [e.data.errors];
        const castedErrorFields = castArrayList(backendErrors, castOptions.ToCamel);
        const errorMessages: errorObjectInterface[] = [];
        castedErrorFields.map((fields:any, key: any) => {
          const fieldNamesWithErrors = Object.keys(fields);
          setFieldErrors(fieldNamesWithErrors);
          Object.values(fields).map((fieldErrorMessages: any, index: number) => {
            fieldErrorMessages.map((message: any) => {
              errorMessages.push({
                error: message,
                key: parseInt(`${key}${index}`, 10),
              });
            });
          });
        });
        setErrors(errorMessages);
        break;
      default:
        setErrors('We encounter some issues with your request, please contact support');
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm(store)) {
      // If edit mode, add user id for Back end
      if (adminUser) dispatch({ name: 'id', value: adminUser.id });
      const httpMethod = adminUser ? RequestMethod.PUT : RequestMethod.POST;
      const params = adminUser ? `/${adminUser.id}` : '';
      makeRequest(httpMethod,
        `${API.ADMIN_USER}${params}`, store).then((response: any) => {
        addEditTeamMember(response);
        setRedirect(false);
      })
        .catch((e) => {
          handleErrors(e.response);
        });
    }
  };

  const onCancel = useCallback(() => setRedirect(true), []);
  const onChangeString = useCallback((e: React.ChangeEvent<HTMLInputElement>) => dispatch(e.target), []);

  const onChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value !== 'true';
    dispatch({ name: e.target.name, value: newVal });
  };

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
        <FormTitleImage><AccountCircleIcon /></FormTitleImage>
        <FormTitle title={`${adminUser ? 'Add' : 'Edit'} Team Member`} />
        <FormErrorMessage show={errors.length > 0} errors={errors} />
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <FormTextField onChange={onChangeString} errorFields={fieldErrors} value={firstName} fieldName="firstName" label="First Name" />
          <FormTextField onChange={onChangeString} errorFields={fieldErrors} value={lastName} fieldName="lastName" label="Last Name" />
          <FormSwitchField onChange={onChangeToggle} value={active} />
          <FormActionButtons onCancel={onCancel} />
        </Grid>
      </form>
    </Container>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} /> : getForm();
};

const MapStateToProps = (state: any, ownProps: any) => ({
  adminUser: state.adminUsers.list.find((adminUser: any) => adminUser.id === Number(ownProps.params.id)),
});

const MapDispatchToProps = (dispatch: any) => ({
  addEditTeamMember: (user: AdminUserInterface) => dispatch(addEditAdminUserAction(user)),
});

export default connect(MapStateToProps, MapDispatchToProps)(SettingsAdminUserForm);
