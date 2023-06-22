import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { SecurityActions } from '../../../Reducers/Actions';
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
    email: yup.string().email().trim().required('Email is a required field'),
    password: yup.string().trim().required('Password is a required field'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const { activeEmail, resetSecurityReducer } = SecurityActions;

const ActiveEmail: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();
  const isSubmitEmailSuccess: boolean = useSelector((state: RootState) =>
    _.get(state.SECURITY, 'isSubmitEmailSuccess')
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
    if (isSubmitEmailSuccess) {
      setValue("email", "");
      setValue("password", "");
      reset();
      onClose();
      dispatch(resetSecurityReducer());
    }
  }, [isSubmitEmailSuccess]);

  const onSubmit = (data: FormData) => {
    dispatch(activeEmail(data));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>Kích hoạt email</DialogTitle>
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
                type="password"
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
