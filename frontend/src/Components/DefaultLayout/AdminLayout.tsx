import React from 'react';
import { Container, Grid } from '@mui/material';

import Widgets from '../Widgets';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Utils } from '@/Libs';
import AdminSideBar from '../AdminSideBar';
import utils from '../../Libs/utils';
import { ROUTERS } from '../../Constants';

interface SectionProps {
  content: JSX.Element;
  currentPage?: string;
  screenTitle?: string;
}

const AdminLayout: React.FC<SectionProps> = (props: SectionProps) => {
  // Constructors
  const token = utils.getAccessToken();
  const userData = utils.getUserData();
  const { pathname } = useLocation();
  const { content, screenTitle } = props;

  React.useEffect(() => {
    if (userData?.role !== 'admin') {
      if (token) Utils.redirect(ROUTERS.TRANSACTION);
      else Utils.redirect(ROUTERS.SIGN_IN);
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  React.useEffect(() => {
    const themeMode = Utils.getThemeMode();
    Utils.saveThemeMode(themeMode);
  }, []);

  return (
    <Grid container sx={{ background: 'background.default', height: '100vh' }}>
      <Grid item xs={2}>
        <AdminSideBar />
      </Grid>
      <Grid item xs={10}>
        <Container
          maxWidth="lg"
          sx={{ height: '100%', maxHeight: '100vh', overflow: 'auto' }}
        >
          {content}
        </Container>
      </Grid>
      <Helmet>
        <title>{screenTitle ? screenTitle : 'Admin'}</title>
      </Helmet>
      <Widgets.Notification />
      <Widgets.Alert />
    </Grid>
  );
};

export default AdminLayout;
