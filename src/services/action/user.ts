import {
  confirmResetPassRequest,
  getProfileRequest,
  loginRequest,
  logoutRequest,
  refreshTokenAndFetchRetry,
  refreshTokenRequest,
  registerRequest,
  resetPasswordRequest,
  updateProfileRequest,
} from "../api";
import { ACCESS_TOKEN, JWT_EXPIRED, REFRESH_TOKEN } from "../constant";
import { AppDispatch, AppThunk } from "../types";
import {
  TConfirmResetPassRQ,
  TConfirmResetPassResponse,
  TGetCodeForResetPassRQ,
  TGetCodeForResetPassResponse,
  TProfileResponse,
  TLoginResponse,
  TLogoutResponse,
  TRefreshTokenResponse,
  TRegisterRequest,
  TRegisterResponse,
  TUpdateProfileRq,
} from "../types/data";
import { deleteCookie, setCookie } from "../utils";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_REQUEST_SUCCESS: "REGISTER_REQUEST_SUCCESS" =
  "REGISTER_REQUEST_SUCCESS";
export const REGISTER_REQUEST_FAILED: "REGISTER_REQUEST_FAILED" =
  "REGISTER_REQUEST_FAILED";
export const GET_CODE_RESET_PASSWORD_REQUEST: "GET_CODE_RESET_PASSWORD_REQUEST" =
  "GET_CODE_RESET_PASSWORD_REQUEST";
export const GET_CODE_RESET_PASSWORD_SUCCESS: "GET_CODE_RESET_PASSWORD_SUCCESS" =
  "GET_CODE_RESET_PASSWORD_SUCCESS";
export const GET_CODE_RESET_PASSWORD_FAILED: "GET_CODE_RESET_PASSWORD_FAILED" =
  "GET_CODE_RESET_PASSWORD_FAILED";
export const CONFIRM_RESET_PASSWORD_REQUEST: "CONFIRM_RESET_PASSWORD_REQUEST" =
  "CONFIRM_RESET_PASSWORD_REQUEST";
export const CONFIRM_RESET_PASSWORD_SUCCESS: "CONFIRM_RESET_PASSWORD_SUCCESS" =
  "CONFIRM_RESET_PASSWORD_SUCCESS";
export const CONFIRM_RESET_PASSWORD_FAILED: "CONFIRM_RESET_PASSWORD_FAILED" =
  "CONFIRM_RESET_PASSWORD_FAILED";

export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" =
  "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REQUEST_FAILED: "REFRESH_TOKEN_REQUEST_FAILED" =
  "REFRESH_TOKEN_REQUEST_FAILED";
export const REFRESH_TOKEN_REQUEST_SUCCESS: "REFRESH_TOKEN_REQUEST_SUCCESS" =
  "REFRESH_TOKEN_REQUEST_SUCCESS";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_REQUEST_FAILED: "LOGIN_REQUEST_FAILED" =
  "LOGIN_REQUEST_FAILED";
export const LOGIN_REQUEST_SUCCESS: "LOGIN_REQUEST_SUCCESS" =
  "LOGIN_REQUEST_SUCCESS";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_FAILED: "LOGOUT_REQUEST_FAILED" =
  "LOGOUT_REQUEST_FAILED";
export const LOGOUT_REQUEST_SUCCESS: "LOGOUT_REQUEST_SUCCESS" =
  "LOGOUT_REQUEST_SUCCESS";

export const GET_PROFILE_REQUEST: "GET_PROFILE_REQUEST" = "GET_PROFILE_REQUEST";
export const GET_PROFILE_REQUEST_FAILED: "GET_PROFILE_REQUEST_FAILED" =
  "GET_PROFILE_REQUEST_FAILED";
export const GET_PROFILE_REQUEST_SUCCESS: "GET_PROFILE_REQUEST_SUCCESS" =
  "GET_PROFILE_REQUEST_SUCCESS";

export const UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST" =
  "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_REQUEST_FAILED: "UPDATE_PROFILE_REQUEST_FAILED" =
  "UPDATE_PROFILE_REQUEST_FAILED";
export const UPDATE_PROFILE_REQUEST_SUCCESS: "UPDATE_PROFILE_REQUEST_SUCCESS" =
  "UPDATE_PROFILE_REQUEST_SUCCESS";

/*
  Register 
*/
export interface IRegisterAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_REQUEST_FAILED;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_REQUEST_SUCCESS;
  readonly payload: TRegisterResponse;
}

export const sendRqRegister = (): IRegisterAction => ({
  type: REGISTER_REQUEST,
});

export const registerFailed = (): IRegisterFailedAction => ({
  type: REGISTER_REQUEST_FAILED,
});

export const setUserInfo = (
  payload: TRegisterResponse
): IRegisterSuccessAction => ({
  type: REGISTER_REQUEST_SUCCESS,
  payload,
});

/*
  GetCodeForResetPass
*/
export interface IGetCodeResetPassAction {
  readonly type: typeof GET_CODE_RESET_PASSWORD_REQUEST;
}

