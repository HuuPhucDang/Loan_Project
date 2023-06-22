import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import _ from 'lodash';
import Chart from 'kaktana-react-lightweight-charts';

import { Utils } from '@/Libs';

interface IStock {
  symbol: string;
}

const Dashboard: React.FC<IStock> = ({ symbol }: IStock) => {
  // const theme = Utils.getThemeMode();

  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    Utils.WebSocket.emit(
      'getChartTradeList',
      { symbol, interval: '1m' },
      (data: any) => {
        setChartData(data);
      }
    );
    Utils.WebSocket.on('updateAllCoinPriceNow', () => {
      Utils.WebSocket.emit(
        'getChartTradeList',
        { symbol, interval: '1m', limit: 1 },
        (data: any) => {
          setChartData((oldData) => [...oldData, ...data]);
        }
      );
    });

    // const updateCoinPriceInterval = setInterval(() => {
    //   Utils.WebSocket.emit(
    //     'getChartTradeList',
    //     { symbol, interval: '1m', limit: 1 },
    //     (data: any) => {
    //       setChartData((oldData) => [...oldData, ...data]);
    //     }
    //   );
    // }, 10000);
    return () => {
      // clearInterval(updateCoinPriceInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* <Box sx={{ flex: 1 }} ref={chartContainerRef}></Box> */}
      {_.isEmpty(chartData) ? (
        <CircularProgress />
      ) : (
        <Chart
          options={{
            alignLabels: true,
            timeScale: {
              rightOffset: 15,
              minBarSpacing: 7,
              barSpacing: 10,
              fixLeftEdge: true,
              lockVisibleTimeRangeOnResize: true,
              rightBarStaysOnScroll: true,
              borderVisible: false,
              borderColor: '#fff000',
              visible: false,
              timeVisible: true,
              secondsVisible: false,
              backgroundColor: 'white',
            },
            autoSize: true,
            localization: {
              locale: 'vi-VN',
              dateFormat: 'dd.MM.yy',
            },
          }}
          candlestickSeries={[
            {
              data: chartData,
            },
          ]}
          autoWidth
          autoHeight
          // height={window.innerHeight - 180}
        />
      )}
    </Box>
  );
};

export default Dashboard;
