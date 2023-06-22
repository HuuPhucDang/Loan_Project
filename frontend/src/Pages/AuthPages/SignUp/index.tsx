import { Button, Stack, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTypedDispatch } from '@/Reducers/store';
import { AuthActions } from '@/Reducers/Actions';
// import AuthLayout from '@/Components/DefaultLayout/AuthLayout';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Utils } from '../../../Libs';
import { ROUTERS } from '../../../Constants';

const schema = yup
  .object({
    username: yup
      .string()
      .matches(
        /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|^([0-9]{10})$/,
        'Username must be valid phone or email'
      )
      .trim()
      .required('Username is a required field'),
    password: yup
      .string()
      .min(8, 'Password must be least at 8 characters')
      .matches(/[a-z]+/, 'Password must be contain 1 lowercase character')
      .matches(/\d+/, 'Password must be contain 1 number')
      .trim()
      .required('Password is a required field'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Confirm password must match')
      .min(8, 'Confirm password must be least at 8 characters')
      .trim()
      .required('Confirm password is a required field'),
    inviteCode: yup.string().trim().required('Invite code is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
const { register } = AuthActions;

const SignUp = () => {
  const dispatch = useTypedDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const buttonRef = React.useRef<any>(null);

  // React.useEffect(() => {
  //   if (isLogged) Utils.redirect(ROUTERS.TRANSACTION);
  // }, [isLogged]);

  const onSubmit = (data: FormData) => dispatch(register(data));

  const onEnter = (e: any) => {
    if (
      e.key === 'Enter' ||
      (e.keyCode === 13 && buttonRef && buttonRef.current)
    ) {
      buttonRef.current.click();
    }
  };

  const _renderMain = () => {
    return (
      <>
        <Helmet>
          <title>Đăng ký</title>
        </Helmet>
        <Stack
          direction="column"
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '30px 15px',
            minWidth: '300px',
          }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}
          >
            Đăng ký
          </Typography>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Email, Số ĐT *"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.username?.message)}
                helperText={errors?.username?.message}
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
                type="password"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.password?.message)}
                helperText={errors?.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Xác nhận mật khẩu *"
                type="password"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.confirmPassword?.message)}
                helperText={errors?.confirmPassword?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="inviteCode"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mã mời *"
                sx={{
                  marginTop: '10px',
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.inviteCode?.message)}
                helperText={errors?.inviteCode?.message}
                {...field}
              />
            )}
          />
          <Button
            variant="contained"
            sx={{
              marginTop: '10px',
              backgroundColor: 'background.burntSienna',
              ':hover': {
                backgroundColor: 'background.burntSienna',
                filter: 'brightness(0.95)',
              },
            }}
            ref={buttonRef}
            onClick={handleSubmit(onSubmit)}
          >
            Đăng ký
          </Button>
          <Typography
            sx={{
              fontSize: '14px',
              textDecoration: 'underline',
              textAlign: 'center',
              color: 'text.primary',
              marginTop: '2em',
              ':hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => Utils.redirect(ROUTERS.SIGN_IN)}
          >
            Đăng nhập
          </Typography>
        </Stack>
      </>
    );
  };

  return _renderMain();
};

export default SignUp;
