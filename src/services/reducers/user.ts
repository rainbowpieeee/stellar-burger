import {
  CONFIRM_RESET_PASSWORD_FAILED,
  CONFIRM_RESET_PASSWORD_REQUEST,
  CONFIRM_RESET_PASSWORD_SUCCESS,
  GET_CODE_RESET_PASSWORD_FAILED,
  GET_CODE_RESET_PASSWORD_REQUEST,
  GET_CODE_RESET_PASSWORD_SUCCESS,
  REGISTER_REQUEST_FAILED,
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  TUserActions,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_REQUEST_SUCCESS,
  GET_PROFILE_REQUEST_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
} from "../action/user";
import { TUser } from "../types/data";

const userState: TUser = {
  success: false,
  user: null,
  accessToken: "",
  refreshToken: "",
  registerInfo: {
    request: false,
    failedRequest: false,
    success: false,
  },
  codePasswordInfo: {
    request: false,
    failedRequest: false,
    message: "",
    success: false,
  },
  confirmResetPass: {
    request: false,
    failedRequest: false,
    message: "",
    success: false,
  },
  loginInfo: {
    request: false,
    failedRequest: false,
    success: false,
  },
  getProfileInfo: {
    request: false,
    failedRequest: false,
    success: false,
  },
  logoutInfo: {
    request: false,
    failedRequest: false,
    success: false,
    message: "",
  },
};

export const userStateReducer = (
  state = userState,
  action: TUserActions
): TUser => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerInfo: {
          ...state.registerInfo,
          request: true,
          success: false,
          failedRequest: false,
        },
      };
    }
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        registerInfo: {
          ...state.registerInfo,
          request: false,
          success: true,
          failedRequest: false,
        },
      };
    }
    case REGISTER_REQUEST_FAILED: {
      return {
        ...state,
        registerInfo: {
          ...state.registerInfo,
          request: false,
          success: false,
          failedRequest: true,
        },
      };
    }
    case GET_CODE_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        codePasswordInfo: {
          ...state.codePasswordInfo,
          request: true,
          failedRequest: false,
        },
      };
    }
    case GET_CODE_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        codePasswordInfo: {
          ...state.codePasswordInfo,
          ...action.payload,
          request: false,
          failedRequest: false,
        },
      };
    }
    case GET_CODE_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        codePasswordInfo: {
          ...state.codePasswordInfo,
          request: false,
          failedRequest: true,
        },
      };
    }
    case CONFIRM_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        confirmResetPass: {
          ...state.confirmResetPass,
          request: true,
          failedRequest: false,
        },
      };
    }
    case CONFIRM_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        confirmResetPass: {
          ...state.confirmResetPass,
          ...action.payload,
          request: false,
          failedRequest: false,
        },
      };
    }
    case CONFIRM_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        confirmResetPass: {
          ...state.confirmResetPass,
          request: false,
          failedRequest: true,
        },
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          request: true,
          failedRequest: false,
        },
      };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loginInfo: {
          ...state.loginInfo,
          ...action.payload,
          request: false,
          failedRequest: false,
        },
      };
    }
    case LOGIN_REQUEST_FAILED: {
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          request: false,
          failedRequest: true,
        },
      };
    }

    case GET_PROFILE_REQUEST: {
      return {
        ...state,
        getProfileInfo: {
          ...state.getProfileInfo,
          request: true,
          failedRequest: false,
        },
      };
    }
    case GET_PROFILE_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        getProfileInfo: {
          ...state.getProfileInfo,
          success: action.payload.success,
          request: false,
          failedRequest: false,
        },
      };
    }
    case GET_PROFILE_REQUEST_FAILED: {
      return {
        ...state,
        getProfileInfo: {
          ...state.getProfileInfo,
          request: false,
          failedRequest: true,
        },
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutInfo: {
          ...state.logoutInfo,
          request: true,
          failedRequest: false,
        },
      };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutInfo: {
          ...state.logoutInfo,
          success: action.payload.success,
          message: action.payload.message,
          request: false,
          failedRequest: false,
        },
      };
    }
    case LOGOUT_REQUEST_FAILED: {
      return {
        ...state,
        logoutInfo: {
          ...state.logoutInfo,
          request: false,
          failedRequest: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};
