import { store } from '@store';
import _ from 'lodash';
import { ACTION_TYPES } from '@/Constants';

import { INotifications } from '@/Interfaces/Widget.interface';

const setNotification = (payload: INotifications) => {
  return {
    type: ACTION_TYPES.SET_NOTIFICATION_MESSAGE,
    payload,
  };
};

const setIsLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_START_LOADING,
    payload,
  };
};

const setIsLoadingInComponent = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_LOADING_INSIDE_COMPONENT,
    payload,
  };
};

const setRequestLoading = (isLoading: boolean, isRequestInside?: boolean) => {
  if (isRequestInside) store.dispatch(setIsLoadingInComponent(isLoading));
  else store.dispatch(setIsLoading(isLoading));
};

const pushNotification = (props: INotifications) => {
  return store.dispatch(setNotification(props));
};

const executeRequest = (instant: any) => {
  return new Promise(() => {
    setTimeout(() => {
      instant;
    }, 1000);
  });
};

const setAlert = (payload: INotifications) => {
  return {
    type: ACTION_TYPES.SET_ALERT_MESSAGE,
    payload,
  };
};

const pushAlert = (props: INotifications) => {
  return store.dispatch(setAlert(props));
};

// Wait until all promises have settled (each may resolve to reject)
const dispatchRequests = (instants: any = [], isRequestInside?: boolean) => {
  setRequestLoading(true, isRequestInside);
  Promise.all(
    _.forEach(instants, async (instant) => {
      await executeRequest(instant);
    })
  )
    .then(() => {
      setRequestLoading(false, isRequestInside);
    })
    .catch(() => {
      setRequestLoading(false, isRequestInside);
    });
};

export { pushNotification, dispatchRequests, pushAlert };
