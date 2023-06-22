import React from 'react';
import {
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Avatar,
  Divider,
  Box,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { UploadAvatar, UploadIDCard } from '@/Components/Popup';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { UserActions } from '@/Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const { getSelf } = UserActions;

const Verify: React.FC = () => {
  // Constructors
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const details = useSelector((state: RootState) =>
    _.get(state.USER, 'details')
  );
  const [isShowUploadIDCardPopup, setIsShowUploadIDCardPopup] =
    React.useState<boolean>(false);
  const [isShowAvatarPopup, setIsShowAvatarPopup] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getSelf());
  }, []);

  const _renderUnverifyField = React.useMemo(() => {
    return (
      <Stack direction="column">
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '28px',
            fontWeight: 400,
          }}
        >
          {userData?.verification?.status === 'pending' &&
          userData?.verification?.backImageUrl &&
          userData?.verification?.frontImageUrl &&
          userData?.verification?.selfieImageUrl
            ? 'Danh tính của bạn đang được xác minh!'
            : `${
                userData?.verification?.status === 'denied'
                  ? 'Xác minh của bạn đã bị từ chối. Vui lòng xác minh lại!'
                  : 'Xác minh danh tính của bạn để mua và giao dịch trên Binance.'
              }`}
        </Typography>
        <Stack direction="row" marginTop="20px">
          <Button
            size="small"
            sx={{
              fontSize: '10px',
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: '30px',
              padding: '0 15px',
              marginRight: '20px',
              width: '187px',
              fontWeight: 400,
            }}
            disabled={
              userData?.verification?.backImageUrl &&
              userData?.verification?.frontImageUrl &&
              userData?.verification?.status === 'pending'
            }
            onClick={() => setIsShowUploadIDCardPopup(true)}
          >
            Cập nhật thẻ CCCD/CMND
          </Button>
          <Button
            size="small"
            sx={{
              fontSize: '10px',
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: '30px',
              padding: '0 15px',
              width: '187px',
              fontWeight: 400,
            }}
            onClick={() => setIsShowAvatarPopup(true)}
            disabled={
              userData?.verification?.selfieImageUrl &&
              userData?.verification?.status === 'pending'
            }
          >
            Cập nhật ảnh chân dung
          </Button>
        </Stack>
      </Stack>
    );
  }, [details]);

  const _renderVerifiedField = () => {
    return (
      <Stack direction="column">
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '28px',
            fontWeight: 400,
          }}
        >
          {userData?.verification?.status === 'approved' && (
            <>
              Danh tính của bạn đã được xác minh danh tính. Bạn có thể bắt đầu{' '}
              <Link
                href={ROUTERS.TRANSACTION}
                sx={{ textDecoration: 'underline', color: "text.primary" }}
              >
                giao dịch trên Binance
              </Link>
              .
            </>
          )}
          {userData?.verification?.status === 'denied' &&
            'Danh tính của bạn đã bị từ chối'}
        </Typography>
      </Stack>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: {
            xs: 0,
            // md: '1em 0',
          },
          mx: 'auto',
          // maxWidth: '971px',
        }}
      >
        <UploadIDCard
          open={isShowUploadIDCardPopup}
          onClose={() => setIsShowUploadIDCardPopup(false)}
        />
        <UploadAvatar
          open={isShowAvatarPopup}
          onClose={() => setIsShowAvatarPopup(false)}
        />
        <Grid container>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              position: {
                xs: 'sticky',
                md: 'unset',
              },
              top: '70px',
              backgroundColor: 'background.default',
              zIndex: 1,
            }}
          >
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={10} borderLeft="1px solid #949494" padding="19px 50px 9px 32px">
            <Stack direction="column">
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                Xác minh
              </Typography>
              <Stack direction="row" marginTop="40px">
                <Avatar
                  src={userData.avatar}
                  sx={{ width: '60px', height: '60px', marginRight: '20px' }}
                />
                <Typography
                  sx={{
                    marginRight: '16px',
                    fontSize: '17px',
                    fontWeight: 600,
                  }}
                >
                  {userData.nickname}
                </Typography>
              </Stack>
              <Divider sx={{ margin: '25px 0 5px 0' }} />
              <Stack padding="0 10px">
                <Stack
                  sx={{
                    padding: '20px',
                    backgroundColor: 'background.mainContent',
                  }}
                >
                  <Grid container>
                    <Grid item xs={10}>
                      {userData?.verification?.status === 'pending' ||
                      userData?.verification?.status === 'denied' ||
                      !userData?.verification
                        ? _renderUnverifyField
                        : _renderVerifiedField()}
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      marginTop={{
                        xs: '20px',
                        md: 0,
                      }}
                    >
                      <Stack justifyContent="flex-end">
                        <Typography
                          sx={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            fontWeight: 400,
                          }}
                        >
                          FAQ
                        </Typography>
                        <Link
                          sx={{
                            fontSize: '10px',
                            lineHeight: '14px',
                            fontWeight: 400,
                            color: '#7D6F6F',
                            textAlign: 'left',
                            textDecoration: 'underline',
                          }}
                        >
                          Xác minh danh tính
                        </Link>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Xác minh" />;
};

export default Verify;
