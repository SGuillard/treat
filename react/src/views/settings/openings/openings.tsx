import React, { useReducer, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

interface hoursObjectInterface {
  open: string,
  close: string,
};

const Openings = () => {
  const classes = useStyles();

  const dispatchReduxReducer = useDispatch();

  const [reducer, dispatchReducer] = useReducer(formTimerReducer, {});

  const reduxHours = useSelector((state: ReduxState) => state.openingHours.list);

  const weekDaysString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e: any) => {
    dispatchReducer({ day: e.target.getAttribute('day'), id: e.target.getAttribute('id'), name: e.target.name, value: e.target.value });
  };

  const [errors, setErrors] = useState<ErrorObjectInterface[]>([]);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Object.entries(reducer as [string, OpeningHoursInterface][]).forEach(([day, hours]) => {
      const dayCasted = parseInt(day, 10);
      const editDay = { day: dayCasted, ...hours, isClose: false };
      submitRequest(API.OPENINGS_HOURS, editDay, editDay as OpeningHoursInterface).then((response: object[]) => {
        dispatchReduxReducer(setOpeningHoursAction(response as OpeningHoursInterface[]));
        // setRedirect(true);
      }).catch(({ errorMessages, errorFields }: ErrorHandlerResponseInterface) => {
        setFieldErrors(errorFields);
        setErrors(errorMessages);
      });
    });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Week day</TableCell>
              <TableCell align="right">Opening hour</TableCell>
              <TableCell align="right">Closing hour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reduxHours.map((row: any) => (
              <TableRow key={weekDaysString[row.day - 1]}>
                <TableCell component="th" scope="row">
                  {weekDaysString[row.day - 1]}
                </TableCell>
                <TableCell align="right">
                  <FormTimer
                    day={row.day}
                    openHour={row.open}
                    fieldName="open"
                    id={row.id}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell align="right">
                  <FormTimer
                    day={row.day}
                    id={row.id}
                    openHour={row.close}
                    fieldName="close"
                    onChange={handleChange}
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
