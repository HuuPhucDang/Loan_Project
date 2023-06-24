import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Grid,
  Button,
  Stack,
  FormControl,
  // InputLabel,
  // Select,
  Typography,
  Box,
  // MenuItem,
  TextField,
  // FormHelperText,
  InputAdornment,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import CurrencyInput from 'react-currency-input-field';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { TransactionActions, UserActions } from '@/Reducers/Actions';
import { Utils } from '@/Libs';
// import Placeholder from 'react-select/dist/declarations/src/components/Placeholder';

const { getSelf } = UserActions;
const { requestWithdraw, resetTransactionReducer } = TransactionActions;

const schema = yup
  .object({
    withdrawPassword: yup
      .string()
      .trim()
      .required('Withdraw password is a required field'),
    amount: yup
      .number()
      .min(1, 'Amount must be greater than 0')
      .required('Amount is a required field'),
    bank: yup.string().trim().required('Bank is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const WithdrawMoney: React.FC = () => {
  // Constructors
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();
  const requestWithdrawSuccess = useSelector((state: RootState) =>
    _.get(state.TRANSACTION, 'requestWithdrawSuccess')
  );
  // const [enchangeRate, setEnchangeRate] = React.useState<number>(0);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    // watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
      bank: '',
      withdrawPassword: '',
    },
  });

  // const amount = watch('amount');
  // const bank = watch('bank');

  React.useEffect(() => {
    dispatch(getSelf());
    // Utils.WebSocket.emit(
    //   'exchangeCurrency',
    //   { symbol: 'USDTVND' },
    //   (data: any) => {
    //     setEnchangeRate(data || 0);
    //   }
    // );
  }, []);

  React.useEffect(() => {
    if (requestWithdrawSuccess) {
      reset();
      setValue('amount', 0);
      setValue('bank', '');
      setValue('withdrawPassword', '');
      dispatch(resetTransactionReducer());
    }
  }, [requestWithdrawSuccess]);

  const onSubmit = (data: any) => {
    dispatch(
      requestWithdraw({
        amount: data.amount,
        withdrawPassword: data.withdrawPassword,
      })
    );
  };

  // const withdrawMoneyType = React.useMemo(() => {
  //   const bank = userData?.bank;
  //   if (bank)
  //     return (
  //       <MenuItem value={bank?.id}>
  //         {bank?.bankName} - {bank?.fullname} - {bank?.accountNumber}
  //       </MenuItem>
  //     );
  //   return <MenuItem disabled>Không có phương thức nhận tiền</MenuItem>;
  // }, [userData]);

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
        <Grid container>
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
          <Grid item xs={12} md={10} borderLeft="1px solid #949494" padding="19px 32px 19px 32px">
            <Stack direction="column" sx={{ p: 0 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  fontWeight: 600,
                }}
              >
                Rút tiền
              </Typography>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    hiddenLabel
                    variant="outlined"
                    size="small"
                    placeholder="USDT"
                    sx={{
                      ' .MuiInputBase-root': {
                        padding: '0',
                        backgroundColor: 'background.chargeInput',
                        color: 'text.primary',
                      },
                      input: {
                        height: '59px',
                        boxSizing: 'border-box',
                        padding: '0 35px',
                      },
                    }}
                    autoComplete="new-password"
                    type="number"
                    InputProps={{
                      sx: {
                        height: '59px',
                        fontSize: '15px',
                        paddingLeft: '22px',
                        marginTop: '20px',
                        backgroundColor: 'background.chargeInput',
                        color: 'text.primary',
                        borderRadius: '3px',
                      },
                      endAdornment: (
                        <InputAdornment position="start">
                          <Typography sx={{ fontSize: '13px' }}>
                            Số dư {userData?.wallet?.balance.toFixed(2) || 0} USDT
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors?.amount?.message)}
                    helperText={errors?.amount?.message}
                    {...field}
                    onBlur={(event: any) => {
                      let resolveValue = 0;
                      if (!event.target.value) resolveValue = 0;
                      else if (
                        !Number.isNaN(event.target.value) &&
                        event.target.value > userData?.wallet?.balance
                      )
                        resolveValue = userData?.wallet?.balance;
                      field.onChange(resolveValue);
                    }}
                  />
                )}
              />
              <Controller
                name="withdrawPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    hiddenLabel
                    variant="outlined"
                    size="small"
                    placeholder="Mật khẩu rút tiền"
                    sx={{
                      ' .MuiInputBase-root': {
                        padding: '0',
                        backgroundColor: 'background.chargeInput',
                        color: 'text.primary',
                      },
                      input: {
                        height: '59px',
                        boxSizing: 'border-box',
                        padding: '0 35px',
                      },
                    }}
                    autoComplete="new-password"
                    type="password"
                    InputProps={{
                      sx: {
                        height: '59px',
                        fontSize: '15px',
                        paddingLeft: '22px',
                        marginTop: '20px',
                        backgroundColor: 'background.chargeInput',
                        color: 'text.primary',
                        borderRadius: '3px',
                      },
                    }}
                    error={Boolean(errors?.withdrawPassword?.message)}
                    helperText={errors?.withdrawPassword?.message}
                    {...field}
                  />
                )}
              />
              <FormControl fullWidth sx={{ marginTop: '20px' }}>
                {/* <Controller
                  control={control}
                  name="bank"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors?.bank?.message)}>
                      <Select
                        placeholder="Phương thức nhận tiền"
                        sx={{
                          backgroundColor: 'background.chargeInput',
                          color: 'text.primary',
                          borderRadius: '3px',
                          padding: '0 22px',
                          ' >': { borderRadius: '3px' },
                          border: 'none',
                        }}
                        displayEmpty
                        renderValue={
                          bank !== ''
                            ? undefined
                            : () => (
                                <Typography>Phương thức nhận tiền</Typography>
                              )
                        }
                        {...field}
                      >
                        {withdrawMoneyType}
                      </Select>
                      {errors?.bank?.message ? (
                        <FormHelperText>{errors?.bank?.message}</FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                /> */}
              </FormControl>
              <Button
                sx={{
                  backgroundColor: 'background.burntSienna',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: '43px',
                  width: '265px',
                  fontWeight: 500,
                  fontSize: '15px',
                  marginTop: '22px',
                  alignSelf: 'center',
                }}
                // disabled={!bank || !amount}
                onClick={handleSubmit(onSubmit)}
              >
                Rút tiền
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Rút tiền" />;
};

export default WithdrawMoney;
