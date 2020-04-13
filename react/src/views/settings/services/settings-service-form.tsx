import React, { FormEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { EventSeat } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import { ServiceInterface } from '../../types/types';
import { useStyles } from './style';
import FormActionButtons from '../../../uiComponents/forms/FormActionButtons/FormActionButtons';
import AdminROUTES from '../../../route/admin/admin-routes';
import { ReduxState } from '../../../store/types';
import { formReducer } from '../../../utils/forms/formReducer';
import {
  ErrorHandlerResponseInterface,
  ErrorObjectInterface,
  submitRequest,
} from '../../../utils/api/apiRequest';
import API from '../../../API';
import { setServiceAction } from '../../../store/actions/ServicesActions';
import { FormTextField } from '../../../uiComponents/forms/FormTextField/FormTextField';
import { FormOnChangeFunctionInterface } from '../../../uiComponents/forms/FormTextField/type';
import { FormTitle } from '../../../uiComponents/forms/FormTitle/FormTitle';
import { FormTitleImage } from '../../../uiComponents/forms/FormTitleImage/FormTitleImage';
import formLoader from '../../../utils/forms/formLoader';
import { FormErrorMessage } from '../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { SettingsServiceEditProps } from './type';
import { initialArgs } from './constants';

const SettingsServiceForm = (props: SettingsServiceEditProps) => {
  const classes = useStyles();
  const service = useSelector((state: ReduxState) => state.services.list.find((serviceRedux: ServiceInterface) => serviceRedux.id === Number(
    props.params && props.params.id,
  )));
  const dispatchReduxReducer = useDispatch();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const [componentState, dispatchComponentReducer] = useReducer(formReducer,
    service ?? initialArgs);

  useEffect(() => {
    formLoader(service, dispatchComponentReducer);
  }, [service]);

  const { name, duration, price } = componentState;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitRequest(event, API.SERVICES, componentState, service).then((response: object[]) => {
      dispatchReduxReducer(setServiceAction(response as ServiceInterface[]));
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
  const onChangeNumber = useCallback<FormOnChangeFunctionInterface>((e: React.ChangeEvent<HTMLInputElement>): void => {
    const parsedInt = parseInt(e.currentTarget.value, 10);
    dispatchComponentReducer(
      { name: e.target.name, value: Number.isNaN(parsedInt) ? '' : parsedInt },
    );
  }, []);

  const onChangeDecimal = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const parsedFloat = parseFloat(e.currentTarget.value);
    dispatchComponentReducer(
      { name: e.target.name, value: Number.isNaN(parsedFloat) ? '' : parsedFloat },
    );
  }, []);

  const getForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
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
