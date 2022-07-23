import { USER_LOGOUT, CHANGE_NAME, CHANGE_EMAIL, CHANGE_PASSWORD, USER_DATA_SUCCESS, USER_DATA_ERROR, USER_DATA_REQUEST, RESET_REQUEST, RESET_ERROR, RESET_SUCCESS, SET_PASSWORD_SUCCESS, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants";
import { TUserRequestActions } from "../actions/user-data";

type TUserState = {
  resetAnswer: boolean | '';
  resetPending: boolean;
  resetPasswordError: boolean;
  isPasswordChanged: boolean;
  userName: string;
  userEmail: string;
  isUserSent: boolean;
  userPassword: string;
  loginStatus: boolean;
  formName: string;
  formEmail: string;
  formPassword: string;

}


const userInitialState: TUserState = {
  resetAnswer: false,
  resetPending: false,
  resetPasswordError: false,
  isPasswordChanged: false,
  userEmail: '',
  userName: '',
  isUserSent: false,
  userPassword: '',
  loginStatus: false,
  formName: '',
  formEmail: '',
  formPassword: ''
}


export const userDataReducer = (state = userInitialState, action: TUserRequestActions) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        formPassword: action.password
      }
    case CHANGE_EMAIL:
      return {
        ...state,
        formEmail: action.email
      }
    case CHANGE_NAME:
      return {
        ...state,
        formName: action.name
      }
    case USER_LOGOUT:
      return {
        userEmail: '',
        userName: '',
        userPassword: ''
      }
    case USER_DATA_REQUEST:
      return {
        ...state
      }
    case USER_DATA_SUCCESS:
      return {
        ...state,
        userName: action.name,
        formName: action.name,
        formEmail: action.email,
        userEmail: action.email
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        userName: action.name,
        userEmail: action.email,
        loginStatus: action.status,
        formName: action.name,
        formEmail: action.email
      }
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isUserSent: true
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isUserSent: false,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,

      }
    case RESET_REQUEST:
      return {
        ...state,
        resetPending: true
      }
    case RESET_SUCCESS:
      return {
        resetAnswer: action.success,
        resetPending: false
      }
    case RESET_ERROR:
      return {
        ...state,
        resetPasswordError: true
      }
    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordChanged: true
      }
    default:
      return state

  }
}

