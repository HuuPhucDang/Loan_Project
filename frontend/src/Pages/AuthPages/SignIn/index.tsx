import React from 'react';
import _ from 'lodash';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTypedDispatch, useTypedSelector } from '@/Reducers/store';
import { AuthActions } from '@/Reducers/Actions';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import { ForgotPassword } from '@/Components/Popup';
// import AuthLayout from '@/Components/DefaultLayout/AuthLayout';
import { Helmet } from 'react-helmet-async';

const { login } = AuthActions;

const schema = yup
  .object({
    username: yup.string().trim().required('Username is a required field'),
    password: yup.string().trim().required('Password is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const SignIn = () => {
  const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false);
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
  const buttonRef = React.useRef<any>(null);
  const token = Utils.getUserData();
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  React.useEffect(() => {
    if (isLogged && token && userData) Utils.redirect(ROUTERS.TRANSACTION);
  }, [isLogged]);

  const onSubmit = (data: FormData) => dispatch(login(data));

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
          <title>Đăng nhập</title>
        </Helmet>
        <ForgotPassword
          open={isShowPopup}
          onClose={() => setIsShowPopup(false)}
        />
        <Stack
          component="form"
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
            Đăng nhập
          </Typography>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Email"
                autoComplete="username"
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
                placeholder="Mật khẩu"
                type="password"
                autoComplete="current-password"
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              marginTop: '0.5em',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                textDecoration: 'underline',
                textAlign: 'center',
                color: 'text.primary',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => setIsShowPopup(true)}
            >
              Quên mật khẩu
            </Typography>
          </Stack>
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
            Đăng nhập
          </Button>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              marginTop: '2em',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                textDecoration: 'underline',
                textAlign: 'center',
                color: 'text.primary',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => Utils.redirect(ROUTERS.HOME)}
            >
              Trang chủ
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                textDecoration: 'underline',
                textAlign: 'center',
                color: 'text.primary',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => Utils.redirect(ROUTERS.SIGN_UP)}
            >
              Đăng ký
            </Typography>
          </Stack>
        </Stack>
      </>
    );
  };

  return _renderMain();
};

export default SignIn;
