import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Button, Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import AdminROUTES from '../../../router/admin/admin-routes';
import { tableConfig } from './config/tableConfig';
import { ReduxState } from '../../../store/types';
import { getMappedPromotion } from './helper/getMappedPromotion';

export const PromotionList = () => {
  const promotionList = useSelector((state: ReduxState) => state.promotions.list);

  const data = React.useMemo(
    () => (promotionList ? getMappedPromotion(promotionList) : null),
    [promotionList],
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
      <Container component="main">
        <CssBaseline />
        <Grid
          container
          direction="row"
          justify="space-between"
        >
          <Grid item xs={4}>&nbsp;</Grid>
          <Grid item xs={4}><h1>Promotion list</h1></Grid>
          <Grid item xs={4}>
            <Box p={3}>
              <Button variant="contained" color="primary" onClick={() => setRedirect(true)}>
                <AddIcon />
                Add a promotion
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
              <tr {...headerGroup.getHeaderGroupProps()} style={{ height: 55 }}>
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
