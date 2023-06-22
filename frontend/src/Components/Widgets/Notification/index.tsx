import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { INotifications } from '@/Interfaces/Widget.interface';
import { WidgetActions } from '@actions';

const { setNotification } = WidgetActions;

const Notification = () => {
  // Constructors
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useTypedDispatch();
  const notification: INotifications | null = useSelector((state: RootState) =>
    _.get(state.WIDGET, 'notification')
  );

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, {
        variant: notification.type,
        onExited: () => {
          dispatch(setNotification(null));
        },
        action: (key) => {
          if (notification?.detail) {
            return (
              <>
                <Button
                  size="small"
                  onClick={() => alert(notification?.detail)}
                >
                  Detail
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    closeSnackbar(key);
                    dispatch(setNotification(null));
                  }}
                >
                  Dismiss
                </Button>
              </>
            );
          }
          return null;
        },
      });
    }
  }, [notification, enqueueSnackbar]);

  return null;
};

export default Notification;
