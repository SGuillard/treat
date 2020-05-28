import React from 'react';
import { useTable } from 'react-table';
import { Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import DisableButton from './disable-button';

const dummyData = [
  {
    disable: <DisableButton />,
    name: 'First one',
    start: '2020-05-05 15:00:00',
    end: '2020-05-05 16:00:00',
    service: 'all',
    discount: '15%',
  },
  {
    name: 'Second one',
    start: '2020-05-08 15:00:00',
    end: '2020-05-09 15:00:00',
    service: 'Service Name',
    discount: '20%',
  },
  {
    name: 'Third one',
    start: '2020-10-22 17:00:00',
    end: '2020-10-23 15:00:00',
    service: 'all',
    discount: '25%',
  },
];

const tableConfig = [
  {
    Header: 'Disable',
    accessor: 'disable',
  },
  {
    Header: 'Discount',
    accessor: 'discount',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Start',
    accessor: 'start', // accessor is the "key" in the data
  },
  {
    Header: 'End',
    accessor: 'end',
  },
  {
    Header: 'Service',
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


  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item></Grid>
          <Grid item>Active promotions</Grid>
          <Grid item>Add a promotion</Grid>
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
};

export default Promotions;
