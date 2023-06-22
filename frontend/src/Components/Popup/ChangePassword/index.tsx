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
    newPassword: yup
      .string()
      .min(8, 'New password must be least at 8 characters')
      .matches(/[a-z]+/, 'New password must be contain 1 lowercase character')
      .matches(/\d+/, 'New password must be contain 1 number')
      .trim()
      .required('New password is a required field'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Confirm new password must match')
      .min(8, 'Confirm new password must be least at 8 characters')
      .trim()
      .required('Confirm new password is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { changePassword, resetSecurityReducer } = SecurityActions;

const EditName: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();
  const isSubmitPasswordSuccess: boolean = useSelector((state: RootState) =>
    _.get(state.SECURITY, 'isSubmitPasswordSuccess')
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (isSubmitPasswordSuccess) {
      reset();
      setValue("password", "");
      setValue("newPassword", "");
      setValue("confirmNewPassword", "");
      onClose();
      dispatch(resetSecurityReducer());
    }
  }, [isSubmitPasswordSuccess]);

  const onSubmit = (data: FormData) => dispatch(changePassword(data));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Chỉnh sửa mật khẩu
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
                placeholder="Mật khẩu cũ *"
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
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mật khẩu mới *"
                type="password"
                autoComplete='newpassword'
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                error={Boolean(errors?.newPassword?.message)}
                helperText={errors?.newPassword?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Xác nhận mật khẩu mới *"
                type="password"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                error={Boolean(errors?.confirmNewPassword?.message)}
                helperText={errors?.confirmNewPassword?.message}
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

export default EditName;
