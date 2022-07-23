import { WS_AUTH_CONNECTION_ERROR, WS_AUTH_CONNECTION_SUCCESS, WS_AUTH_CONNECTION_GET_MESSAGE, WS_AUTH_CONNECTION_START } from "../constants";
import {  TFeedOrdersResult } from "../types/data";

export interface IAuthConnectionStart {
  readonly type: typeof WS_AUTH_CONNECTION_START
}


export interface IAuthConnectionError {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}

export interface IAuthConnectionSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

export interface iAuthConnectionGetMessage {
  readonly type: typeof WS_AUTH_CONNECTION_GET_MESSAGE;
  readonly payload: TFeedOrdersResult;
}

export type TAuthOrdersFeedActions = IAuthConnectionError | IAuthConnectionSuccess | iAuthConnectionGetMessage;
