import React from 'react';
import _ from 'lodash';
import {
  Toolbar,
  Grid,
  IconButton,
  Box,
  Drawer,
  Link,
  Button,
  Typography,
  Stack,
  List,
  ListItem,
  ToggleButtonGroup,
  ToggleButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
// Import local
import { appBarStyles, AppBar } from './AppBar.styles';
import Assets from '@assets';
import { Utils } from '@libs';
import { ROUTERS } from '@/Constants';
import { LanguageSelect, Slider } from '../Common';
import PersonIcon from '@mui/icons-material/Person';
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from '../../Reducers/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthActions, NotificationActions } from '../../Reducers/Actions';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const { setLogged, logout } = AuthActions;
const { fetchNotification } = NotificationActions;

const AppBarComponent: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();
  const userData = Utils.getUserData();
  const token = Utils.getAccessToken();
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
  const notifications: { message: string }[] = useSelector((state: RootState) =>
    _.get(state.NOTIFICATION, 'payload')
  );
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorMenu);
  const handleClose = () => {
    setAnchorMenu(null);
  };
  // Constructors
  const [language, setLanguage] = React.useState<string>('vietnam');

  const [sliderItems, setSliderItems] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isDarkMode = Utils.getThemeMode() === 'dark';

  React.useEffect(() => {
    if (token) dispatch(fetchNotification());
  }, [pathname]);

  React.useEffect(() => {
    if (!isLogged && userData && token) dispatch(setLogged());
    Utils.WebSocket.emit('getLatestCoins', null, (data: any) => {
      setSliderItems(_.map(data, (el) => `${el?.symbol} ${el?.price}`));
    });
    Utils.WebSocket.on('updateAllCoinPriceNow', (data) => {
      setSliderItems(_.map(data, (el) => `${el?.symbol} ${el?.price}`));
    });
    return () => {
      Utils.WebSocket.off('updateAllCoinPriceNow');
      // Utils.WebSocket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (isMd) setAnchorMenu(null);
  }, [isMd]);

  const onSignOut = async () => {
    await dispatch(logout());
    await Utils.clearCookies();
    await Utils.replace(ROUTERS.SIGN_IN);
  };

  const handleChangeLanguage = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setLanguage(newAlignment);
  };

  const notificationItems = React.useMemo(() => {
    const result: string[] = [];
    if (notifications.length > 0)
      notifications.forEach((item: { message: string }) =>
        result.push(item.message)
      );
    else result.push('Hiện tại không có thông báo nào!');
    return result;
  }, [notifications]);

  const _renderMainBar = () => {
    return (
      <Stack direction="row" sx={{ width: '100%', maxWidth: "100vw" }}>
        <Stack direction="row" alignItems="center" sx={{ marginRight: '10px' }}>
          <Link
            href={ROUTERS.HOME}
            sx={{
              color: 'text.secondary',
              fontSize: '12px',
              display: 'inline-flex',
              height: '28px',
              width: '58px',
              alignItems: 'center',
              padding: '0 6px',
            }}
          >
            <Box
              component="img"
              src={Assets.logoImage}
              sx={{ width: 150, height: '100%', objectFit: 'contain' }}
            />
          </Link>
        </Stack>
        <Stack direction="row" sx={{ flex: 1, marginLeft: "10px " }}>
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            justifyContent={{
              xs: 'center',
              md: 'flex-end',
            }}
            width="100%"
          >
            <Link
              href={ROUTERS.TRANSACTION}
              sx={{
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={Assets.transactionDarkIcon}
                sx={{ width: '33px', height: '26px' }}
              />
            </Link>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{
                flex: 1,
                backgroundColor: 'background.newsHeader',
                height: '25px',
                margin: '0 6px',
                maxWidth: {
                  xs: 'calc(100vw - 185px)',
                  sm: 'calc(100vw - 508px)',
                },
              }}
            >
              <Slider
                items={sliderItems}
                itemSx={{
                  fontSize: '12px',
                  color: '#000',
                  textAlign: 'center',
                }}
                slidersPerView={3}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ minWidth: 'max-content' }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ xs: 'none', sm: 'flex' }}
          >
            {isLogged ? (
              <>
                <Button
                  variant="text"
                  size="small"
                  href={ROUTERS.RECHARGE}
                  sx={{
                    fontSize: '12px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.burntSienna',
                    color: 'text.secondary',
                    marginRight: '10px',
                    height: '26px',
                    minWidth: '59px',
                  }}
                >
                  Nạp
                </Button>
                <Button
                  variant="text"
                  size="small"
                  href={ROUTERS.WITHDRAW_MONEY}
                  sx={{
                    fontSize: '12px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.lightSilver',
                    color: 'text.secondary',
                    marginRight: '10px',
                    height: '26px',
                    minWidth: '59px',
                  }}
                >
                  Rút
                </Button>
                <IconButton
                  onClick={(e: any) => {
                    setAnchorMenu(e.currentTarget);
                  }}
                  size="small"
                  sx={{ padding: 0, marginRight: '10px' }}
                >
                  <AccountCircleIcon sx={{ fontSize: '28px' }} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorMenu}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => Utils.redirect(ROUTERS.OVERVIEW)}>
                    Tổng quan
                  </MenuItem>
                  {userData?.role === 'admin' ? (
                    <MenuItem onClick={() => Utils.redirect(ROUTERS.REQUEST)}>
                      Quản lý
                    </MenuItem>
                  ) : null}
                  <MenuItem onClick={() => onSignOut()}>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  size="small"
                  href={ROUTERS.SIGN_IN}
                  sx={{
                    fontSize: '12px',
                    marginRight: '10px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.newsHeader',
                    color: 'text.secondary',
                    height: '26px',
                  }}
                >
                  Đăng nhập
                </Button>
                <Button
                  startIcon={
                    <PersonIcon sx={{ fontSize: '14px !important' }} />
                  }
                  variant="text"
                  size="small"
                  href={ROUTERS.SIGN_UP}
                  sx={{
                    fontSize: '12px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.burntSienna',
                    color: 'text.secondary',
                    height: '26px',
                    marginRight: '10px',
                  }}
                >
                  Đăng ký
                </Button>
              </>
            )}
            <LanguageSelect
              selected=""
              onSelect={(newValue: string) => console.log(newValue)}
            />
            <IconButton
              focusRipple
              onClick={() => {
                if (isDarkMode) {
                  Utils.saveThemeMode('light');
                  window.location.reload();
                }
              }}
              disabled={!isDarkMode}
              size="small"
              sx={{
                padding: 0,
                marginRight: '10px',
                marginLeft: '10px',
              }}
            >
              {isDarkMode ? (
                <Box component="img" src={Assets.lightIconDarkTheme} />
              ) : (
                <Box component="img" src={Assets.lightIconLightTheme} />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                if (!isDarkMode) {
                  Utils.saveThemeMode('dark');
                  window.location.reload();
                }
              }}
              disabled={isDarkMode}
              size="small"
              sx={{ padding: 0 }}
            >
              {isDarkMode ? (
                <Box component="img" src={Assets.darkIconDarkTheme} />
              ) : (
                <Box component="img" src={Assets.darkIconLightTheme} />
              )}
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ xs: 'flex', sm: 'none' }}
          >
            <IconButton
              size="small"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ marginLeft: '10px' }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    );
    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        columnSpacing={0}
        spacing={{
          xs: 1,
          md: 0,
        }}
      >
        <Grid item xs={2} sm={0.9} msm={0.9} md={1} lg={1}>
          <Stack direction="row" alignItems="center">
            <Link
              href={ROUTERS.HOME}
              sx={{
                color: 'text.secondary',
                fontSize: '12px',
                display: 'inline-flex',
                height: '28px',
                width: '58px',
                alignItems: 'center',
                padding: '0 6px',
              }}
            >
              <Box
                component="img"
                src={Assets.logoImage}
                sx={{ width: 150, height: '100%', objectFit: 'contain' }}
              />
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={8} sm={3} msm={5.5} md={5.5} lg={5.5}>
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            justifyContent={{
              xs: 'center',
              md: 'flex-end',
            }}
            width="100%"
          >
            <Link
              href={ROUTERS.TRANSACTION}
              sx={{
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={Assets.transactionDarkIcon}
                sx={{ width: '33px', height: '26px' }}
              />
            </Link>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{
                flex: 1,
                backgroundColor: 'background.newsHeader',
                height: '25px',
                margin: '0 6px',
                maxWidth: '80%',
              }}
            >
              <Slider
                items={sliderItems}
                itemSx={{
                  fontSize: '12px',
                  color: '#000',
                  textAlign: 'center',
                }}
                slidersPerView={3}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={7} msm={5.5} md={5.5} lg={5.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ xs: 'none', sm: 'flex' }}
          >
            {isLogged ? (
              <>
                <Button
                  variant="text"
                  size="small"
                  href={ROUTERS.RECHARGE}
                  sx={{
                    fontSize: '12px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.burntSienna',
                    color: 'text.secondary',
                    marginRight: '10px',
                    height: '26px',
                    minWidth: '59px',
                  }}
                >
                  Nạp
                </Button>
                <Button
                  variant="text"
                  size="small"
                  href={ROUTERS.WITHDRAW_MONEY}
                  sx={{
                    fontSize: '12px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.lightSilver',
                    color: 'text.secondary',
                    marginRight: '10px',
                    height: '26px',
                    minWidth: '59px',
                  }}
                >
                  Rút
                </Button>
                <IconButton
                  onClick={(e: any) => {
                    setAnchorMenu(e.currentTarget);
                  }}
                  size="small"
                  sx={{ padding: 0, marginRight: '10px' }}
                >
                  <AccountCircleIcon sx={{ fontSize: '28px' }} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorMenu}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => Utils.redirect(ROUTERS.OVERVIEW)}>
                    Tổng quan
                  </MenuItem>
                  {userData?.role === 'admin' ? (
                    <MenuItem onClick={() => Utils.redirect(ROUTERS.REQUEST)}>
                      Quản lý
                    </MenuItem>
                  ) : null}
                  <MenuItem onClick={() => onSignOut()}>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  size="small"
                  href={ROUTERS.SIGN_IN}
                  sx={{
                    fontSize: '12px',
                    marginRight: '10px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.newsHeader',
                    color: 'text.secondary',
                    height: '26px',
                  }}
                >
                  Đăng nhập
                </Button>
                <Button
                  startIcon={
                    <PersonIcon sx={{ fontSize: '14px !important' }} />
                  }
                  variant="text"
                  size="small"
                  href={ROUTERS.SIGN_UP}
                  sx={{
                    fontSize: '12px',
                    paddingX: '8px',
                    textTransform: 'unset',
                    backgroundColor: 'background.burntSienna',
                    color: 'text.secondary',
                    height: '26px',
                    marginRight: '10px',
                  }}
                >
                  Đăng ký
                </Button>
              </>
            )}
            <LanguageSelect
              selected=""
              onSelect={(newValue: string) => console.log(newValue)}
            />
            <IconButton
              focusRipple
              onClick={() => {
                if (isDarkMode) {
                  Utils.saveThemeMode('light');
                  window.location.reload();
                }
              }}
              disabled={!isDarkMode}
              size="small"
              sx={{
                padding: 0,
                marginRight: '10px',
                marginLeft: '10px',
              }}
            >
              {isDarkMode ? (
                <Box component="img" src={Assets.lightIconDarkTheme} />
              ) : (
                <Box component="img" src={Assets.lightIconLightTheme} />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                if (!isDarkMode) {
                  Utils.saveThemeMode('dark');
                  window.location.reload();
                }
              }}
              disabled={isDarkMode}
              size="small"
              sx={{ padding: 0 }}
            >
              {isDarkMode ? (
                <Box component="img" src={Assets.darkIconDarkTheme} />
              ) : (
                <Box component="img" src={Assets.darkIconLightTheme} />
              )}
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ xs: 'flex', sm: 'none' }}
          >
            <IconButton
              size="small"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ marginLeft: '10px' }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    );
  };
  const _renderSubHeader = () => {
    return (
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          minHeight: '30px',
          background: 'palegoldenrod',
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isLogged ? (
            <Slider
              items={notificationItems}
              itemSx={{
                fontSize: '10px',
                color: '#000000',
                textAlign: 'center',
              }}
              slidersPerView={1}
              speed={4000}
            />
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <PersonIcon sx={{ color: 'text.burntSienna', mr: '6px' }} />
              <Typography
                sx={{ color: '#000000', fontSize: '10px', textAlign: 'center' }}
              >
                <Link href={ROUTERS.SIGN_UP}>Đăng kí ngay</Link> - Nhận chiết
                khấu giao dịch lên tới 100 USD khi đăng ký thành công với mã mời
                (dành cho người dùng đã xác minh)
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  };

  return (
    <AppBar position="sticky" sx={appBarStyles}>
      <Box>
        <Toolbar
          sx={{
            padding: '0 10px !important',
            minHeight: '40px !important',
            // maxWidth: '875px',
            mx: 'auto',
          }}
        >
          {_renderMainBar()}
        </Toolbar>
        <Drawer anchor="right" open={open} onClose={() => setAnchorEl(null)}>
          <List sx={{ minWidth: '220px' }}>
            {isLogged ? (
              <>
                <ListItem>
                  <Link
                    href={ROUTERS.RECHARGE}
                    sx={{
                      color: 'text.primary',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Nạp
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={ROUTERS.WITHDRAW_MONEY}
                    sx={{
                      color: 'text.primary',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Rút
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={ROUTERS.OVERVIEW}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Tổng quan
                  </Link>
                </ListItem>
                {userData.role === 'admin' ? (
                  <ListItem>
                    <Link
                      href={ROUTERS.REQUEST}
                      sx={{ color: 'text.primary', fontSize: '12px' }}
                    >
                      Quản lý
                    </Link>
                  </ListItem>
                ) : null}
                <ListItem>
                  <Link
                    onClick={() => onSignOut()}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Đăng xuất
                  </Link>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Link
                    href={ROUTERS.SIGN_IN}
                    sx={{
                      color: 'text.primary',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Đăng nhập
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={ROUTERS.SIGN_UP}
                    sx={{
                      color: 'text.primary',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Đăng ký
                  </Link>
                </ListItem>
              </>
            )}
            <ListItem>
              <ToggleButtonGroup
                color="primary"
                value={language}
                exclusive
                onChange={handleChangeLanguage}
                aria-label="Platform"
                sx={{
                  width: '100%',
                }}
              >
                <ToggleButton
                  value="english"
                  sx={{
                    display: 'flex',
                    fontSize: '12px',
                    textTransform: 'unset',
                    padding: '6px 10px',
                    flex: 1,
                    color: 'text.primary',
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: 'text.burntSienna',
                      borderColor: 'text.burntSienna',
                      background: 'transparent',
                      borderRight: '1px solid text.burntSienna',
                    },
                  }}
                >
                  English
                </ToggleButton>
                <ToggleButton
                  value="vietnam"
                  sx={{
                    display: 'flex',
                    fontSize: '12px',
                    textTransform: 'unset',
                    padding: '6px 10px',
                    flex: 1,
                    color: 'text.primary',
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: 'text.burntSienna',
                      borderColor: 'text.burntSienna',
                      background: 'transparent',
                      borderLeft: '1px solid text.burntSienna',
                    },
                  }}
                >
                  Vietnam
                </ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
            <ListItem>
              <IconButton
                focusRipple
                onClick={() => {
                  if (isDarkMode) {
                    Utils.saveThemeMode('light');
                    window.location.reload();
                  }
                }}
                disabled={!isDarkMode}
                size="small"
                sx={{
                  padding: 0,
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
              >
                {isDarkMode ? (
                  <Box component="img" src={Assets.lightIconDarkTheme} />
                ) : (
                  <Box component="img" src={Assets.lightIconLightTheme} />
                )}
              </IconButton>

              <IconButton
                onClick={() => {
                  if (!isDarkMode) {
                    Utils.saveThemeMode('dark');
                    window.location.reload();
                  }
                }}
                disabled={isDarkMode}
                size="small"
                sx={{ padding: 0, marginLeft: '4px' }}
              >
                {isDarkMode ? (
                  <Box component="img" src={Assets.darkIconDarkTheme} />
                ) : (
                  <Box component="img" src={Assets.darkIconLightTheme} />
                )}
              </IconButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      {pathname !== ROUTERS.TRANSACTION && _renderSubHeader()}
    </AppBar>
  );
};

export default AppBarComponent;