export interface IGetCodeResetPassFailedAction {
  readonly type: typeof GET_CODE_RESET_PASSWORD_FAILED;
}

export interface IGetCodeResetPassSuccessAction {
  readonly type: typeof GET_CODE_RESET_PASSWORD_SUCCESS;
  readonly payload: TGetCodeForResetPassResponse;
}

export const sendRqGetCodeForResetPass = (): IGetCodeResetPassAction => ({
  type: GET_CODE_RESET_PASSWORD_REQUEST,
});

export const getCodeForResetPassFailed = (): IGetCodeResetPassFailedAction => ({
  type: GET_CODE_RESET_PASSWORD_FAILED,
});

export const setResGetCodeForResetPass = (
  payload: TGetCodeForResetPassResponse
): IGetCodeResetPassSuccessAction => ({
  type: GET_CODE_RESET_PASSWORD_SUCCESS,
  payload,
});

/*
  ConfirmResetPass  
*/
export interface IConfirmResetAction {
  readonly type: typeof CONFIRM_RESET_PASSWORD_REQUEST;
}

export interface IConfirmResetPassActionFailed {
  readonly type: typeof CONFIRM_RESET_PASSWORD_FAILED;
}

export interface IConfirmResetPassActionSuccess {
  readonly type: typeof CONFIRM_RESET_PASSWORD_SUCCESS;
  readonly payload: TConfirmResetPassResponse;
}

export const confirmResetPassRq = (): IConfirmResetAction => ({
  type: CONFIRM_RESET_PASSWORD_REQUEST,
});

export const confirmResetPassFailed = (): IConfirmResetPassActionFailed => ({
  type: CONFIRM_RESET_PASSWORD_FAILED,
});

export const setResConfirmResetPass = (
  payload: TConfirmResetPassResponse
): IConfirmResetPassActionSuccess => ({
  type: CONFIRM_RESET_PASSWORD_SUCCESS,
  payload,
});

/*
  refreshToken
*/
export interface IRefreshAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshFailedAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST_FAILED;
}

export interface IRefreshSuccessAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST_SUCCESS;
  readonly payload: TRefreshTokenResponse;
}

export const refreshTokenAction = (): IRefreshAction => ({
  type: REFRESH_TOKEN_REQUEST,
});

export const refreshTokenFailedAction = (): IRefreshFailedAction => ({
  type: REFRESH_TOKEN_REQUEST_FAILED,
});

export const refreshTokenSuccessAction = (
  payload: TRefreshTokenResponse
): IRefreshSuccessAction => ({
  type: REFRESH_TOKEN_REQUEST_SUCCESS,
  payload,
});

/*
  Login
*/
export interface ILoginAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_REQUEST_FAILED;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_REQUEST_SUCCESS;
  readonly payload: TLoginResponse;
}

export const loginAction = (): ILoginAction => ({
  type: LOGIN_REQUEST,
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_REQUEST_FAILED,
});

export const loginSuccessAction = (
  payload: TLoginResponse
): ILoginSuccessAction => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload,
});

/*
  Logout
*/
export interface ILogoutAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
  readonly payload: TLogoutResponse;
}

export const logoutAction = (): ILogoutAction => ({
  type: LOGOUT_REQUEST,
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_REQUEST_FAILED,
});

export const logoutSuccessAction = (
  payload: TLogoutResponse
): ILogoutSuccessAction => ({
  type: LOGOUT_REQUEST_SUCCESS,
  payload,
});

/*
  Profile
*/
export interface IGetProfileAction {
  readonly type: typeof GET_PROFILE_REQUEST;
}

export interface IGetProfileFailedAction {
  readonly type: typeof GET_PROFILE_REQUEST_FAILED;
}

export interface IGetProfileSuccessAction {
  readonly type: typeof GET_PROFILE_REQUEST_SUCCESS;
  readonly payload: TProfileResponse;
}

export const getProfileAction = (): IGetProfileAction => ({
  type: GET_PROFILE_REQUEST,
});

export const getProfileFailedAction = (): IGetProfileFailedAction => ({
  type: GET_PROFILE_REQUEST_FAILED,
});

export const getProfileSuccessAction = (
  payload: TProfileResponse
): IGetProfileSuccessAction => ({
  type: GET_PROFILE_REQUEST_SUCCESS,
  payload,
});

/*
  Update Profile
*/
export interface IUpdateProfileAction {
  readonly type: typeof UPDATE_PROFILE_REQUEST;
}

export interface IUpdateProfileFailedAction {
  readonly type: typeof UPDATE_PROFILE_REQUEST_FAILED;
}

export interface IUpdateProfileSuccessAction {
  readonly type: typeof UPDATE_PROFILE_REQUEST_SUCCESS;
  readonly payload: TProfileResponse;
}

export const updateProfileAction = (): IUpdateProfileAction => ({
  type: UPDATE_PROFILE_REQUEST,
});

