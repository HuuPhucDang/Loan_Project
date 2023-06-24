import { ACTION_TYPES } from '@/Constants';
// import API from '@/Apis';
// import { Utils } from '@libs';
// import { pushNotification } from '../../Libs/utils/Widget.utils';

// // SINGLE ACTIONS
// const setActionLoading = (payload: boolean) => {
//   return {
//     type: ACTION_TYPES.SET_TRADE_ACTION_LOADING,
//     payload,
//   };
// };

// const setFetchLoading = (payload: boolean) => {
//   return {
//     type: ACTION_TYPES.SET_TRADE_FETCH_LOADING,
//     payload,
//   };
// };

const resetTradeReducer = () => {
  return {
    type: ACTION_TYPES.RESET_TRADE_REDUCER,
  };
};

// // ASYNC ACTIONS
// const fetchTradesFail = () => {
//   return {
//     type: ACTION_TYPES.FETCH_TRADE_FAILURE,
//   };
// };

// const fetchTradesSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.FETCH_TRADE_SUCCESS,
//     payload,
//   };
// };

// const fetchTrades = () => {
//   return async (dispatch: any) => {
//     dispatch(setFetchLoading(true));
//     await API.fetchTrande()
//       .then(async (response: any) => {
//         const results: any = await Utils.resolveResponse(response);
//         if (!results) await dispatch(fetchTradesFail());
//         else {
//           dispatch(fetchTradesSuccess(results?.payload));
//         }
//       })
//       .catch(async (error) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(fetchTradesFail());
//       });
//   };
// };

// const createTradeFail = () => {
//   return {
//     type: ACTION_TYPES.CREATE_TRADE_FAILURE,
//   };
// };

// const createTradeSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.CREATE_TRADE_SUCCESS,
//     payload,
//   };
// };

// const createTrade = (payload: any, _limitTime: number, timeout: number) => {
//   return async (dispatch: any) => {
//     dispatch(setActionLoading(true));
//     await API.createNewTrade(payload)
//       .then(async (response: any) => {
//         const results: any = await Utils.resolveResponse(response);
//         if (!results) await dispatch(createTradeFail());
//         else {
//           const userData = Utils.getUserData();
//           Utils.WebSocket.emit(
//             'checkTradeResult',
//             {
//               userId: userData?.id,
//               timeout: timeout * 1000,
//               tradeId: results?.payload?.id,
//             },
//             () => {}
//           );
//           dispatch(createTradeSuccess(results?.payload));
//           pushNotification({
//             type: 'success',
//             message: 'Giao dịch thành công!',
//           });
//         }
//       })
//       .catch(async (error) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(createTradeFail());
//       });
//   };
// };

export default {
  resetTradeReducer,
  // fetchTrades,
  // createTrade,
};
