import { ACTION_TYPES } from '@/Constants';
// import API from '@/Apis';
// import { Utils } from '@libs';
// import { pushNotification } from '../../Libs/utils/Widget.utils';

// // SINGLE ACTIONS
// const setSecurityLoading = (payload: boolean) => {
//   return {
//     type: ACTION_TYPES.SET_SECURITY_ACTION_LOADING,
//     payload,
//   };
// };

const resetSecurityReducer = () => {
  return {
    type: ACTION_TYPES.RESET_SECURITY_REDUCER,
  };
};

// // ASYNC ACTIONS
// const changePasswordFail = () => {
//   return {
//     type: ACTION_TYPES.CHANGE_PASSWORD_FAILURE,
//   };
// };

// const changePasswordSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.CHANGE_PASSWORD_SUCCESS,
//     payload,
//   };
// };

// const changePassword = (payload: {
//   password: string;
//   newPassword: string;
//   confirmNewPassword: string;
// }) => {
//   return async (dispatch: any) => {
//     dispatch(setSecurityLoading(true));
//     await API.changePassword(payload)
//       .then(async (response: any) => {
//         const results = await Utils.resolveResponse(response);
//         if (!results) await dispatch(changePasswordFail());
//         else {
//           const resolveResult: {
//             status: boolean;
//             message: string;
//             payload: any;
//           } = results as { status: boolean; message: string; payload: any };
//           pushNotification({
//             type: 'success',
//             message: resolveResult.message,
//           });
//           dispatch(changePasswordSuccess(results));
//         }
//       })
//       .catch(async (error: { type: string; message: string | string[]; }) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(changePasswordFail());
//       });
//   };
// };

// const verifyPhoneNumberFail = () => {
//   return {
//     type: ACTION_TYPES.VERIFY_PHONE_NUMBER_FAILURE,
//   };
// };

// const verifyPhoneNumberSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.VERIFY_PHONE_NUMBER_SUCCESS,
//     payload,
//   };
// };

// const verifyPhoneNumber = (payload: { phonenumber: string }) => {
//   return async (dispatch: any) => {
//     dispatch(setSecurityLoading(true));
//     await API.verifyPhoneNumber(payload)
//       .then(async (response: any) => {
//         const results = await Utils.resolveResponse(response);
//         if (!results) await dispatch(verifyPhoneNumberFail());
//         else {
//           const resolveResult: {
//             status: boolean;
//             message: string;
//             payload: any;
//           } = results as { status: boolean; message: string; payload: any };
//           pushNotification({
//             type: 'success',
//             message: resolveResult.message,
//           });
//           Utils.setUserData(resolveResult.payload);
//           dispatch(verifyPhoneNumberSuccess(results));
//         }
//       })
//       .catch(async (error: { type: string; message: string | string[]; }) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(verifyPhoneNumberFail());
//       });
//   };
// };

// const activeEmailFail = () => {
//   return {
//     type: ACTION_TYPES.ACTIVE_EMAIL_FAILURE,
//   };
// };

// const activeEmailSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.ACTIVE_EMAIL_SUCCESS,
//     payload,
//   };
// };

// const activeEmail = (payload: { email: string; password: string }) => {
//   return async (dispatch: any) => {
//     dispatch(setSecurityLoading(true));
//     await API.activeEmail(payload)
//       .then(async (response: any) => {
//         const results = await Utils.resolveResponse(response);
//         if (!results) await dispatch(activeEmailFail());
//         else {
//           const resolveResult: {
//             status: boolean;
//             message: string;
//             payload: any;
//           } = results as { status: boolean; message: string; payload: any };
//           pushNotification({
//             type: 'success',
//             message: resolveResult.message,
//           });
//           Utils.setUserData(resolveResult.payload);
//           dispatch(activeEmailSuccess(results));
//         }
//       })
//       .catch(async (error: { type: string; message: string | string[]; }) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(activeEmailFail());
//       });
//   };
// };
// const changeEmailFail = () => {
//   return {
//     type: ACTION_TYPES.CHANGE_EMAIL_FAILURE,
//   };
// };

