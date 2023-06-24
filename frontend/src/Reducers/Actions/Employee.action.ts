import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';

// SINGLE ACTIONS
const setEmployeeLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_EMPLOYEE_ACTION_LOADING,
    payload,
  };
};

const resetEmployeeReducer = () => {
  return {
    type: ACTION_TYPES.RESET_EMPLOYEE_REDUCER,
  };
};

// ASYNC ACTIONS
const getSystemInfoFail = () => {
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEE_FAILURE,
  };
};

const getSystemInfoSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEE_SUCCESS,
    payload,
  };
};

const fetchAllEmployees = () => {
  return async (dispatch: any) => {
    dispatch(setEmployeeLoading(true));
    await API.fetchAllEmployees()
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getSystemInfoFail());
        else {
          const resolveResult: {
            message: string;
            payload: any;
            status: boolean;
          } = results as { message: string; payload: any; status: boolean };
          dispatch(getSystemInfoSuccess(resolveResult.payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getSystemInfoFail());
      });
  };
};

const updateSystemInfoFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_EMPLOYEE_FAILURE,
  };
};

const updateSystemInfoSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_EMPLOYEE_SUCCESS,
    payload,
  };
};

const updateEmployee = (id: string, payload: any) => {
  return async (dispatch: any) => {
    dispatch(setEmployeeLoading(true));
    await API.updateEmployee(id, payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const resolveResults: { message: string } = results as {
          message: string;
        };
        const { message } = resolveResults;
        if (!results) await dispatch(updateSystemInfoFail());
        else {
          pushNotification({
            type: 'success',
            message,
          });
          dispatch(updateSystemInfoSuccess(results));
          dispatch(fetchAllEmployees());
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateSystemInfoFail());
      });
  };
};

const createInfoFail = () => {
  return {
    type: ACTION_TYPES.CREATE_EMPLOYEE_FAILURE,
  };
};

const createInfoSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.CREATE_EMPLOYEE_SUCCESS,
    payload,
  };
};

const createEmployee = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setEmployeeLoading(true));
    await API.createEmployee(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const resolveResults: { message: string } = results as {
          message: string;
        };
        const { message } = resolveResults;
        if (!results) await dispatch(createInfoFail());
        else {
          pushNotification({
            type: 'success',
            message,
          });
          dispatch(createInfoSuccess(results));
          dispatch(fetchAllEmployees());
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(createInfoFail());
      });
  };
};

const updateContactListFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_LIST_EMPLOYEE_FAILURE,
  };
};

const updateContactListSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_LIST_EMPLOYEE_SUCCESS,
    payload,
  };
};

const updateContactList = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setEmployeeLoading(true));
    await API.updateContactList(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(updateContactListFail());
        else {
          const resolveResult: {
            message: string;
            payload: any;
            status: boolean;
          } = results as { message: string; payload: any; status: boolean };
          dispatch(updateContactListSuccess(resolveResult.payload));
          pushNotification({
            type: 'success',
            message: resolveResult.message,
          });
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateSystemInfoFail());
      });
  };
};

export default {
  resetEmployeeReducer,
  fetchAllEmployees,
  updateEmployee,
  updateContactList,
  createEmployee
};
