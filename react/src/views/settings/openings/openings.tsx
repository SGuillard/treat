import React from 'react';
import {
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

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function createData(name: any, calories: any, fat: any) {
  return { name, calories, fat };
}

const Timer = ({openHour, closeHour, isClose}: any) => (
  <TextField
    id="time"
    type="time"
    defaultValue="07:30"
    // className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
);

const rows = [
  createData('Monday', <Timer />, 250),
  createData('Tuesday', 237, 300),
  createData('Wednesday', 262, 16.0),
  createData('Thursday', 305, 3.7),
  createData('Friday', 356, 16.0),
  createData('Saturday', 356, 16.0),
  createData('Sunday', 356, 16.0),
];

const Openings = () => {
  const classes = useStyles();

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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Openings;
