import React from 'react';
import {
  Grid,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import Assets from '@/Assets';
import {
  ActiveWithdrawPassword,
  ChangeWithdrawPassword,
  ChangeEmail,
  ChangePassword,
  ChangePhoneNumber,
  ActiveEmail,
} from '@/Components/Popup';
import { Utils } from '@/Libs';
import { useTypedDispatch } from '@/Reducers/store';
import { UserActions } from '@/Reducers/Actions';

const { getSelf } = UserActions;

const Security: React.FC = () => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const security = userData?.security;
  // Constructors
  const [isShowChangePassword, setIsShowChangePassword] =
    React.useState<boolean>(false);
  const [isShowChangePhoneNumber, setIsShowChangePhoneNumber] =
    React.useState<boolean>(false);
  const [isShowChangeEmail, setIsShowChangeEmail] =
    React.useState<boolean>(false);
  const [isShowChangeWithdrawPassword, setIsShowChangeWithdrawPassword] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getSelf());
  }, []);

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: {
            xs: 0,
            // md: '1em 0',
          },
          mx: 'auto',
          // maxWidth: '971px',
        }}
      >
        <ChangePassword
          open={isShowChangePassword}
          onClose={() => setIsShowChangePassword(false)}
        />
        <ChangePhoneNumber
          open={isShowChangePhoneNumber}
          onClose={() => setIsShowChangePhoneNumber(false)}
        />
        <ChangeEmail
          open={security?.email && security?.email && isShowChangeEmail}
          onClose={() => setIsShowChangeEmail(false)}
        />
        <ActiveEmail
          open={!security?.email && isShowChangeEmail}
          onClose={() => setIsShowChangeEmail(false)}
        />
        <ActiveWithdrawPassword
          open={!security?.isVerified && isShowChangeWithdrawPassword}
          onClose={() => setIsShowChangeWithdrawPassword(false)}
        />
        <ChangeWithdrawPassword
          open={security?.isVerified && isShowChangeWithdrawPassword}
          onClose={() => setIsShowChangeWithdrawPassword(false)}
        />
        <Grid container>
          <Grid
            item
            xs={12}
            md={2}
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
            padding="19px 32px 19px 32px"
          >
            <Stack direction="column">
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
                >
                  Bảo mật
                </Typography>
                <Box
                  component="img"
                  src={
                    userData?.security?.isVerified
                      ? Assets.successSecurityImage
                      : Assets.securityIcon
                  }
                />
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'background.securityNotification',
                  padding: '10px 14px',
                  marginTop: '11px ',
                  minHeight: '45px',
                  borderRadius: '5px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: 'text.primary',
                  }}
                >
                  Để tăng tính bảo mật cho tài khoản, bạn nên bật tính năng 2FA,
                  bao gồm cả Binance/Google Authenticator.
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '28px',
                  marginTop: '30px',
                }}
              >
                Bảo mật nâng cao{' '}
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ marginTop: '10px', boxShadow: 'none' }}
              >
                <Table
                  size="small"
                  sx={{
                    minWidth: '100%',
                    backgroundColor: 'background.default',
                  }}
                  aria-label="simple table"
                >
                  <TableBody>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ paddingX: 0 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          padding="6px 0"
                        >
                          <Box sx={{ width: '40px' }}>
                            <Box
                              component="img"
                              src={Assets.passwordIcon}
                              sx={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                                marginLeft: '-10px',
                              }}
                            />
                          </Box>
                          <Stack
                            direction="column"
                            sx={{ marginLeft: '10px', flex: 1 }}
                          >
                            <Typography
                              sx={{
                                fontSize: '12px',
                                lienHeight: '20px',
                                fontWeight: 600,
                                color: 'text.primary',
                              }}
                            >
                              Mật khẩu đăng nhập
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '11px',
                                lienHeight: '20px',
                                fontWeight: 400,
                              }}
                            >
                              Mật khẩu đăng nhập được dùng để đăng nhập vào tài
                              khoản của bạn
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            fontSize: '10px',
                            lineHeight: '24px',
                            color: 'text.primary',
                          }}
                        ></Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ padding: '24px 0' }}>
                        <Button
                          sx={{
                            fontSize: '11px',
                            textTransform: 'unset',
                            backgroundColor: 'background.lightSilver',
                            color: 'text.secondary',
                            width: '73px',
                            minHeight: '23px',
                            padding: '0',
                          }}
                          onClick={() => setIsShowChangePassword(true)}
                        >
                          Thay đổi
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ paddingX: 0 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          padding="6px 0"
                        >
                          <Box sx={{ width: '40px' }}>
                            <Box
                              component="img"
                              src={Assets.phoneVerifyIcon}
                              sx={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                                marginLeft: '-10px',
                              }}
                            />
                          </Box>
                          <Stack
                            direction="column"
                            sx={{ marginLeft: '10px', flex: 1 }}
                          >
                            <Typography
                              sx={{
                                fontSize: '12px',
                                lienHeight: '20px',
                                fontWeight: 600,
                                color: 'text.primary',
                              }}
                            >
                              Xác minh qua số điện thoại
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '11px',
                                lienHeight: '20px',
                                fontWeight: 400,
                              }}
                            >
                              Bảo vệ tài khoản và giao dịch của bạn.
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            fontSize: '10px',
                            lineHeight: '24px',
                            color: 'text.primary',
                          }}
                        >
                          {userData?.security?.phonenumber ? (
                            <Stack flexDirection="row" alignItems="center">
                              <CheckCircleIcon
                                color="success"
                                sx={{ fontSize: '18px' }}
                              />
                              <Typography
                                sx={{ fontSize: '10px', marginLeft: '5px' }}
                              >
                                {userData?.security?.phonenumber}
                              </Typography>
                            </Stack>
                          ) : (
                            <Stack flexDirection="row" alignItems="center">
                              <CancelIcon
                                color="disabled"
                                sx={{ fontSize: '18px' }}
                              />
                              <Typography
                                sx={{ fontSize: '10px', marginLeft: '5px' }}
                              >
                                Chưa liên kết
                              </Typography>
                            </Stack>
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ padding: '24px 0' }}>
                        <Button
                          sx={{
                            fontSize: '11px',
                            textTransform: 'unset',
                            backgroundColor: 'background.lightSilver',
                            color: 'text.secondary',
                            width: '73px',
                            minHeight: '23px',
                            padding: '0',
                          }}
                          onClick={() => setIsShowChangePhoneNumber(true)}
                        >
                          {userData?.security?.phonenumber
                            ? 'Thay đổi'
                            : 'Kích hoat'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ paddingX: 0 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          padding="6px 0"
                        >
                          <Box sx={{ width: '40px' }}>
                            <Box
                              component="img"
                              src={Assets.mailVerifyIcon}
                              sx={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                                marginLeft: '-10px',
                              }}
                            />
                          </Box>
                          <Stack
                            direction="column"
                            sx={{ marginLeft: '10px', flex: 1 }}
                          >
                            <Typography
                              sx={{
                                fontSize: '12px',
                                lienHeight: '20px',
                                fontWeight: 600,
                                color: 'text.primary',
                              }}
                            >
                              Xác minh qua địa chỉ email
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '11px',
                                lienHeight: '20px',
                                fontWeight: 400,
                              }}
                            >
                              Bảo vệ tài khoản và giao dịch của bạn.
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            fontSize: '10px',
                            lineHeight: '24px',
                            color: 'text.primary',
                          }}
                        >
                          {userData?.security?.email ? (
                            <Stack flexDirection="row" alignItems="center">
                              <CheckCircleIcon
                                color="success"
                                sx={{ fontSize: '18px' }}
                              />
                              <Typography
                                sx={{ fontSize: '10px', marginLeft: '5px' }}
                              >
                                {userData?.security?.email}
                              </Typography>
                            </Stack>
                          ) : (
                            <Stack flexDirection="row" alignItems="center">
                              <CancelIcon
                                color="disabled"
                                sx={{ fontSize: '18px' }}
                              />
                              <Typography
                                sx={{ fontSize: '10px', marginLeft: '5px' }}
                              >
                                Chưa liên kết
                              </Typography>
                            </Stack>
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ padding: '24px 0' }}>
                        <Button
                          sx={{
                            fontSize: '11px',
                            textTransform: 'unset',
                            backgroundColor: 'background.lightSilver',
                            color: 'text.secondary',
                            width: '73px',
                            minHeight: '23px',
                            padding: '0',
                          }}
                          onClick={() => setIsShowChangeEmail(true)}
                        >
                          {userData?.security?.email ? 'Thay đổi' : 'Kích hoat'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ paddingX: 0 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          padding="6px 0"
                        >
                          <Box sx={{ width: '40px' }}>
                            <Box
                              component="img"
                              src={Assets.otpIcon}
                              sx={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                                marginLeft: '-10px',
                              }}
                            />
                          </Box>
                          <Stack
                            direction="column"
                            sx={{ marginLeft: '10px', flex: 1 }}
                          >
                            <Typography
                              sx={{
                                fontSize: '12px',
                                lienHeight: '20px',
                                fontWeight: 600,
                                color: 'text.primary',
                              }}
                            >
                              Mật khẩu rút tiền
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '11px',
                                lienHeight: '20px',
                                fontWeight: 400,
                              }}
                            >
                              Bảo vệ tài khoản và giao dịch của bạn.Mật khẩu
                              được yêu cầu mỗi khi thực hiện thao tác rút tiền.
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            fontSize: '10px',
                            lineHeight: '24px',
                            color: 'text.primary',
                          }}
                        >
                          {userData?.security?.isVerified ? (
                            <Stack flexDirection="row" alignItems="center">
                              <CheckCircleIcon
                                color="success"
                                sx={{ fontSize: '18px' }}
                              />
                              <Typography
                                sx={{ fontSize: '10px', marginLeft: '5px' }}
                              >
                                Đã kích hoạt
                              </Typography>
                            </Stack>
                          ) : (
                            <Stack flexDirection="row" alignItems="center">
                              <CancelIcon
                                color="disabled"
                                sx={{ fontSize: '18px' }}
                              />
                              <Typography
                                sx={{ fontSize: '10px', marginLeft: '5px' }}
                              >
                                Chưa kích hoạt
                              </Typography>
                            </Stack>
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ padding: '24px 0' }}>
                        <Button
                          sx={{
                            fontSize: '11px',
                            textTransform: 'unset',
                            backgroundColor: 'background.lightSilver',
                            color: 'text.secondary',
                            width: '73px',
                            minHeight: '23px',
                            padding: '0',
                          }}
                          onClick={() => setIsShowChangeWithdrawPassword(true)}
                        >
                          {userData?.security?.isVerified
                            ? 'Thay đổi'
                            : 'Kích hoat'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Bảo mật" />;
};

export default Security;
