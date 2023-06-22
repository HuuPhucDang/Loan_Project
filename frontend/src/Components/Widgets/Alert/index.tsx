import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { INotifications } from '@/Interfaces/Widget.interface';
import { WidgetActions } from '@actions';

const { setAlert } = WidgetActions;

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

const Alert = () => {
  // Constructors
  const dispatch = useTypedDispatch();
  const alert: INotifications | null = useSelector((state: RootState) =>
    _.get(state.WIDGET, 'alert')
  );
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    dispatch(setAlert(null));
  };

  useEffect(() => {
    if (alert) setOpen(true);
  }, [alert]);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => onClose()}
      TransitionComponent={Transition}
      sx={{ zIndex: 99999 }}
    >
      <DialogTitle>
        {alert?.type === 'error' ? (
          <ReportGmailerrorredIcon
            sx={{ mr: 2 }}
            fontSize="large"
            color="error"
          />
        ) : (
          <ReportProblemIcon sx={{ mr: 2 }} fontSize="large" color="warning" />
        )}
        {alert?.type === 'error' ? 'Error' : 'Warning'}
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="body1" gutterBottom>
              {alert?.message}
            </Typography>
            {alert?.detail && (
              <Typography variant="body2">{alert?.detail}</Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<CloseIcon />}
          color="fuzzyWuzzyBrown"
          onClick={() => onClose()}
          variant="contained"
          // disabled={!!isLoading}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
