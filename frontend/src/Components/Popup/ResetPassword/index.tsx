import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography } from '@mui/material';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { UserActions } from '../../../Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IProps {
  user: any;
  open: boolean;
  onClose(): void;
}

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, 'Password must be least at 8 characters')
      .matches(/[a-z]+/, 'Password must be contain 1 lowercase character')
      .matches(/\d+/, 'Password must be contain 1 number')
      .trim()
      .required('Password is a required field'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const { updatePassword, resetUserReducer } = UserActions;

const ActiveEmail: React.FC<IProps> = ({ open = false, onClose, user }) => {
  const dispatch = useTypedDispatch();
  const isUpdatePasswordSuccess: boolean = useSelector((state: RootState) =>
    _.get(state.USER, 'isUpdatePasswordSuccess')
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
    if (!open) reset();
  }, [open]);

  React.useEffect(() => {
    if (isUpdatePasswordSuccess) {
      onClose();
      dispatch(resetUserReducer());
    }
  }, [isUpdatePasswordSuccess]);

  const onSubmit = (data: FormData) => {
    if (user)
      dispatch(updatePassword({ password: data.password, userId: user.id }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Chỉnh sửa mật khẩu
      </DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Typography>
            Người dùng: <b>{user?.nickname}</b>
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mật khẩu *"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                // type="password"
                error={Boolean(errors?.password?.message)}
                helperText={errors?.password?.message}
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

export default ActiveEmail;
