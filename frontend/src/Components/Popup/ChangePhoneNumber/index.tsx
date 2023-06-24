import * as React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';

import { RootState, useTypedDispatch } from '@/Reducers/store';
import { SecurityActions } from '@/Reducers/Actions';
import { Utils } from '@/Libs';

interface IProps {
  open: boolean;
  onClose(): void;
}

const schema = yup
  .object({
    phonenumber: yup
      .string()
      .matches(/^([0-9]{10})$/)
      .trim()
      .required('Phone number is a required field'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const { resetSecurityReducer } = SecurityActions;

const VerifyPhoneNumber: React.FC<IProps> = ({ open = false, onClose }) => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const isSubmitPhoneNumberSuccess: boolean = useSelector((state: RootState) =>
    _.get(state.SECURITY, 'isSubmitPhoneNumberSuccess')
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
    if (isSubmitPhoneNumberSuccess) {
      setValue('phonenumber', '');
      reset();
      onClose();
      dispatch(resetSecurityReducer());
    }
  }, [isSubmitPhoneNumberSuccess]);

  // const onSubmit = (data: FormData) => {
  //   dispatch(verifyPhoneNumber(data));
  // };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: 'text.primary' }}>
        {userData?.security?.phonenumber
          ? 'Chỉnh sửa số điện thoại'
          : 'Kích hoạt số điện thoại'}
      </DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Controller
            name="phonenumber"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Số điện thoại *"
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

export default VerifyPhoneNumber;
