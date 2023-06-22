import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Link,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { Utils } from '@/Libs';
interface IProps {
  symbol: string;
  itemsPerCategory: number;
}

const VolatilityTable: React.FC<IProps> = ({
  symbol,
  itemsPerCategory,
}: IProps) => {
  const [latestRow, setLatestRow] = React.useState<any>({});
  const [upRows, setUpRows] = React.useState<any[]>([]);
  const [downRows, setDownRows] = React.useState<any[]>([]);

  const getAggregateData = (data: any) => {
    setDownRows((oldData) => {
      const filteredData = _.slice(data, 0, 38);
      const newData = [...filteredData, ...oldData];
      return newData.length > 120 ? newData.slice(-60) : newData;
    });
    setUpRows((oldData) => {
      const filteredData = _.slice(data, 39, 79);
      const newData = [...filteredData, ...oldData];
      return newData.length > 120 ? newData.slice(-60) : newData;
    });
  };

  React.useEffect(() => {
    Utils.WebSocket.emit('getAggregateTradeList', { symbol }, getAggregateData);
    Utils.WebSocket.emit('getLatestCoinWithSymbol', { symbol }, (data: any) => {
      setLatestRow(data);
    });
    const intervalAggeList = setInterval(() => {
      Utils.WebSocket.emit(
        'getAggregateTradeList',
        { symbol, limit: 1 },
        (data: any) => {
          getAggregateData(data);
        }
      );
    }, 3000);
    Utils.WebSocket.on('updateAllCoinPriceNow', () => {
      Utils.WebSocket.emit('getAggregateTradeList', { symbol }, (data: any) => {
        getAggregateData(data);
      });
      Utils.WebSocket.emit(
        'getLatestCoinWithSymbol',
        { symbol },
        (data: any) => {
          setLatestRow(data);
        }
      );
    });
    return () => {
      Utils.WebSocket.off('updateAllCoinPriceNow');
      clearInterval(intervalAggeList);
    };
  }, []);

  const _renderRows = (isUp: boolean, items: number) => {
    const sortedList = isUp ? upRows : downRows;
    const randomSortList = _.slice(sortedList, 0, items || 12);
    return randomSortList.map((row) => {
      const total = row?.p * row?.q;
      return (
        <TableRow
          key={`${row?.E}-${row?.q}-${row?.T}-${row?.a}`}
          sx={{
            '& .MuiTableCell-root': { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: 9,
                lineHeight: '11px',
                color: isUp ? '#408827' : '#F21616',
                p: '4px 0 4px 8px',
                textAlign: 'left',
              }}
            >
              {row?.p}
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: 9,
                lineHeight: '11px',
                color: '#816A6A',
                p: '4px',
              }}
            >
              {row?.q}
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: 9,
                lineHeight: '11px',
                color: '#816A6A',
                padding: '4px 0',
              }}
            >
              {total.toFixed(2)}
            </Typography>
          </TableCell>
        </TableRow>
      );
    });
  };

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
                color: '#7D6F6F',
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
                color: '#7D6F6F',
              }}
            >
              Số lượng (EDU)
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
                color: '#7D6F6F',
              }}
            >
              Tổng
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_renderRows(true, itemsPerCategory)}
          <TableRow
            sx={{
              height: '40px',
              '& .MuiTableCell-root': { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" sx={{ p: 0 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: '11px',
                  p: '10px 0 10px 8px',
                  textAlign: 'left',
                }}
              >
                {latestRow?.price}
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ p: 0 }}>
              <Typography
                sx={{
                  fontSize: 9,
                  lineHeight: '11px',
                  p: '4px',
                }}
              >
                $27,160.01
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ p: 0 }}>
              <Link
                sx={{
                  fontSize: 9,
                  lineHeight: '11px',
                  padding: '4px 0',
                  color: 'text.primary',
                }}
              >
                Xem thêm
              </Link>
            </TableCell>
          </TableRow>
          {_renderRows(false, itemsPerCategory)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VolatilityTable;
