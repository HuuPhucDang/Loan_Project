import React from 'react';
import _ from 'lodash';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { EditAvatar, EditName } from '@/Components/Popup';
import { ENUMS, ROUTERS } from '@/Constants';
import { Utils } from '@/Libs';
import { UserActions } from '@/Reducers/Actions';
import { useTypedDispatch } from '@/Reducers/store';

const userTypes = [
  {
    label: 'Sơ cấp',
    value: ENUMS.EUserType.BEGINNER,
  },
  {
    label: 'Trung cấp',
    value: ENUMS.EUserType.INTERMEDIATE,
  },
  {
    label: 'Nâng cao',
    value: ENUMS.EUserType.ADVANCE,
  },
  {
    label: 'Chuyên nghiệp',
    value: ENUMS.EUserType.PROFESSINAL,
  },
];

const { getSelf } = UserActions;

const Overview: React.FC = () => {
  // Constructors
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const [isShowNamePopup, setIsShowNamePopup] = React.useState<boolean>(false);
  const [isShowAvatarPopup, setIsShowAvatarPopup] =
    React.useState<boolean>(false);

  const [tableData, setTableData] = React.useState<any>([]);
  const [enchangeRate, setEnchangeRate] = React.useState<number>(0);

  React.useEffect(() => {
    Utils.WebSocket.emit('getLatestCoins', null, (data: any) => {
      setTableData(data);
    });
    Utils.WebSocket.on('updateAllCoinPriceNow', (data) => {
      setTableData(data);
    });
    Utils.WebSocket.emit(
      'exchangeCurrency',
      { symbol: 'USDTVND' },
      (data: any) => {
        setEnchangeRate(data || 0);
      }
    );
    dispatch(getSelf());
    return () => {
      Utils.WebSocket.off('updateAllCoinPriceNow');
      // Utils.WebSocket.disconnect();
    };
  }, []);

  // Renders
  const userType = React.useMemo(() => {
    let result = 'Sơ cấp';
    const findUserType = userTypes.find(
      (item: { label: string; value: string }) =>
        item.value === userData?.userType
    );

    if (findUserType) result = findUserType.label;
    return result;
  }, []);

  const _renderTable = () => (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: '20px',
        boxShadow: 'none',
        borderRadius: '0px',
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: '100%',
          backgroundColor: 'background.mainContent',
        }}
        aria-label="simple table"
      >
        <TableBody>
          {_.isEmpty(tableData) && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ textAlign: 'center' }}
              >
                No Coins available
              </TableCell>
            </TableRow>
          )}
          {_.map(tableData, (item, index) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ padding: '4px' }}>
                <Stack direction="row" alignItems="center">
                  <Box
                    component="img"
                    src={item?.icon}
                    sx={{
                      width: '22px',
                      height: 'auto',
                      objectFit: 'contain',
                      marginRight: '10px',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '13px',
                      lienHeight: '20px',
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {item?.symbol}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right" sx={{ padding: '4px' }}>
                <Typography
                  sx={{
                    fontSize: '10px',
                    lineHeight: '24px',
                    color: 'text.primary',
                  }}
                >
                  {item?.price}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ padding: '4px' }}>
                <Typography
                  sx={{
                    fontSize: '10px',
                    lineHeight: '24px',
                    color: item?.growth < 0 ? '#F03030' : '#23631D',
                  }}
                >
                  {item?.growth}%
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ padding: '4px' }}>
                <Link
                  sx={{
                    fontSize: '10px',
                    lineHeight: '14px',
                    fontWeight: 400,
                    color: 'text.burntSienna',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                  href={`${ROUTERS.TRANSACTION}?symbol=${item?.symbol}`}
                >
                  Giao dịch
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: {
            xs: '0',
            // md: '1em 0',
          },
          mx: 'auto',
          // maxWidth: '971px',
        }}
      >
        <EditAvatar
          open={isShowAvatarPopup}
          onClose={() => setIsShowAvatarPopup(false)}
        />
        <EditName
          open={isShowNamePopup}
          onClose={() => setIsShowNamePopup(false)}
        />
        <Grid container height="100%">
          <Grid
            item
            xs={12}
            md={2}
            width="100%"
            sx={{
              position: {
                xs: 'sticky',
                md: 'unset',
              },
              top: '70px',
              backgroundColor: 'background.default',
              zIndex: 1,
            }}
          >
            <Sidebar />
          </Grid>
          <Grid
            item
            xs={12}
            md={10}
            borderLeft="1px solid #949494"
            padding="9px 32px 9px 18px"
          >
            <Grid
              container
              columnSpacing={1}
              rowSpacing={3.5}
              padding={{ xs: '10px', md: 0 }}
            >
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  sx={{
                    backgroundColor: 'background.mainContent',
                    padding: '13px',
                  }}
                >
                  <Avatar
                    src={userData.avatar || ''}
                    sx={{ width: '70px', height: '70px', marginRight: '20px' }}
                  />
                  <Stack direction="column">
                    <Stack
                      direction="row"
                      alignItems="center"
                      marginBottom="16px"
                    >
                      <Typography sx={{ marginRight: '16px' }}>
                        {userData
                          ? userData?.nickname
                          : 'Anonymous-User-b5b47p'}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setIsShowNamePopup(true)}
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ fontSize: '20px' }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setIsShowAvatarPopup(true)}
                      >
                        <RemoveRedEyeOutlinedIcon sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap">
                      <Box
                        sx={{ marginRight: '20px', minWidth: 'max-content' }}
                      >
                        <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>
                          ID người dùng
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }}>
                          {userData?.id}
                        </Typography>
                      </Box>
                      <Box sx={{ minWidth: 'max-content' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>
                          Loại người dùng
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }}>
                          {userType}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: 'background.mainContent',
                    padding: '20px',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                      Số dư ước tính
                    </Typography>
                    <Stack direction="row" alignItems="center" marginTop="30px">
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '30px',
                        }}
                      >
                        {Number(userData?.wallet?.balance).toFixed(2)} USDT
                      </Typography>
                      {/* <Box
                        component="img"
                        src={Assets.downArrowIcon}
                        sx={{
                          width: '19px',
                          height: '19px',
                          margin: '0 20px 0 10px',
                        }}
                      /> */}
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '30px',
                          marginLeft: '30px',
                        }}
                      >
                        ~~{' '}
                        {(
                          userData?.wallet?.balance * enchangeRate
                        ).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" marginTop="10px">
                    <Button
                      sx={{
                        fontSize: '16px',
                        fontWeigh: 500,
                        textTransform: 'unset',
                        backgroundColor: 'background.burntSienna',
                        color: 'text.secondary',
                        width: '110px',
                        marginRight: ' 10px',
                        borderRadius: '0px',
                      }}
                      onClick={() => Utils.redirect(ROUTERS.RECHARGE)}
                    >
                      Nạp
                    </Button>
                    <Button
                      sx={{
                        fontSize: '16px',
                        fontWeigh: 500,
                        textTransform: 'unset',
                        backgroundColor: 'background.lightSilver',
                        color: 'text.secondary',
                        width: '110px',
                        borderRadius: '0px',
                      }}
                      onClick={() => Utils.redirect(ROUTERS.WITHDRAW_MONEY)}
                    >
                      Rút
                    </Button>
                  </Stack>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      lineHeight: '24px',
                      fontWeight: 600,
                    }}
                  >
                    Giao dịch có trách nhiệm trong Binance Futures{' '}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '11px',
                      lineHeight: '13px',
                      color: '#7D6F6F',
                      marginTop: '6px',
                    }}
                  >
                    2023-05-22 09:28{' '}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      lineHeight: '18px',
                      marginTop: '12px',
                    }}
                  >
                    Hợp đồng giao dịch nên được lên kế hoạch tốt và cân nhắc kĩ
                    lưỡng. Để trở thành một trader thành công bạn phải giao dịch
                    có trách nhiệm. Tìm hiểu lí do giải thích tại sao giao dịch
                    có trách nhiệm lại quan trọng đối với thành công của bất kì
                    trader nào và tìm hiểu một số lời khuyên khi bắt đầu{' '}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Stack
                  direction="column"
                  sx={{
                    backgroundColor: 'background.mainContent',
                    padding: '12px',
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                      Thị trường
                    </Typography>
                    <IconButton href={ROUTERS.TRANSACTION}>
                      <ArrowCircleRightOutlinedIcon />
                    </IconButton>
                  </Stack>
                  {_renderTable()}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Tổng quan" />;
};

export default Overview;
