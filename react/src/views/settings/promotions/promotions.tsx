import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Button, Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminROUTES from '../../../router/admin/admin-routes';
import { tableConfig } from './config/tableConfig';
import { ReduxState } from '../../../store/types';
import { TablePromotionInterface } from '../../types/types';


const Promotions = () => {
  const promotionList = useSelector((state: ReduxState) => state.promotions.list);
  const mappedPromotions = promotionList.map((promotion: TablePromotionInterface) => {
    const promotionTable = promotion;
    promotionTable.serviceName = promotion.service.name;
    return promotionTable;
  });

  const data = React.useMemo(
    () => mappedPromotions,
    [mappedPromotions],
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
