import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Button, Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import DisableButton from './disable-button';
import AdminROUTES from '../../../router/admin/admin-routes';

const dummyData = [
  {
    disable: <DisableButton />,
    name: 'First one',
    start_date: '2020-05-05 15:00:00',
    end_date: '2020-05-05 16:00:00',
    service: 'all',
    start_hour: '00:00:00',
    end_hour: '00:00:00',
    day: 'monday',
    discount: '15%',
  },
  {
    disable: <DisableButton />,
    name: 'Second one',
    start_date: '2020-05-08 15:00:00',
    end_date: '2020-05-09 15:00:00',
    service: 'Service Name',
    start_hour: '00:00:00',
    end_hour: '00:00:00',
    day: 'tuesday',
    discount: '20%',
  },
  {
    disable: <DisableButton />,
    name: 'Third one',
    start_date: '2020-10-22 17:00:00',
    end_date: '2020-10-23 15:00:00',
    service: 'all',
    start_hour: '00:00:00',
    end_hour: '00:00:00',
    day: 'all',
    discount: '25%',
  },
];

const tableConfig = [
  {
    Header: 'Disable',
    accessor: 'disable',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'From (date)',
    accessor: 'start_date', // accessor is the "key" in the data
  },
  {
    Header: 'To (date)',
    accessor: 'end_date',
  },
  {
    Header: 'On every',
    accessor: 'day',
  },
  {
    Header: 'From (hour)',
    accessor: 'start_hour',
  },
  {
    Header: 'To (hour)',
    accessor: 'end_hour',
  },
  {
    Header: 'Apply a discount of',
    accessor: 'discount',
  },
  {
    Header: 'On (service)',
    accessor: 'service',
  },
];

const Promotions = () => {
  const data = React.useMemo(
    () => dummyData,
    [],
  );

  const columns = React.useMemo(
    () => tableConfig,
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data } as any);

  const [redirect, setRedirect] = useState<boolean>(false);

  const getTable = () => (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item />
          <Grid item>Active promotions</Grid>
          <Grid item><Button onClick={() => setRedirect(true)}>Add a promotion</Button></Grid>
        </Grid>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
              // eslint-disable-next-line react/jsx-props-no-spreading
                    {...column.getHeaderProps()}
                    style={{
                      background: 'grey',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
              // eslint-disable-next-line react/jsx-props-no-spreading
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                  // eslint-disable-next-line react/jsx-props-no-spreading
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <CssBaseline />
      </Container>
    </>
  );

  return redirect ? <Redirect push to={AdminROUTES.SETTINGS.PROMOTIONS_ADD.path} /> : getTable();
};

export default Promotions;
