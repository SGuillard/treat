import React, {
  useCallback,
  useReducer,
  useState,
} from 'react';
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

const validateForm = (store: AdminUserFormInterface) => true;

const SettingsAdminUserForm = (props: SettingsAdminUserFormAddProps) => {
  const classes = useStyles();
  const { adminUser, addEditTeamMember } = props;

  const [store, dispatch] = useReducer(formReducer, adminUser ?? initialArg);

  const { firstName, lastName, active } = store;

  const [redirect, setRedirect] = useState<boolean>(false);

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
        setRedirect(true);
      })
        .catch((e) => console.log(e));
    }
  };

  const onCancel = useCallback(() => setRedirect(true), []);

  const onChangeActionString = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(e.target);

  const onChangeActionToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value !== 'true';
    dispatch({ name: e.target.name, value: newVal });
  };

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
        <FormTitleImage><AccountCircleIcon /></FormTitleImage>
        <FormTitle title={`${adminUser ? 'Add' : 'Edit'} Team Member`} />
        <Grid container spacing={3} style={{ padding: '15px' }}>
          <FormTextField onChange={onChangeActionString} value={firstName} fieldName="firstName" label="First Name" />
          <FormTextField onChange={onChangeActionString} value={lastName} fieldName="lastName" label="Last Name" />
          <FormSwitchField onChange={onChangeActionToggle} value={active} />
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
