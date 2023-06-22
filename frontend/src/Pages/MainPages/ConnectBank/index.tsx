import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  InputLabel,
  InputAdornment,
  Divider,
  TextField,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { BankActions, UserActions } from '@/Reducers/Actions';
import { useTypedDispatch } from '@/Reducers/store';
import { Utils } from '@/Libs';
import Assets from '@/Assets';

const schema = yup
  .object({
    fullname: yup.string().trim().required('Họ và tên là trường bắt buộc'),
    accountNumber: yup
      .string()
      .matches(/\d+/, 'Số tài khoản phải đúng định dạng số')
      .trim()
      .required('Số tài khoản là trường bắt buộc'),
    bankName: yup.string().trim().required('Tên ngân hàng là trường bắt buộc'),
    bankAddress: yup
      .string()
      .trim()
      .required('Chi nhánh ngân hàng là trường bắt buộc'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { activeBankCard } = BankActions;
const { getSelf } = UserActions;

const ConnectBank: React.FC = () => {
  // Constructors
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    dispatch(getSelf());
  }, []);

  const onSubmit = (data: FormData) => dispatch(activeBankCard(data));

  const _renderForm = () => {
    return (
      <>
        <Box
          component="form"
          sx={{
            padding: '6px 50px 45px 27px',
            backgroundColor: 'background.mainContent',
          }}
        >
          <Stack direction="column">
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Họ và tên
            </InputLabel>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Họ và tên"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: '32px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <ContactEmergencyIcon sx={{ fontSize: '18px' }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.fullname?.message)}
                  helperText={errors?.fullname?.message}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack direction="column" marginTop="13px">
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Số tài khoản
            </InputLabel>
            <Controller
              name="accountNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Số tài khoản *"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: '32px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <CreditCardIcon sx={{ fontSize: '18px' }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.accountNumber?.message)}
                  helperText={errors?.accountNumber?.message}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack direction="column" marginTop="13px">
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Ngân hàng
            </InputLabel>
            <Controller
              name="bankName"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Ngân hàng"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: '32px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <AccountBalanceIcon sx={{ fontSize: '18px' }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.bankName?.message)}
                  helperText={errors?.bankName?.message}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack direction="column" marginTop="13px">
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Chi nhánh ngân hàng
            </InputLabel>
            <Controller
              name="bankAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Chi nhánh ngân hàng"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: '32px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <CommentBankIcon sx={{ fontSize: '18px' }} />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.bankAddress?.message)}
                  helperText={errors?.bankAddress?.message}
                  {...field}
                />
              )}
            />
          </Stack>
        </Box>
        <Stack direction="row" alignItems="center" padding="16px 16px 8px 16px">
          <GppGoodIcon sx={{ marginRight: '10px', color: '#545454' }} />
          <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>
            Mọi thông tin của bạn đều được bảo mật theo tiêu chuẩn quốc tế PCI
            DSSDSS
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="flex-end">
          <Button
            size="small"
            sx={{
              fontSize: '12px',
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: '34px',
              padding: '0 15px',
              width: '148px',
              fontWeight: 600,
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Lưu thông tin
          </Button>
        </Stack>
      </>
    );
  };

  const _renderCard = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          width: 'max-content',
          maxHeight: 'max-content',
        }}
      >
        <Box
          src={Assets.bankCardImage}
          component="img"
          sx={{ width: '100%', maxWidth: '450px' }}
        />
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            top: '13%',
            left: '30%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData.bank.fullname}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            top: '44%',
            left: '30%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData?.bank?.accountNumber}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            bottom: '24%',
            left: '30%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData?.wallet?.balance || 0} USDT
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '13%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData?.bank?.bankName}
          </Typography>
        </Stack>
      </Box>
    );
  };

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
          <Grid item xs={12} md={10} borderLeft="1px solid #949494" padding="19px 50px 9px 32px">
            <Stack
              component="form"
              direction="column"
              sx={{
                paddingRight: {
                  xs: 0,
                  md: '30px',
                },
                margin: {
                  xs: '10px',
                  md: 0,
                },
                width: {
                  xs: 'calc(100% - 20px)',
                  md: '100%',
                },
              }}
            >
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                Liên kết tài khoản ngân hàng
              </Typography>
              <Divider sx={{ marginTop: '6px', marginBottom: '15px' }} />

              <Stack direction="column" paddingRight="30px">
                {userData?.bank ? _renderCard() : _renderForm()}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return (
    <UserLayout
      content={renderMain()}
      screenTitle="Liên kết tài khoản ngân hàng"
    />
  );
};

export default ConnectBank;
