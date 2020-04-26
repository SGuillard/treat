import React, { useEffect, useReducer, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store/types';
import { FormTimer } from '../../../uiComponents/forms/FormTimer/FormTimer';
import { formTimerReducer } from '../../../utils/forms/formReducer';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const Openings = () => {
  const classes = useStyles();

  const [reducer, dispatchReducer] = useReducer(formTimerReducer, {});

  const reduxHours = useSelector((state: ReduxState) => state.openingHours.list);

  // useEffect(() => {
  //   const openings = reduxHours.map((hours: any) => ({
  //     day: hours.day,
  //     open: <Timer openHour={hours.open} />,
  //     close: <Timer openHour={hours.close} />,
  //   }));
  //   setOpeningHours(openings);
  // }, [reduxHours]);

  const weekDaysString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e: any) => {
    dispatchReducer({day: e.target.getAttribute('day'), name: e.target.name, value: e.target.value});
  };

  const handleSubmit = () => {
    console.log(reducer);
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
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell align="right">
                  <FormTimer
                    day={row.day}
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
