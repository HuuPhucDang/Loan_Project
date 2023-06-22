import React from 'react';
import {
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';

const CoinValueTable = () => {
  const [coinData, setCoinData] = React.useState<any>([]);

  React.useEffect(() => {
    Utils.WebSocket.on('updateAllCoinPriceNow', (data) => {
      setCoinData(data);
    });
    Utils.WebSocket.emit('getLatestCoins', null, (data: any) => {
      setCoinData(data);
    });
    return () => {
      Utils.WebSocket.off('updateAllCoinPriceNow');
      // Utils.WebSocket.disconnect();
    };
  }, []);

  return (
    <TableContainer
      sx={{
        maxHeight: '370px',
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
          minWidth: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          backgroundImage: 'unset',
        }}
        aria-label="simple table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="start"
                sx={{ pt: 2 }}
              >
                <Typography sx={{ fontSize: 11, fontWeight: 400 }}>
                  Cặp
                </Typography>
                <Box position="relative" sx={{ ml: '3px' }}>
                  <ArrowDropUpIcon
                    sx={{
                      fontSize: 16,
                      position: 'absolute',
                      bottom: -5,
                      color: '#FFB23F',
                    }}
                  />
                  <ArrowDropDownIcon
                    sx={{
                      fontSize: 16,
                      position: 'absolute',
                      top: -5,
                      color: '#BBAEAE',
                    }}
                  />
                </Box>
              </Stack>
            </TableCell>
            <TableCell align="right">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="end"
                sx={{ pt: 2 }}
              >
                <Typography sx={{ fontSize: 11, fontWeight: 400 }}>
                  Giá
                </Typography>
                <Box position="relative" sx={{ ml: '3px' }}>
                  <ArrowDropUpIcon
                    sx={{
                      fontSize: 16,
                      position: 'absolute',
                      bottom: -5,
                      color: '#BBAEAE',
                    }}
                  />
                  <ArrowDropDownIcon
                    sx={{
                      fontSize: 16,
                      position: 'absolute',
                      top: -5,
                      color: '#BBAEAE',
                    }}
                  />
                </Box>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinData.map((row: any, index: number) => (
            <TableRow
              key={`row-${index}`}
              sx={{
                '& .MuiTableCell-root': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" align="left" sx={{ p: 1 }}>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="start"
                >
                  <StarIcon
                    sx={{
                      fontSize: '16px',
                      marginRight: '6px',
                      color: '#816A6A',
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      color: '#816A6A',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      Utils.redirect(
                        `${ROUTERS.TRANSACTION}?symbol=${row?.symbol}`
                      );
                      // window.location.href = `${ROUTERS.TRANSACTION}?symbol=${row?.symbol}`;
                      window.location.reload();
                    }}
                  >
                    {row?.symbol}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right" sx={{ p: 1, color: '#816A6A' }}>
                <Typography
                  sx={{
                    fontSize: 9,
                    lineHeight: '11px',
                    color: '#816A6A',
                  }}
                >
                  {row?.price}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinValueTable;
