import React from 'react';
import {
  Typography,
  Grid,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Box,
  Link,
} from '@mui/material';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';

import { useTypedDispatch, RootState } from '../../../Reducers/store';
import { Utils } from '@/Libs';
import { ROUTERS, ENUMS } from '@/Constants';
import { UserActions, TradeActions } from '@/Reducers/Actions';

const styleBox = {
  height: '24px',
  width: '100%',
  marginTop: '10px',
  backgroundColor: 'background.secondary',
  padding: '10px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
};
const styleInput = {
  flex: 1,
  input: {
    padding: '6px 12px 6px 4px',
    fontSize: '8px',
  },
  '> ::before': {
    borderBottom: 'none',
  },
  '> ::after': {
    borderBottom: 'none',
  },
};

const LIMIT_BET: any = {
  [ENUMS.EUserType.BEGINNER]: [0],
  [ENUMS.EUserType.INTERMEDIATE]: [0, 1],
  [ENUMS.EUserType.ADVANCE]: [0, 1, 2],
  [ENUMS.EUserType.PROFESSINAL]: [0, 1, 2, 3],
};

const { getSelf } = UserActions;
const { createTrade } = TradeActions;
enum TRADE_TYPE {
  BUY = 'buy',
  SELL = 'sell',
}
interface ITradeFieldProps {
  symbol: string;
}

