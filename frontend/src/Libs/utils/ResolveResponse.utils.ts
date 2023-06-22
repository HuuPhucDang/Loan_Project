import _ from 'lodash';
import { pushNotification, pushAlert } from './Widget.utils';

export type ResponseValidation = {
  data: any;
  isHideAlert: boolean;
};

// RESOLVE REQUEST RESPONSE
const resolveResponse = (response: ResponseValidation) => {
  return new Promise((resolve) => {
    if (response.data) {
      resolve(response.data);
    } else {
      setTimeout(() => {
        pushNotification({
          type: 'warning',
          message: 'Can get content',
        });
      }, 1500);
      resolve(false);
    }
  });
};

const resolveFailureResponse = (response: {
  type: string;
  message: string | string[];
}) => {
  return new Promise((resolve) => {
    const { message } = response;
    if (message) {
      setTimeout(() => {
        pushAlert({
          type: 'warning',
          message: _.isString(message) ? message : message.join(','),
        });
      }, 1500);
    } else {
      setTimeout(() => {
        pushAlert({
          type: 'error',
          message: 'The server is having problems, please try again later!',
        });
      }, 1500);
    }
    resolve(true);
  });
};

export { resolveResponse, resolveFailureResponse };
