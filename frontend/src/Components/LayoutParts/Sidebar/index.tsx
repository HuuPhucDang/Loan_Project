import { Button, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import { ROUTERS } from '../../../Constants';
import { useLocation } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTypedDispatch } from '../../../Reducers/store';
import { AuthActions } from '../../../Reducers/Actions';
import { Utils } from '../../../Libs';
interface IMenu {
  icon: JSX.Element;
  label: string;
  path: string;
  isOnlyUser: boolean;
}

const menu: IMenu[] = [
  {
    icon: <PersonIcon />,
    label: 'Tổng quan',
    path: ROUTERS.OVERVIEW,
    isOnlyUser: false,
  },
  {
    icon: <AdminPanelSettingsIcon />,
    label: 'Bảo mật',
    path: ROUTERS.SECURITY,
    isOnlyUser: false,
  },
  {
    icon: <GppGoodIcon />,
    label: 'Xác minh',
    path: ROUTERS.VERIFY,
    isOnlyUser: false,
  },
  {
    icon: <AccountBalanceIcon />,
    label: 'Liên kết ngân hàng',
    path: ROUTERS.CONNECT_BANK,
    isOnlyUser: false,
  },
  {
    icon: <AccountBalanceWalletOutlinedIcon />,
    label: 'Lịch sử nạp rút',
    path: ROUTERS.INVOICE,
    isOnlyUser: false,
  },
  {
    icon: <RecordVoiceOverOutlinedIcon />,
    label: 'CSKH trực tuyến',
    path: ROUTERS.SUPPORT,
    isOnlyUser: true,
  },
];

const { logout } = AuthActions;

const Sidebar = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();
  const userData = Utils.getUserData();

  const onSignOut = async () => {
    await dispatch(logout());
    await Utils.clearCookies();
    await Utils.redirect(ROUTERS.SIGN_IN);
  };

  return (
    <Stack sx={{ maxWidth: '100%', overflow: 'auto' }}>
      <Stack
        sx={{
          borderRight: '1px solid background.lightSilver',
          height: '100%',
          flexDirection: {
            xs: 'row',
            md: 'column',
          },
        }}
      >
        {menu.map((item: IMenu) => {
          const isActive = item.path === pathname;
          if (item.isOnlyUser && userData?.role === 'admin') return null;
          return (
            <Button
              key={item.path}
              startIcon={item.icon}
              variant="text"
              href={item.path}
              sx={{
                display: 'flex',
                color: 'text.primary',
                justifyContent: 'flex-start',
                fontSize: '12px',
                height: '40px',
                padding: '0 10px',
                textTransform: 'unset',
                whiteSpace: 'nowrap',
                minWidth: {
                  xs: 'max-content',
                  md: '100%',
                },
                backgroundColor: isActive
                  ? 'background.mainContent'
                  : 'transparent',
              }}
            >
              {item.label}
            </Button>
          );
        })}
        <Button
          startIcon={<LogoutIcon />}
          variant="text"
          sx={{
            display: 'flex',
            color: 'text.primary',
            justifyContent: 'flex-start',
            fontSize: '12px',
            height: '40px',
            padding: '0 10px',
            textTransform: 'unset',
            whiteSpace: 'nowrap',
            minWidth: {
              xs: 'max-content',
              md: '100%',
            },
            backgroundColor: 'transparent',
          }}
          onClick={() => onSignOut()}
        >
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
