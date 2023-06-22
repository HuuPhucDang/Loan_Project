import _ from 'lodash';
import { history } from '@store';

// Declare constants

// declare avaiable screens
// const AVAIABLE_ROUTES = [ROUTER.INITIALAZATION, ROUTER.HOME];

// Check network connection
const checkNetworkConnection = () => {
  return navigator.onLine;
};

// Redirect screen
const redirect = (location: string, state?: any) => {
  return history.push(location, state);
};

const replace = (location: string, state?: any) => {
  return history.replace(location, state);
};

// Sleep for delay
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const resolveFilter = (filterParams: any) => {
  const results = {};
  for (const key in filterParams) {
    const currentValue = filterParams[key];
    if (currentValue !== 'all' && Boolean(currentValue))
      _.assign(results, { [key]: currentValue });
  }
  return results;
};

export {
  checkNetworkConnection,
  redirect,
  sleep,
  replace,
  resolveFilter,
};
