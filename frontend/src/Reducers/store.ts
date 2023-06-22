import { configureStore, Action } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createRootReducer from './States';

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
export type RootState = ReturnType<typeof rootReducer>;

const router = routerMiddleware(history);

const excludeLoggerEnvs = ['prod'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(
  import.meta.env.MODE || ''
);

let logger: any = undefined;

if (shouldIncludeLogger) {
  logger = createLogger({
    level: 'info',
    collapsed: true,
  });
}

export const configuredStore = () => {
  // Create Store
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = [
        ...getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        }),
        router,
      ];
      if (logger) return [...middleware, logger];
      return middleware;
    },
  });
  return store;
};

export const store = configuredStore();
export type Store = ReturnType<typeof configuredStore>;
export type ReduxState = ReturnType<typeof createRootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
