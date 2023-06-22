import React from 'react';
import {
  Typography,
  Grid,
  Stack,
  Link,
  SwipeableDrawer,
  Divider,
  Box,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import TuneIcon from '@mui/icons-material/Tune';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import _ from 'lodash';

const FooterCoin: React.FC = () => {
  // Constructors
  const { enqueueSnackbar } = useSnackbar();
  const [coinData, setCoinData] = React.useState<any>([]);
  const [isShowNotification, setIsShowNotification] =
    React.useState<boolean>(false);
  const [notification, setNotification] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState<any>(null);
  const userDetails = Utils.getUserData();

  React.useEffect(() => {
    Utils.WebSocket.emit('getLatestCoins', null, (data: any) => {
      setCoinData(data);
    });
    Utils.WebSocket.on('updateAllCoinPriceNow', (data) => {
      setCoinData(data);
    });
    // On new message
    Utils.WebSocket.emit(
      'getAllTradeNotification',
      { userId: userDetails?.id },
      (data: any) => {
        // Set message
        setNotification(data);
      }
    );
    Utils.WebSocket.on('updateNewNotification', (data) => {
      // Set message
      if (data?.userId === userDetails?.id) {
        const newMessage =
          data?.trade?.result === 'win'
            ? `Bạn vừa thắng ${
                data?.trade.betAmount * data?.trade.probability
              }USDT!`
            : `Bạn vừa thua ${
                data?.trade.betAmount * data?.trade.probability
              }USDT!`;
        setMessage({
          message: newMessage,
          isWin: data?.trade?.result === 'win',
        });
      }
      Utils.WebSocket.emit(
        'getAllTradeNotification',
        { userId: userDetails?.id },
        (data: any) => {
          // Set message
          setNotification(data);
        }
      );
    });
    return () => {
      Utils.WebSocket.off('updateNewNotification');
      Utils.WebSocket.off('updateAllCoinPriceNow');
      // clearInterval(intervalLatest24h);
    };
  }, []);

  React.useEffect(() => {
    if (message) {
      console.log(message);
      enqueueSnackbar(message?.message, {
        variant: message?.isWin ? 'success' : 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
        onExited: () => {
          setMessage(null);
        },
        action: () => {
          return null;
        },
      });
    }
  }, [message]);

  const onShowNotificationDrawer = () => {
    setIsShowNotification(true);
    Utils.WebSocket.emit(
      'getAllTradeNotification',
      { userId: userDetails?.id },
      (data: any) => {
        // Set message
        setNotification(data);
      }
    );
  };

  // Renders
  const _renderCoins = () =>
    _.map(coinData, (item: any, index: any) => {
      if (index < 3)
        return (
          <Grid
            item
            xs={3.66}
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{ fontSize: '11px', color: '#BBAEAE' }}
            key={index}
          >
            {item?.symbol} {item?.price}
          </Grid>
        );
      return null;
    });

  const isHasNewNotification = React.useMemo(() => {
    let result = false;
    if (notification.length > 0) {
      notification.forEach((item: { status: string }) => {
        if (item.status === 'unread') result = true;
      });
    }
    return result;
  }, [notification]);

  const renderMain = () => {
    return (
      <Grid container>
        <SwipeableDrawer
          anchor="right"
          open={isShowNotification}
          onClose={() => setIsShowNotification(false)}
          onOpen={() => setIsShowNotification(true)}
        >
          <Stack
            direction="column"
            sx={{ width: '500px', padding: '15px', overflow: 'auto' }}
          >
            {notification.map(
              (item: { message: string; time: string }, index: number) => {
                return (
                  <React.Fragment key={`message-${item.time}`}>
                    <Stack direction="column">
                      <Typography
                        sx={{ fontSize: '14px' }}
                        component="div"
                        dangerouslySetInnerHTML={{ __html: item.message }}
                      />

                      {/* <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 600,
                          marginTop: '4px',
                        }}
                      >
                        {item.time}
                      </Typography> */}
                    </Stack>
                    {index !== notification.length - 1 ? (
                      <Divider sx={{ margin: '10px 0' }} />
                    ) : null}
                  </React.Fragment>
                );
              }
            )}
          </Stack>
        </SwipeableDrawer>
        <Grid item xs={6} sm={6} md={2} order={{ xs: 2, md: 1 }}>
          <Stack padding="10px 10px">
            <Stack
              direction="row"
              alignItems="center"
              borderRight="1px solid #ccc"
            >
              <TapAndPlayIcon
                sx={{
                  marginRight: '10px',
                  color: '#408827',
                  fontSize: '16px',
                }}
              />
              <Typography sx={{ fontSize: '12px', color: '#408827' }}>
                Kết nối ổn định
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={0}
          sm={12}
          md={7}
          order={{ xs: 1, md: 2 }}
          display={{ xs: 'none', sm: 'block' }}
        >
          <Grid container padding="10px 20px">
            <Grid
              item
              xs={1}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              <TuneIcon />
            </Grid>
            {_renderCoins()}
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3} order={{ xs: 3, md: 3 }}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-evenly"
            padding="10px 0"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              borderLeft={{
                xs: 'none',
                md: '1px solid #BBAEAE',
              }}
              paddingLeft="10px"
            >
              <Stack sx={{ position: 'relative' }}>
                {isHasNewNotification ? (
                  <Box
                    sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#F21616',
                      position: 'absolute',
                      top: -1,
                      right: 5,
                    }}
                  />
                ) : null}
                <NotificationsIcon
                  sx={{
                    fontSize: '16px',
                    marginRight: '6px',
                    color: '#7D6F6F',
                  }}
                />
              </Stack>
              <Typography
                sx={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#7D6F6F',
                  ':hover': { cursor: 'pointer' },
                }}
                onClick={() => onShowNotificationDrawer()}
              >
                Thông báo
              </Typography>
            </Stack>
            <Link href={ROUTERS.SUPPORT}>
              <Stack flexDirection="row" alignItems="center">
                <MarkChatUnreadIcon
                  sx={{
                    fontSize: '16px',
                    marginRight: '6px',
                    color: '#7D6F6F',
                  }}
                />
                <Typography
                  sx={{ fontSize: '11px', fontWeight: 500, color: '#7D6F6F' }}
                >
                  Hỗ trợ trực tuyến
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  return renderMain();
};

export default FooterCoin;
