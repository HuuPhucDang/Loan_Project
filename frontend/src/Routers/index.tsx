import { useLayoutEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Router, useRoutes } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { store, history } from '@store';
import { CoreTheme } from '@themes';

// Potals
import MainRouters, { NotFoundRouter } from './MainRouters';
import { HelmetProvider } from 'react-helmet-async';
import AuthRouters from './AuthRouters';
import AdminRouters from './AdminRouters';

const RootRouter = ({ history, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

const App = () => {
  const elements = useRoutes([
    MainRouters,
    AdminRouters,
    AuthRouters,
    NotFoundRouter,
  ]);
  return (
    <SnackbarProvider maxSnack={5}>
      <ConfirmProvider>{elements}</ConfirmProvider>
    </SnackbarProvider>
  );
};

const Root = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HelmetProvider>
        <Provider store={store}>
          <RootRouter history={history}>
            <StyledEngineProvider>
              <ThemeProvider theme={CoreTheme}>
                <CssBaseline />
                <Box display="flex" flexDirection="column" minHeight="100vh">
                  <App />
                </Box>
              </ThemeProvider>
            </StyledEngineProvider>
          </RootRouter>
        </Provider>
      </HelmetProvider>
    </LocalizationProvider>
  );
};

export default hot(Root);
