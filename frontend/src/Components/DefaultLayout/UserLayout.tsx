import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { Box, Stack } from '@mui/material';
import _ from 'lodash';

import Widgets from '../Widgets';
import { Utils } from '@/Libs';
import AppBarComponent from '../AppBar';
import { ROUTERS } from '@/Constants';
import { useTypedDispatch } from '@/Reducers/store';
import { AuthActions } from '@/Reducers/Actions';

interface SectionProps {
  content: JSX.Element;
  currentPage?: string;
  screenTitle?: string;
}

const { logout } = AuthActions;

const UserLayout: React.FC<SectionProps> = (props: SectionProps) => {
  // Constructors
  const dispatch = useTypedDispatch();
  const token = Utils.getAccessToken();
  const userData = Utils.getUserData();
  const authRoutes = [
    ROUTERS.OVERVIEW,
    ROUTERS.CONNECT_BANK,
    ROUTERS.INVOICE,
    ROUTERS.RECHARGE,
    ROUTERS.SECURITY,
    ROUTERS.SUPPORT,
    ROUTERS.VERIFY,
    ROUTERS.WITHDRAW_MONEY,
  ];
  const { pathname } = useLocation();
  const { content, screenTitle } = props;

  React.useEffect(() => {
    const isAuthRouters = authRoutes.includes(pathname);
    if (isAuthRouters && (!token || !userData)) {
      dispatch(logout());
      Utils.clearCookies();
      Utils.redirect(ROUTERS.SIGN_IN);
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  React.useEffect(() => {
    const themeMode = Utils.getThemeMode();
    Utils.saveThemeMode(themeMode);
  }, []);

  return (
    <Stack direction="column">
      <AppBarComponent />
      <Widgets.Notification />
      <Widgets.Alert />
      <Box
        sx={{
          background: 'background.default',
          height:
            pathname === ROUTERS.TRANSACTION
              ? 'calc(100vh - 40px)'
              : 'calc(100vh - 70px)',
        }}
      >
        <Helmet>
          <title>{screenTitle ? screenTitle : 'Binance'}</title>
        </Helmet>
        {content}
      </Box>
    </Stack>
  );
};

export default UserLayout;
