const port = import.meta.env.VITE_APP_PORT || 3000;

export default {
  THEME_MODE: `@BINANCE${port}:theme`,
  ACCESS_TOKEN: `@BINANCE${port}:accessToken`,
  REFRESH_TOKEN: `@BINANCE${port}:refreshToken`,
  USER_DATA: `@BINANCE${port}:userData`,
};