const TradeField: React.FC<ITradeFieldProps> = ({
  symbol,
}: ITradeFieldProps) => {
  // Constructors
  const dispatch = useTypedDispatch();
  const confirm = useConfirm();
  const isLogged = useSelector((state: RootState) =>
    _.get(state.AUTH, 'isLogged')
  );
  const userDetails = useSelector((state: RootState) =>
    _.get(state.USER, 'details')
  );
  const [userType, setUserType] = React.useState<string>('');
  const [betTime, setBetTime] = React.useState<string>('30s');
  const [betSellTime, setBetSellTime] = React.useState<string>('30s');
  const [probability, setProbability] = React.useState<number>(0);
  const [sellProbability, setSellProbability] = React.useState<number>(0);
  const [ballance, setBallance] = React.useState<number>(0);
  const [betAmount, setBetAmount] = React.useState<number>(0);
  const [betSellAmount, setBetSellAmount] = React.useState<number>(0);
  const [moonbotButtons, setMoonbootButtons] = React.useState<any>([]);
  const [coinPrice, setCoinPrice] = React.useState<number>(0);
  const [limitedTimes, setLimitedTimes] = React.useState<number>(0);
  const [betType, setBetType] = React.useState<string>('buy');
  const [serverTime, setServerTime] = React.useState<number>(0);
  const [isLimitTrade, setIsLimitTrade] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [selectedMoonBot, setSelectedMoonBot] = React.useState<string>('');
  const [stopWatch, setStopWatch] = React.useState<number>(0);
  const userDetailWallet = Utils.getUserData();

  React.useEffect(() => {
    if (isLogged) dispatch(getSelf());
    Utils.WebSocket.emit('getAllMoonboot', null, (data: any) => {
      setMoonbootButtons(data);
      const getFirstMoonboot: any = _.first(data);
      const getFirstSellMoonboot: any = _.first(
        _.filter(data, ['type', TRADE_TYPE.SELL])
      );
      setBetTime(`${getFirstMoonboot?.time}s`);
      setProbability(getFirstMoonboot?.probability);
      setLimitedTimes(getFirstMoonboot?.limitedTime);
      setServerTime(getFirstMoonboot?.time);
      setBetSellTime(`${getFirstSellMoonboot?.time}s`);
      setSellProbability(getFirstSellMoonboot?.probability);
      setSelectedMoonBot(getFirstMoonboot?.id);
    });
    Utils.WebSocket.on('updateAllMoonbotNow', (data) => {
      setMoonbootButtons(data);
    });
    Utils.WebSocket.on('updateTradeListNow', (data) => {
      if (data?.userId === userDetailWallet?.id) setBallance(data?.balance);
    });
    Utils.WebSocket.on('updateUserTypeNow', (data) => {
      if (data?.userId === userDetailWallet?.id) dispatch(getSelf());
    });
    const getUserType =
      _.get(userDetailWallet, 'userType.type') || ENUMS.EUserType.BEGINNER;
    const getBanlance = _.get(userDetailWallet, 'wallet.balance') || 0;
    setUserType(getUserType);
    setBallance(getBanlance);
    const updateCoinPriceInterval = setInterval(() => {
      Utils.WebSocket.emit('getCoinWithSymbol', { symbol }, (data: any) => {
        setCoinPrice(data?.price);
      });
    }, 3000);
    return () => {
      clearInterval(updateCoinPriceInterval);
      Utils.WebSocket.off('updateCountDown');
      Utils.WebSocket.off('updateTradeListNow');
      Utils.WebSocket.off('updateAllMoonbotNow');
      Utils.WebSocket.off('updateUserTypeNow');
    };
  }, [symbol]);

  React.useEffect(() => {
    Utils.WebSocket.off('updateCountDown');
    Utils.WebSocket.on('updateCountDown', (data) => {
      if (selectedMoonBot === data?.id) {
        setServerTime(data?.time);
        setIsLimitTrade(data?.isFrezze);
        setStopWatch(data?.frezzeTime);
      }
    });
  }, [selectedMoonBot]);

  React.useEffect(() => {
    // exit early when we reach 0
    // if (!serverTime) {
    //   setServerTime(startServerTime);
    //   return;
    // }
    // const intervalId = setInterval(() => {
    //   setServerTime(serverTime - 1);
    // }, 1000);
    // return () => clearInterval(intervalId);
  }, [serverTime]);

  React.useEffect(() => {
    const getUserType =
      _.get(userDetails, 'userType.type') || ENUMS.EUserType.BEGINNER;
    if (getUserType !== userType) setUserType(getUserType);
  }, [userDetails]);

  // React.useEffect(() => {
  //   if (serverTime <= limitedTimes) setIsLimitTrade(true);
  //   else setIsLimitTrade(false);
  // }, [serverTime]);

  // Events
  const onSetBetTime = (
    time: string,
    type: TRADE_TYPE,
    probability: number
  ) => {
    if (type === TRADE_TYPE.BUY) {
      if (time !== betTime) {
        setBetTime(time);
        setProbability(probability);
      }
    } else {
      if (time !== betSellTime) {
        setBetSellTime(time);
        setSellProbability(probability);
      }
    }
  };

  const createNewTrade = (betType: TRADE_TYPE) => {
    if (serverTime <= limitedTimes) {
      confirm({
        title: '',
        description: `Bạn không thể đặt trong thời gian khoá giao dịch!`,
      }).then(() => {});
    } else {
      if (!_.includes(LIMIT_BET[userType], selectedIndex)) {
        confirm({
          title: '',
          description: `Level của bạn không đủ để sử dụng chế độ ${
            betType === TRADE_TYPE.BUY ? betTime : betSellTime
          }! Vui lòng liên hệ admin để nâng cấp level!`,
        }).then(() => {
          Utils.redirect(ROUTERS.SUPPORT);
        });
      } else {
        const amount = betType === TRADE_TYPE.BUY ? betAmount : betSellAmount;
        if (!amount) {
          confirm({
            title: '',
            description: `Vui lòng nhập mức cược!`,
          }).then(() => {});
        } else {
          const payload = {
            betPrice: coinPrice,
            betAmount: betType === TRADE_TYPE.BUY ? betAmount : betSellAmount,
            type: betType,
            symbol,
            probability:
              betType === TRADE_TYPE.BUY ? probability : sellProbability,
            time: betType === TRADE_TYPE.BUY ? betTime : betSellTime,
            index: selectedIndex,
          };
          dispatch(
            createTrade(
              payload,
              limitedTimes,
              Number(betSellTime.replace('s', ''))
            )
          );
        }
      }
    }
  };
  // Renders
  const _renderMoonBot = (type: TRADE_TYPE) =>
    _.map(_.filter(moonbotButtons, ['type', type]), (item, index) => (
      <Grid item xs={6} sm={3} md={3} key={`${item?.id}`}>
        <Button
          variant="contained"
          sx={{
            fontSize: 9,
            lineHeight: '11px',
            textTransform: 'unset',
            backgroundColor:
              selectedMoonBot === item?.id ? 'error' : 'background.newsHeader',
            color: 'text.secondary',
            width: '100%',
            paddingX: '0',
            minWidth: 'unset',
          }}
          onClick={() => {
            if (!_.includes(LIMIT_BET[userType], index)) {
              confirm({
                title: '',
                description: `Level của bạn không đủ để sử dụng chế độ ${item?.time}s! Vui lòng liên hệ admin để nâng cấp level!`,
              }).then(() => {
                Utils.redirect(ROUTERS.SUPPORT);
              });
            } else {
              onSetBetTime(`${item?.time}s`, type, item?.probability);
              setLimitedTimes(item?.limitedTime || 0);
              setBetType(item?.type);
              setSelectedMoonBot(item?.id);
              setSelectedIndex(index);
            }
          }}
        >
          {item?.time}s
        </Button>
      </Grid>
    ));

  const _renderInputs = (type: TRADE_TYPE) => {
    return (
      <>
        <Box sx={styleBox}>
          <TextField
            placeholder="Số tiền khách bỏ ra để mua/ bán"
            variant="filled"
            type="number"
            sx={styleInput}
            inputProps={{
              step: 0.01,
            }}
            onChange={(e) => {
              if (type === TRADE_TYPE.BUY) setBetAmount(Number(e.target.value));
              else setBetSellAmount(Number(e.target.value));
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styleBox}>
          <TextField
            placeholder="Giá ngay thời điểm hiện tại"
            variant="filled"
            sx={styleInput}
            type="number"
            value={coinPrice}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styleBox}>
          <TextField
            placeholder="Số tiền thực tế nhận về"
            variant="filled"
            sx={styleInput}
            disabled
            type="number"
            value={
              type === TRADE_TYPE.BUY
                ? betAmount + betAmount * probability
                : betSellAmount + betSellAmount * sellProbability
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styleBox}>
          <TextField
            placeholder="Số tiền thực tế trả về"
            variant="filled"
            sx={styleInput}
            disabled
            type="number"
            value={
              type === TRADE_TYPE.BUY
                ? betAmount - betAmount * probability
                : betSellAmount - betSellAmount * sellProbability
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </>
    );
  };

  const _renderLeftSide = () => (
    <Grid item xs={6}>
      <Typography
        sx={{
          fontSize: {
            xs: '9px',
            md: '13px',
          },
          lineHeight: '15px',
        }}
      >
        Số dư: {ballance.toFixed(2)} USDT
      </Typography>
      {_renderInputs(TRADE_TYPE.BUY)}
      <Grid container spacing={0.5} marginTop="5px">
        {_renderMoonBot(TRADE_TYPE.BUY)}
      </Grid>
      <Button
        color="success"
        variant="contained"
        fullWidth
        size="small"
        sx={{
          marginTop: '10px',
          fontSize: 12,
          fontWeight: 900,
          background: '#2EBD85',
        }}
        disabled={isLimitTrade || betType === TRADE_TYPE.SELL}
        onClick={() => createNewTrade(TRADE_TYPE.BUY)}
      >
        Mua
      </Button>
    </Grid>
  );

  const _renderRightSide = () => (
    <Grid item xs={6}>
      <Typography
        sx={{
          fontSize: {
            xs: '9px',
            md: '13px',
          },
          lineHeight: '15px',
          color: isLimitTrade ? '#F21616' : '#408827',
        }}
      >
        Thời gian: {isLimitTrade ? stopWatch : serverTime}s
        {isLimitTrade && `(Thời gian khoá giao dịch)`}
      </Typography>
      {_renderInputs(TRADE_TYPE.SELL)}
      <Grid container spacing={0.5} marginTop="5px">
        {_renderMoonBot(TRADE_TYPE.SELL)}
      </Grid>
      <Button
        color="error"
        variant="contained"
        fullWidth
        size="small"
        sx={{
          marginTop: '10px',
          fontSize: 12,
          fontWeight: 900,
          background: '#F03030',
        }}
        disabled={isLimitTrade || betType === TRADE_TYPE.BUY}
        onClick={() => createNewTrade(TRADE_TYPE.SELL)}
      >
        Bán
      </Button>
    </Grid>
  );

  const _renderRequireLogin = () => (
    <Grid item xs={12}>
      <Typography
        sx={{ fontSize: '13px', lineHeight: '15px', textAlign: 'center' }}
      >
        Vui lòng{' '}
        <Link
          href={ROUTERS.SIGN_IN}
          sx={{ color: 'orange', fontWeight: 'bold' }}
        >
          Đăng Nhập
        </Link>{' '}
        hoặc{' '}
        <Link
          href={ROUTERS.SIGN_UP}
          sx={{ color: 'orange', fontWeight: 'bold' }}
        >
          Đăng ký
        </Link>{' '}
        để sử dụng!
      </Typography>
    </Grid>
  );

  const renderMain = () => {
    return (
      <Stack
        flex={1}
        padding="5px 10px"
        sx={{
          width: 1,
          '& .MuiInputBase-root:before': {
            borderBottom: 0,
          },
          '& .Mui-disabled': {
            background: 'none!important',
          },
        }}
      >
        <Grid container columnSpacing={1}>
          {!isLogged && _renderRequireLogin()}
          {isLogged && _renderLeftSide()}
          {isLogged && _renderRightSide()}
        </Grid>
      </Stack>
    );
  };

  return renderMain();
};

export default TradeField;
