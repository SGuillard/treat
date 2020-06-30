import React, { ReactElement, useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { Button, Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import Zoom from '@material-ui/core/Zoom';
import AdminROUTES from '../../../router/admin/admin-routes';
import { tableConfig } from './config/tableConfig';
import { ReduxState } from '../../../store/types';
import { dayOptions } from './form/helper';
import { TablePromotionInterface } from './types';
import { PromotionInterface } from '../../types/types';
import { submitRequest } from '../../../utils/api/apiRequest';
import API from '../../../API';
import { initPromotionList } from '../../../store/actions/promotionAction';
import { ErrorHandlerResponseInterface, ErrorObjectInterface } from '../../../utils/api/type';

export interface ErrorWrapperHOCProps<T> {
  children: ReactElement;
  errors: ErrorObjectInterface[];
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'red',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid red',
  },
}))(Tooltip);


export function ErrorWrapperHOC<T>({ errors, children }: ErrorWrapperHOCProps<T>) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errors.length > 0) setOpen(true);
  }, [errors]);

  const getErrors = (errorsMessages: ErrorObjectInterface[]) => (
    <ul>
      {errorsMessages.map((error: any) => (
        <li key={error.key}>
          {error.error}
        </li>
      ))}
    </ul>
  );

  return open
    ? (
      <HtmlTooltip
        title={getErrors(errors)}
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom"
        TransitionComponent={Zoom}
        leaveDelay={2000}
        arrow
      >
        <div className="input-wrapper">
          {children}
        </div>
      </HtmlTooltip>
    )
    : (
      <div>
        {children}
      </div>
    );
}

const PromotionSwitcher = ({ promotion }: {promotion: PromotionInterface}) => {
  const [errors, setErrors] = useState<ErrorHandlerResponseInterface>({
    errorFields: [],
    errorMessages: [],
  });

  const changeStatus = async () => {
    submitRequest(API.PROMOTIONS, { ...promotion, status: true, isActive: !promotion.isActive }, promotion)
      .then((response) => {
        console.log(response);
      })
      .catch((requestErrors) => {
        setErrors(requestErrors);
      });
    initPromotionList();
  };

  return (
    <ErrorWrapperHOC errors={errors.errorMessages}>
      <FormControlLabel
        control={(
          <Switch
            checked={promotion.isActive}
            onChange={changeStatus}
            name="checkedB"
            color="primary"
          />
    )}
        label={promotion.isActive ? 'Active' : 'Disabled'}
      />
    </ErrorWrapperHOC>
  );
};

const Promotions = () => {
  const promotionList = useSelector((state: ReduxState) => state.promotions.list);
  const mappedPromotions = promotionList.map((promotion: PromotionInterface) => {
    const promotionTable = Object.assign(promotion) as TablePromotionInterface;
    promotionTable.serviceName = promotion.service.name;
    promotionTable.day = dayOptions[promotion.day];
    promotionTable.status = <PromotionSwitcher promotion={promotion} />;
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
