import { create, ApisauceInstance } from 'apisauce';
import _ from 'lodash';
import { Utils } from '@libs';
import { ROUTERS } from '@/Constants';

export type API_METHOD =
  | 'GET'
  | 'PUT'
  | 'POST'
  | 'DEL'
  | 'FORM_DATA'
  | 'PUT_FORM_DATA';
export type ERROR_TYPE = 'ERROR' | 'WANRING' | 'SERVER_ERROR';
const AUTHORISED_ERROR = [401];
const INTERAL_SERVER_ERROR = [500, 501];
const BAD_REQUEST_ERROR = [400, 422];
const WRONG_URL_ERROR = [404];

const getAPIConfig = () => {
  const BASE_URL =
    import.meta.env.VITE_BE_URL || 'http://222.255.117.249:3215/v1';
  const token = Utils.getAccessToken();
  const api = create({
    baseURL: `${BASE_URL}`,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // api.setHeader('Authorization', `Bearer ${token}`);

  return api;
};

// Handle error response
const handleErrorResponse = (
  type: ERROR_TYPE,
  params: { message: string; duration: number }
) => {
  const { message, duration } = params;
  const response = {
    type,
    message,
    duration,
  };
  return response;
};

// Handle response
const handleResponse = (res: any, resolve: any, reject: any) => {
  const message = _.get(res, 'data.message');
  const duration = _.get(res, 'duration') || 0;
  const status = _.get(res, 'status');
  const problem = _.get(res, 'problem');
  if (message === 'Not authorized.') {
    return Utils.redirect(ROUTERS.HOME);
  }
  if (_.includes(AUTHORISED_ERROR, status)) {
    return reject(handleErrorResponse('WANRING', { message, duration }));
  }
  if (_.includes(INTERAL_SERVER_ERROR, status))
    return reject(handleErrorResponse('ERROR', { message, duration }));
  if (_.includes(BAD_REQUEST_ERROR, status))
    return reject(
      handleErrorResponse('WANRING', {
        message: `Bad request: ${message}`,
        duration,
      })
    );
  if (_.includes(WRONG_URL_ERROR, status))
    return reject(
      handleErrorResponse('WANRING', { message: `URL not found`, duration })
    );
  if (problem)
    return reject(handleErrorResponse('SERVER_ERROR', { message, duration }));
  return resolve(res);
};

const post = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.post(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const postFormData = async (api: ApisauceInstance, url: string, data?: any) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const res = await api.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const putFormData = async (api: ApisauceInstance, url: string, data?: any) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const res = await api.put(url, data, { headers });
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const get = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.get(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const put = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.put(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const del = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = api.delete(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const sendRequest = async (url: string, method: API_METHOD, params?: any) => {
  const token = Utils.getAccessToken();

  const api = getAPIConfig();
  await api.setHeaders({
    Authorization: `Bearer ${token}`,
  });
  // api.setHeader('Authorization',  `Bearer ${token}`)
  if (!api) return;
  if (method === 'POST') return await post(api, url, params);
  if (method === 'GET') return await get(api, url, params);
  if (method === 'PUT') return await put(api, url, params);
  if (method === 'FORM_DATA') return await postFormData(api, url, params);
  if (method === 'DEL') return await del(api, url, params);
  if (method === 'PUT_FORM_DATA') return await putFormData(api, url, params);
  return null;
};

const outsideEndpointRequest = async (
  url: string,
  method: API_METHOD,
  params?: any
) => {
  const BASE_URL =
    import.meta.env.VITE_BE_URL || 'https://api.binance.com/api/v3';
  const api = create({
    baseURL: `${BASE_URL}`,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!api) return;
  if (method === 'GET') return await get(api, url, params);
  return null;
};

export { outsideEndpointRequest };
export default sendRequest;
