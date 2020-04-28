import React, { useReducer, useState } from 'react';
import {
  Button, Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store/types';
import { FormTimer } from '../../../uiComponents/forms/FormTimer/FormTimer';
import { formTimerReducer } from '../../../utils/forms/formReducer';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../../utils/api/type';
import API from '../../../API';
import { submitRequest } from '../../../utils/api/apiRequest';
import { setOpeningHoursAction } from '../../../store/actions/openinHoursAction';
import { OpeningHoursInterface } from '../../types/types';
import { FormErrorMessage } from '../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { useStyles } from './style';

const Openings = () => {
  const classes = useStyles();

  const dispatchReduxReducer = useDispatch();

  const [reducer, dispatchReducer] = useReducer(formTimerReducer, {});

  const reduxHours = useSelector((state: ReduxState) => state.openingHours.list);

  const weekDaysString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChangeTime = (e: any) => {
    const { value } = e.target;
    const type = e.target.name;
    const day = e.target.getAttribute('day');
    const id = e.target.getAttribute('rowid');
    dispatchReducer({ day, id, name: type, value });
  };

  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);

  const submitForm = (dayToUpdate: any) => {
    Object.entries(dayToUpdate as [string, OpeningHoursInterface][]).forEach(([day, hours]) => {
      const dayCasted = parseInt(day, 10);
      const editDay: OpeningHoursInterface = { day: dayCasted, ...hours };
      submitRequest(API.OPENINGS_HOURS, editDay, editDay).then((response: object[]) => {
        dispatchReduxReducer(setOpeningHoursAction(response as OpeningHoursInterface[]));
        // setRedirect(true);
      }).catch(({ errorMessages }: ErrorHandlerResponseInterface) => {
        setErrors(errorMessages);
      });
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitForm(reducer);
  };

  const handleChangeOpen = (e: any) => {
    const isClose = e.target.getAttribute('is_close') === '0' ? 1 : 0;
    const day = e.target.getAttribute('day');
    const id = e.target.getAttribute('rowid');
    const dayToUpdate = { [day]: { day, id, isClose } };
    submitForm(dayToUpdate);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Week day</TableCell>
              <TableCell />
              <TableCell align="right">Opening hour</TableCell>
              <TableCell align="right">Closing hour</TableCell>
            </TableRow>
          </TableHead>
          <FormErrorMessage show={errors.length > 0} errors={errors} />
          <TableBody>
            {reduxHours.map((row: any) => (
              <TableRow key={weekDaysString[row.day]}>
                <TableCell component="th" scope="row">
                  {weekDaysString[row.day]}
                </TableCell>
                <TableCell align="right">
                  <Input
                    inputProps={{
                      is_close: row.isClose ? 1 : 0,
                      day: row.day,
                      rowid: row.id,
                    }}
                    name="is_close"
                    type="button"
                    onClick={handleChangeOpen}
                    value={row.isClose ? 'Close' : 'Open'}
                    style={{ color: row.isClose ? 'red' : 'green' }}
                  >
                    {row.isClose ? 'Close' : 'Open'}
                  </Input>
                </TableCell>
                <TableCell align="right">
                  <FormTimer
                    day={row.day}
                    openHour={row.open}
                    fieldName="open"
                    rowId={String(row.id)}
                    isClosed={row.isClose}
                    onChange={handleChangeTime}
                  />
                </TableCell>
                <TableCell align="right">
                  <FormTimer
                    day={row.day}
                    isClosed={row.isClose}
                    rowId={String(row.id)}
                    openHour={row.close}
                    fieldName="close"
                    onChange={handleChangeTime}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row" />
              <TableCell align="right" />
              <TableCell align="right">
                <Button onClick={handleSubmit} variant="contained" color="primary">
                  Save
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Openings;
