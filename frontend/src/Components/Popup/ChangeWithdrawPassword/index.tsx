import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { SecurityActions } from '@/Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
interface IProps {
  open: boolean;
  onClose(): void;
}

const schema = yup
  .object({
    password: yup.string().trim().required('Password is a required field'),
    email: yup
      .string()
      .email()
      .required('Withdraw password is a required field'),
    phonenumber: yup
      .string()
      .trim()
      .matches(/^([0-9]{10})$/)
      .required('Phone number is a required field'),
    newWithdrawPassword: yup
      .string()
      .min(8, 'Withdraw password must be least at 8 characters')
      .matches(/\d+/, 'Withdraw password must be contain 1 number')
      .trim()
      .required('Withdraw password is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const {  resetSecurityReducer } = SecurityActions;

const ChangeWithdrawPassword: React.FC<IProps> = ({
  open = false,
  onClose,
}) => {
  const dispatch = useTypedDispatch();
  const isSubmitWithdrawPasswordSuccess: boolean = useSelector(
    (state: RootState) =>
      _.get(state.SECURITY, 'isSubmitWithdrawPasswordSuccess')
  );

  const {
    // handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (isSubmitWithdrawPasswordSuccess) {
      setValue('password', '');
      setValue('email', '');
      setValue('phonenumber', '');
      setValue('newWithdrawPassword', '');
      reset();
      onClose();
      dispatch(resetSecurityReducer());
    }
  }, [isSubmitWithdrawPasswordSuccess]);

  // const onSubmit = (data: FormData) => dispatch(changeWithdrawPassword(data));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Thay đổi mật khẩu rút tiền
      </DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Email *"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                error={Boolean(errors?.email?.message)}
                helperText={errors?.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="phonenumber"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Phone number *"
                autoComplete='phone'
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                error={Boolean(errors?.phonenumber?.message)}
                helperText={errors?.phonenumber?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mật khẩu đăng nhập *"
                type="password"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                error={Boolean(errors?.password?.message)}
                helperText={errors?.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="newWithdrawPassword"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mật khẩu rút tiền mới *"
                type="password"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                error={Boolean(errors?.newWithdrawPassword?.message)}
                helperText={errors?.newWithdrawPassword?.message}
                {...field}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: 'unset' }} onClick={onClose} color="error">
          Hủy
        </Button>
        <Button
          sx={{
            textTransform: 'unset',
            backgroundColor: 'background.burntSienna',
          }}
          variant="contained"
          // onClick={handleSubmit(onSubmit)}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeWithdrawPassword;
