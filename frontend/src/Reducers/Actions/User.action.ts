import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';

// SINGLE ACTIONS
const setUserLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_USER_ACTION_LOADING,
    payload,
  };
};

const resetUserReducer = () => {
  return {
    type: ACTION_TYPES.RESET_USER_REDUCER,
  };
};

// ASYNC ACTIONS
const updateAvatarFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_AVATAR_FAILURE,
  };
};

const updateAvatarSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_AVATAR_SUCCESS,
    payload,
  };
};

const updateAvatar = (payload: { avatar: string }) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updateAvatar(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(updateAvatarFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          Utils.setUserData(resolveResult.payload);
          dispatch(updateAvatarSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateAvatarFail());
      });
  };
};

const fetchUsersSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_USERS_SUCCESS,
    payload,
  };
};

const fetchUsersFail = () => {
  return {
    type: ACTION_TYPES.FETCH_USERS_FAILURE,
  };
};

const fetchUsers = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.fetchUsers(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(fetchUsersFail());
        else {
          const resolveResult: { payload: any } = result as { payload: any };
          dispatch(fetchUsersSuccess(resolveResult.payload));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchUsersFail());
      });
  };
};

const getSelfFail = () => {
  return {
    type: ACTION_TYPES.GET_SELF_FAILURE,
  };
};

const getSelfSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_SELF_SUCCESS,
    payload,
  };
};

const getSelf = () => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.getSelf()
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getSelfFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          Utils.setUserData(resolveResult.payload);
          dispatch(getSelfSuccess(resolveResult.payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getSelfFail());
      });
  };
};

const updateNicknameSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_NICKNAME_SUCCESS,
    payload,
  };
};

const updateNicknameFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_NICKNAME_FAILURE,
  };
};

const updateNickname = (payload: { nickname: string }) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updateNickname(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updateNicknameFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = result as { status: boolean; message: string; payload: any };
          Utils.setUserData(resolveResult.payload);
          dispatch(updateNicknameSuccess(result));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateNicknameFail());
      });
  };
};

const updatePasswordSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_PASSWORD_SUCCESS,
    payload,
  };
};

const updatePasswordFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_PASSWORD_FAILURE,
  };
};

const updatePassword = (payload: { userId: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updatePassword(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updatePasswordFail());
        else {
          const { message }: { message: string } = result as {
            message: string;
          };
          pushNotification({ type: 'success', message });
          dispatch(updatePasswordSuccess(result));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updatePasswordFail());
      });
  };
};

const getUserByIdSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_USER_BY_ID_SUCCESS,
    payload,
  };
};

const getUserByIdFail = () => {
  return {
    type: ACTION_TYPES.GET_USER_BY_ID_FAILURE,
  };
};

const getUserById = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.getUserById(id)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(getUserByIdFail());
        else {
          const { payload }: { payload: any } = result as { payload: any };
          dispatch(getUserByIdSuccess(payload));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getUserByIdFail());
      });
  };
};

const updateUserTypeSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_TYPE_SUCCESS,
    payload,
  };
};

const updateUserTypeFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_USER_TYPE_FAILURE,
  };
};

const updateUserType = (payload: { userId: string; userType: string }) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updateUserType(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updateUserTypeFail());
        else {
          const { message }: { message: string } = result as {
            message: string;
          };
          pushNotification({ type: 'success', message });
          const { payload }: { payload: any } = result as { payload: any };
          dispatch(updateUserTypeSuccess(payload));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateUserTypeFail());
      });
  };
};

const updateUserSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_SUCCESS,
    payload,
  };
};

const updateUserFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_USER_FAILURE,
  };
};

const updateUser = (userId: string, payload: any) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updateUser(userId, payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updateUserFail());
        else {
          const { message }: { message: string } = result as {
            message: string;
          };
          pushNotification({ type: 'success', message });
          const { payload }: { payload: any } = result as { payload: any };
          dispatch(updateUserSuccess(payload));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateUserFail());
      });
  };
};

export default {
  resetUserReducer,
  updateNickname,
  updateAvatar,
  fetchUsers,
  getSelf,
  updatePassword,
  getUserById,
  updateUserType,
  updateUser,
};
