import Cookies from 'universal-cookie';
import { COOKIE_KEYS } from '@/Constants';

const cookies = new Cookies();

const setAccessToken = (payload: { token: string; expires: string }) => {
  const { token, expires } = payload;
  cookies.set(COOKIE_KEYS.ACCESS_TOKEN, token, {
    path: '/',
    expires: new Date(expires),
  });
};

const getAccessToken = () => {
  const mode = cookies.get(COOKIE_KEYS.ACCESS_TOKEN) || '';
  return mode;
};

const setRefreshToken = (payload: { token: string; expires: string }) => {
  const { token, expires } = payload;
  cookies.set(COOKIE_KEYS.REFRESH_TOKEN, token, {
    path: '/',
    expires: new Date(expires),
  });
};

const getRefreshToken = () => {
  const token = cookies.get(COOKIE_KEYS.REFRESH_TOKEN) || '';
  return token;
};

const setUserData = (userData: any) => {
  localStorage.setItem(COOKIE_KEYS.USER_DATA, JSON.stringify(userData));
};

const getUserData = () => {
  const userData = localStorage.getItem(COOKIE_KEYS.USER_DATA) || '{}';
  return JSON.parse(userData);
};

const saveThemeMode = (mode: 'dark' | 'light') => {
  cookies.set(COOKIE_KEYS.THEME_MODE, mode);
};

const getThemeMode = () => {
  const mode = cookies.get(COOKIE_KEYS.THEME_MODE) || 'light';
  return mode;
};

const clearCookies = () => {
  cookies.remove(COOKIE_KEYS.ACCESS_TOKEN, {
    path: '/',
  });
  cookies.remove(COOKIE_KEYS.REFRESH_TOKEN, {
    path: '/',
  });
  localStorage.removeItem(COOKIE_KEYS.USER_DATA);
};

export {
  saveThemeMode,
  getThemeMode,
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setUserData,
  getUserData,
  clearCookies,
};
