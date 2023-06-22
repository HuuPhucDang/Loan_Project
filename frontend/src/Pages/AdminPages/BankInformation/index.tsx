import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AdminLayout } from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { SystemInfoActions } from '@/Reducers/Actions';

const schema = yup
  .object({
    fullname: yup.string().trim().required('Họ và tên là trường bắt buộc'),
    accountNumber: yup
      .string()
      .matches(/\d+/, 'Số tài khoản phải đúng định dạng số')
      .trim()
      .required('Số tài khoản là trường bắt buộc'),
    bankName: yup.string().trim().required('Tên ngân hàng là trường bắt buộc'),
    message: yup
      .string()
      .trim()
      .required('Chi nhánh ngân hàng là trường bắt buộc'),
    QRCode: yup
      .mixed()
      .test('required', 'Ảnh chân dung là trường bắt buộc', (file) => {
        const resolveFile: FileList = file as FileList;
        if (resolveFile && resolveFile.length > 0) return true;
        return false;
      })
      .required('Chi nhánh ngân hàng là trường bắt buộc'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { getSystemInfo, updateSystemInfo } = SystemInfoActions;

const BankInformation = () => {
  const dispatch = useTypedDispatch();
  const systemInfo: any = useSelector((state: RootState) =>
    _.get(state.SYSTEM_INFO, 'payload')
  );
  const [QRUrl, setQRUrl] = React.useState<string>('');

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    register,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      accountNumber: '',
      bankName: '',
      fullname: '',
      message: '',
    },
  });
  const QRCode: FileList | null = watch('QRCode') as FileList | null;

  React.useEffect(() => {
    dispatch(getSystemInfo());
  }, []);

  React.useEffect(() => {
    if (systemInfo?.id) {
      setValue('bankName', systemInfo?.bankName);
      setValue('fullname', systemInfo?.fullname);
      setValue('message', systemInfo?.message);
      setValue('accountNumber', systemInfo?.accountNumber);
      if (systemInfo?.QRUrl)
        setQRUrl(`data:image/*;base64,${systemInfo?.QRUrl}`);
    }
  }, [systemInfo]);

  React.useEffect(() => {
    if (QRCode && QRCode?.[0]) {
      const url = URL.createObjectURL(QRCode?.[0]);
      setQRUrl(url);
    }
  }, [QRCode]);

  const onSubmit = (data: any) => {
    if (systemInfo?.id) {
      const formData = new FormData();
      formData.append('bankName', data.bankName);
      formData.append('accountNumber', data.accountNumber);
      formData.append('fullname', data.fullname);
      formData.append('message', data.message);
      formData.append('QRCode', data.QRCode[0]);
      dispatch(updateSystemInfo(systemInfo.id, formData));
    }
  };

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}
        >
          Thông tin ngân hàng
        </Typography>
        <Grid container maxWidth="800px" spacing={4}>
          <Grid item xs={8}>
            <Stack component="form" direction="column" spacing={2}>
              <FormControl>
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      hiddenLabel
                      variant="outlined"
                      // size="small"
                      label="Họ và tên người nhận"
                      sx={{
                        ' .MuiInputBase-root': {
                          background: '#ffffff',
                        },
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: 'background.chargeInput',
                        },
                      }}
                      error={Boolean(errors?.fullname?.message)}
                      helperText={errors?.fullname?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="accountNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      hiddenLabel
                      variant="outlined"
                      // size="small"
                      label="Số tài khoản"
                      sx={{
                        ' .MuiInputBase-root': {
                          background: '#ffffff',
                        },
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: 'background.chargeInput',
                        },
                      }}
                      error={Boolean(errors?.accountNumber?.message)}
                      helperText={errors?.accountNumber?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="bankName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      hiddenLabel
                      variant="outlined"
                      // size="small"
                      label="Ngân hàng"
                      sx={{
                        ' .MuiInputBase-root': {
                          background: '#ffffff',
                        },
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: 'background.chargeInput',
                        },
                      }}
                      error={Boolean(errors?.bankName?.message)}
                      helperText={errors?.bankName?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      hiddenLabel
                      variant="outlined"
                      // size="small"
                      label="Nội dung"
                      sx={{
                        ' .MuiInputBase-root': {
                          background: '#ffffff',
                        },
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: 'background.chargeInput',
                        },
                      }}
                      error={Boolean(errors?.message?.message)}
                      helperText={errors?.message?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <input type="file" {...register('QRCode')} />
              {QRUrl ? (
                <Box
                  component="img"
                  src={QRUrl ? QRUrl : Assets.qrImage}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    marginTop: '16px',
                    aspectRatio: 1,
                  }}
                />
              ) : (
                <Typography sx={{ fontSize: '14px', marginTop: '10px' }}>
                  No image
                </Typography>
              )}
              {errors?.QRCode?.message ? (
                <Typography color="error" sx={{ fontSize: '14px' }}>
                  {errors?.QRCode?.message}
                </Typography>
              ) : null}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                color="yellowOrange"
                sx={{ textTransform: 'unset' }}
                onClick={handleSubmit(onSubmit)}
              >
                Cập nhật
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  };
  return (
    <AdminLayout content={_renderMain()} screenTitle="Thông tin ngân hàng" />
  );
};

export default BankInformation;
