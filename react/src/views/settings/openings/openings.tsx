import React from 'react';
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
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store/types';
import { FormTimer } from '../../../uiComponents/forms/FormTimer/FormTimer';
import { FormErrorMessage } from '../../../uiComponents/forms/FormErrorMessage/FormErrorMessage';
import { useStyles } from './style';
import { useOpeningFormHook } from './useOpeningFormHook';
import { weekDaysString } from '../../../utils/common/weekDaysString';
import { OpeningHoursInterface } from '../../types/types';

const Openings = () => {
  const classes = useStyles();

  const reduxHours = useSelector((state: ReduxState) => state.openingHours.list);

  const { handleChangeOpen, handleSubmit, handleChangeTime, errors } = useOpeningFormHook();

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
            {reduxHours.map((row: OpeningHoursInterface) => (
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