export const updateProfileFailedAction = (): IUpdateProfileFailedAction => ({
  type: UPDATE_PROFILE_REQUEST_FAILED,
});

export const updateProfileSuccessAction = (
  payload: TProfileResponse
): IUpdateProfileSuccessAction => ({
  type: UPDATE_PROFILE_REQUEST_SUCCESS,
  payload,
});

export const registerThunk: AppThunk = (data: TRegisterRequest) => {
  return function (dispatch: AppDispatch) {
    dispatch(sendRqRegister());
    registerRequest(data)
      .then((res) => {
        dispatch(setUserInfo(res));
        if (res.accessToken) {
          setCookie(ACCESS_TOKEN, res.accessToken.split("Bearer ")[1]);
        }
        if (res.refreshToken) {
          setCookie(REFRESH_TOKEN, res.refreshToken);
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(registerFailed());
      });
  };
};

export const loginThunk: AppThunk = (data: {
  email: string;
  password: string;
}) => {
  return async function (dispatch: AppDispatch) {
    dispatch(loginAction());
    await loginRequest(data)
      .then((res) => {
        dispatch(loginSuccessAction(res));
        if (res.accessToken) {
          setCookie(ACCESS_TOKEN, res.accessToken.split("Bearer ")[1]);
        }
        if (res.refreshToken) {
          setCookie(REFRESH_TOKEN, res.refreshToken);
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(loginFailedAction());
      });
  };
};

export const resetPasswordThunk: AppThunk = (data: TGetCodeForResetPassRQ) => {
  return function (dispatch: AppDispatch) {
    dispatch(sendRqGetCodeForResetPass());
    resetPasswordRequest(data)
      .then((res) => {
        dispatch(setResGetCodeForResetPass(res));
      })
      .catch((e) => {
        console.log(e);
        dispatch(getCodeForResetPassFailed());
      });
  };
};

export const refreshTokenThunk: AppThunk = (data: { token: string }) => {
  return function (dispatch: AppDispatch) {
    dispatch(refreshTokenAction());
    refreshTokenRequest(data)
      .then((res) => {
        dispatch(refreshTokenSuccessAction(res));
        if (res.accessToken) {
          setCookie(ACCESS_TOKEN, res.accessToken.split("Bearer ")[1]);
        }
        if (res.refreshToken) {
          setCookie(REFRESH_TOKEN, res.refreshToken);
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(refreshTokenFailedAction());
      });
  };
};

export const confirmResetPassThunk: AppThunk = (
  data: TConfirmResetPassRQ,
  afterLogout?: Function
) => {
  return function (dispatch: AppDispatch) {
    dispatch(confirmResetPassRq());
    confirmResetPassRequest(data)
      .then((res) => {
        dispatch(setResConfirmResetPass(res));
        if (afterLogout) {
          afterLogout();
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(confirmResetPassFailed());
      });
  };
};

export const getProfileThunk: AppThunk =
  () => async (dispatch: AppDispatch) => {
    dispatch(getProfileAction());
    try {
      const json = await getProfileRequest();
      dispatch(getProfileSuccessAction(json));
      return json;
    } catch (err: any) {
      if (err.status === 403 && err.message === JWT_EXPIRED) {
        try {
          const json = await refreshTokenAndFetchRetry(getProfileRequest);
          dispatch(getProfileSuccessAction(json));
        } catch (err: any) {
          dispatch(getProfileFailedAction());
        }
      } else {
        dispatch(getProfileFailedAction());
      }
    }
  };

export const updateProfileThunk: AppThunk = (data: TUpdateProfileRq) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateProfileAction());
    updateProfileRequest(data)
      .then((res) => {
        dispatch(updateProfileSuccessAction(res));
      })
      .catch((e) => {
        console.log(e);
        dispatch(updateProfileFailedAction());
      });
  };
};

export const logoutThunk: AppThunk = (data: {
  token: string;
  afterLogout?: Function;
}) => {
  return function (dispatch: AppDispatch) {
    dispatch(logoutAction());
    logoutRequest(data)
      .then((res) => {
        dispatch(logoutSuccessAction(res));
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        if (data.afterLogout) {
          data.afterLogout();
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(logoutFailedAction());
      });
  };
};

export type TUserActions =
  | IRegisterAction
  | IRegisterFailedAction
  | IRegisterSuccessAction
  | IGetCodeResetPassAction
  | IGetCodeResetPassSuccessAction
  | IGetCodeResetPassFailedAction
  | IConfirmResetAction
  | IConfirmResetPassActionFailed
  | IConfirmResetPassActionSuccess
  | IRefreshAction
  | IRefreshFailedAction
  | IRefreshSuccessAction
  | ILoginAction
  | ILoginFailedAction
  | ILoginSuccessAction
  | IGetProfileAction
  | IGetProfileFailedAction
  | IGetProfileSuccessAction
  | ILogoutAction
  | ILogoutFailedAction
  | ILogoutSuccessAction
  | IUpdateProfileAction
  | IUpdateProfileFailedAction
  | IUpdateProfileSuccessAction;
