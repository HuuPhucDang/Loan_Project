import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  CircularProgress,
} from '@mui/material';
import { useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import { useTypedDispatch, RootState } from '@/Reducers/store';
import { TradeActions } from '@/Reducers/Actions';

const { fetchTrades } = TradeActions;

const MyInvoiceTable = () => {
  const dispatch = useTypedDispatch();
  const allTrades: any = useSelector(
    (state: RootState) => _.get(state.TRADE, 'allTrades') || []
  );
  const isLogged: any = useSelector((state: RootState) =>
    _.get(state.AUTH, 'isLogged')
  );
  const isFetchLoading = useSelector((state: RootState) =>
    _.get(state.TRADE, 'isFetchLoading')
  );

  useEffect(() => {
    if (isLogged) dispatch(fetchTrades());
    return () => {
      // clearInterval(checkResultInterval);
    };
  }, [isLogged]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '100%',
        overflow: 'auto',
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'unset',
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: 1,
          backgroundColor: 'transparent',
          backgroundImage: 'unset',
        }}
        aria-label="simple table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
              }}
            >
              Giá (USDT)
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
              }}
            >
              Số lượng USDT
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
              }}
            >
              Thời gian
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isFetchLoading && (
            <TableRow>
              <TableCell colSpan={3}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {!isFetchLoading &&
            allTrades.length > 0 &&
            allTrades.map((row: any, index: number) => (
              <TableRow
                key={`row-${index}`}
                sx={{
                  '& .MuiTableCell-root': { border: 0 },
                }}
              >
                <TableCell align="center" scope="row" sx={{ padding: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      color: row.type === 'buy' ? '#408827' : '#F21616',
                      padding: '4px 0',
                    }}
                  >
                    {row?.betPrice}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ padding: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      padding: '4px 0',
                    }}
                  >
                    {row?.betAmount}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ padding: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      padding: '4px 0',
                      color: '#816A6A',
                    }}
                    title={row?.betTime}
                  >
                    {row?.betTime.split(' ')[1]}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          {!isFetchLoading && allTrades.length === 0 && (
            <TableRow
              sx={{
                '& .MuiTableCell-root': { border: 0 },
              }}
            >
              <TableCell
                colSpan={3}
                align="center"
                scope="row"
                sx={{ padding: 0 }}
              >
                <Typography
                  sx={{
                    fontSize: 9,
                    lineHeight: '11px',
                    padding: '4px 0',
                  }}
                >
                  Không có dữ liệu
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyInvoiceTable;
