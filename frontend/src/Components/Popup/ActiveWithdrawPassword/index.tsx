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
    withdrawPassword: yup
      .string()
      .min(8, 'Withdraw password must be least at 8 characters')
      .matches(/\d+/, 'Withdraw password must be contain 1 number')
      .trim()
      .required('Withdraw password is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { activeWithdrawPassword, resetSecurityReducer } = SecurityActions;

const ActiveWithdrawPassword: React.FC<IProps> = ({
  open = false,
  onClose,
}) => {
  const dispatch = useTypedDispatch();
  const isSubmitWithdrawPasswordSuccess: boolean = useSelector(
    (state: RootState) =>
      _.get(state.SECURITY, 'isSubmitWithdrawPasswordSuccess')
  );

  const {
    handleSubmit,
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
      setValue('withdrawPassword', '');
      reset();
      onClose();
      dispatch(resetSecurityReducer());
    }
  }, [isSubmitWithdrawPasswordSuccess]);

  const onSubmit = (data: FormData) => dispatch(activeWithdrawPassword(data));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Kích hoạt mật khẩu rút tiền
      </DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mật khẩu *"
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
            name="withdrawPassword"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mật khẩu rút tiền *"
                type="password"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                error={Boolean(errors?.withdrawPassword?.message)}
                helperText={errors?.withdrawPassword?.message}
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
          onClick={handleSubmit(onSubmit)}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActiveWithdrawPassword;
