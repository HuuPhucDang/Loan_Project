import { Link, Stack, Typography } from '@mui/material';
import { ROUTERS } from '@/Constants';
import SyncIcon from '@mui/icons-material/Sync';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ChatIcon from '@mui/icons-material/Chat';
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useLocation } from 'react-router';
import { useTypedDispatch } from '@/Reducers/store';
import { AuthActions } from '@/Reducers/Actions';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { Utils } from '@/Libs';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TuneIcon from '@mui/icons-material/Tune';

const navigationItems = [
  {
    label: 'Can Thiệp Giá',
    path: ROUTERS.INTERVENTION,
    icon: <MonetizationOnIcon sx={{ fontSize: '16px', marginRight: '5px' }} />,
  },
  {
    label: 'Người dùng',
    path: ROUTERS.USERS,
    icon: <PeopleIcon sx={{ fontSize: '16px', marginRight: '5px' }} />,
  },
  {
    label: 'Yêu cầu',
    path: ROUTERS.REQUEST,
    icon: <SyncIcon sx={{ fontSize: '16px', marginRight: '5px' }} />,
  },
  {
    label: 'Xác minh',
    path: ROUTERS.ADMIN_VERIFY,
    icon: <GppGoodIcon sx={{ fontSize: '16px', marginRight: '5px' }} />,
  },
  {
    label: 'Giao dịch',
    path: ROUTERS.ADMIN_TRANSACTION,
    icon: (
      <StackedLineChartIcon sx={{ fontSize: '16px', marginRight: '5px' }} />
    ),
  },
  {
    label: 'Chỉnh sửa Moonbot',
    path: ROUTERS.EDIT_PRICE,
    icon: (
      <TuneIcon sx={{ fontSize: '16px', marginRight: '5px' }} />
    ),
  },
  {
    label: 'Thông tin ngân hàng',
    path: ROUTERS.BANK_INFORMATION,
    icon: <AccountBalanceIcon sx={{ fontSize: '16px', marginRight: '5px' }} />,
  },
  {
    label: 'Hỗ trợ',
    path: ROUTERS.ADMIN_SUPPORT,
    icon: <ChatIcon sx={{ fontSize: '16px', marginRight: '5px' }} />,
  },
];

const { logout } = AuthActions;

const SideBar = () => {
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();

  const onSignOut = async () => {
    await dispatch(logout());
    await Utils.clearCookies();
    await Utils.replace(ROUTERS.SIGN_IN);
  };

  const _renderNavBar = () =>
    navigationItems.map(
      (item: { label: string; path: string; icon: React.ReactNode }) => {
        const isActive = item.path === pathname;
        return (
          <Link
            key={`nav-link-${item.path}`}
            href={item.path}
            sx={{
              color: isActive ? 'text.secondary' : 'text.primary',
              backgroundColor: isActive
                ? 'background.primary'
                : 'background.default',
              fontSize: '14px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              ':hover': {
                backgroundColor: isActive
                  ? 'background.primary'
                  : 'background.lightSilver',
                color: 'text.secondary',
              },
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      }
    );

  return (
    <Stack
      direction="column"
      sx={{ height: '100%', borderRight: '1px solid #BEBEBE' }}
    >
      <Typography sx={{ padding: '10px', fontSize: '16px', fontWeight: 600 }}>
        Trang quản lý
      </Typography>
      <Stack direction="column" flex={1} padding="16px 0">
        {_renderNavBar()}
        <Typography
          sx={{
            color: 'text.primary',
            backgroundColor: 'background.default',
            fontSize: '14px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            ':hover': {
              backgroundColor: 'background.lightSilver',
              color: 'text.secondary',
            },
          }}
          onClick={() => onSignOut()}
        >
          <LogoutIcon sx={{ fontSize: '16px', marginRight: '5px' }} />
          Đăng xuất
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SideBar;
