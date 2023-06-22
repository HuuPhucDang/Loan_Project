import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { UserRequestActions } from '../../../Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';
interface IProps {
  open: boolean;
  onClose(): void;
}

const schema = yup
  .object({
    username: yup.string().trim().required('Username is a required field'),
    message: yup.string().trim().required('Message is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { requestForgotPassword, resetUserRequestReducer } = UserRequestActions;

const ForgotPassword: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();
  const requestForgotPasswordSuccess = useSelector((state: RootState) =>
    _.get(state.USER_REQUEST, 'requestForgotPasswordSuccess')
  );
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (requestForgotPasswordSuccess) {
      reset();
      onClose();
      dispatch(resetUserRequestReducer());
    }
  }, [requestForgotPasswordSuccess]);

  const onSubmit = (data: any) => {
    dispatch(requestForgotPassword(data));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ color: 'text.primary' }}>Quên mật khẩu</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Để yêu cầu cấp lại mật khẩu. Vui lòng nhập email và thông tin liên lạc
          (Email, Số ĐT, Viber, ...) tại đây.
        </DialogContentText>
        <Stack direction="column">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                type="text"
                placeholder="Tên đăng nhập"
                sx={{
                  marginTop: '10px',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                  color: 'text.secondary',
                }}
                error={Boolean(errors?.username?.message)}
                helperText={errors?.username?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Thông tin liên lạc (Email, Số ĐT, Viber,...)"
                sx={{
                  marginTop: '10px',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                  color: 'text.secondary',
                }}
                error={Boolean(errors?.message?.message)}
                helperText={errors?.message?.message}
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
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