// const changeEmailSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.CHANGE_EMAIL_SUCCESS,
//     payload,
//   };
// };

// const changeEmail = (payload: {
//   email: string;
//   password: string;
//   newEmail?: string;
// }) => {
//   return async (dispatch: any) => {
//     dispatch(setSecurityLoading(true));
//     await API.changeEmail(payload)
//       .then(async (response: any) => {
//         const results = await Utils.resolveResponse(response);
//         if (!results) await dispatch(changeEmailFail());
//         else {
//           const resolveResult: {
//             status: boolean;
//             message: string;
//             payload: any;
//           } = results as { status: boolean; message: string; payload: any };
//           pushNotification({
//             type: 'success',
//             message: resolveResult.message,
//           });
//           Utils.setUserData(resolveResult.payload);
//           dispatch(changeEmailSuccess(results));
//         }
//       })
//       .catch(async (error: { type: string; message: string | string[]; }) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(changeEmailFail());
//       });
//   };
// };

// const activeWithdrawPasswordFail = () => {
//   return {
//     type: ACTION_TYPES.ACTIVE_WITHDRAW_PASSWORD_FAILURE,
//   };
// };

// const activeWithdrawPasswordSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.ACTIVE_WITHDRAW_PASSWORD_SUCCESS,
//     payload,
//   };
// };

// const activeWithdrawPassword = (payload: {
//   password: string;
//   withdrawPassword: string;
// }) => {
//   return async (dispatch: any) => {
//     dispatch(setSecurityLoading(true));
//     await API.activeWithdrawPassword(payload)
//       .then(async (response: any) => {
//         const results = await Utils.resolveResponse(response);
//         if (!results) await dispatch(activeWithdrawPasswordFail());
//         else {
//           const resolveResult: {
//             status: boolean;
//             message: string;
//             payload: any;
//           } = results as { status: boolean; message: string; payload: any };
//           pushNotification({
//             type: 'success',
//             message: resolveResult.message,
//           });
//           Utils.setUserData(resolveResult.payload);
//           dispatch(activeWithdrawPasswordSuccess(results));
//         }
//       })
//       .catch(async (error: { type: string; message: string | string[]; }) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(activeWithdrawPasswordFail());
//       });
//   };
// };

// const changeWithdrawPasswordFail = () => {
//   return {
//     type: ACTION_TYPES.CHANGE_WITHDRAW_PASSWORD_FAILURE,
//   };
// };

// const changeWithdrawPasswordSuccess = (payload: any) => {
//   return {
//     type: ACTION_TYPES.CHANGE_WITHDRAW_PASSWORD_SUCCESS,
//     payload,
//   };
// };

// const changeWithdrawPassword = (payload: {
//   email: string;
//   password: string;
//   newWithdrawPassword: string;
//   phonenumber: string;
// }) => {
//   return async (dispatch: any) => {
//     dispatch(setSecurityLoading(true));
//     await API.changeWithdrawPassword(payload)
//       .then(async (response: any) => {
//         const results = await Utils.resolveResponse(response);
//         if (!results) await dispatch(changeWithdrawPasswordFail());
//         else {
//           const resolveResult: {
//             status: boolean;
//             message: string;
//             payload: any;
//           } = results as { status: boolean; message: string; payload: any };
//           pushNotification({
//             type: 'success',
//             message: resolveResult.message,
//           });
//           Utils.setUserData(resolveResult.payload);
//           dispatch(changeWithdrawPasswordSuccess(results));
//         }
//       })
//       .catch(async (error: { type: string; message: string | string[]; }) => {
//         await Utils.resolveFailureResponse(error);
//         await dispatch(changeWithdrawPasswordFail());
//       });
//   };
// };

export default {
  resetSecurityReducer,
  // changeEmail,
  // changePassword,
  // verifyPhoneNumber,
  // activeEmail,
  // activeWithdrawPassword,
  // changeWithdrawPassword,
};
