import { CLICK_ON_ORDER, WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_CLOSE_CONNECTION } from "../constants";
import {  TFeedOrdersResult } from "../types/data";

export interface IClickOnOrder {
  readonly type: typeof CLICK_ON_ORDER;
  payload: number;
}

export interface IWsCloseConnection {
  readonly type: typeof WS_CLOSE_CONNECTION;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload: Event;
}


export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: Event;
}

export interface IWsConnectionGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TFeedOrdersResult;
}

export interface IWsConnectionSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: { [key in any]: any };
}

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload: Event;
}

export type WsActionsForReducer = IWsConnectionSuccessAction | IClickOnOrder | IWsConnectionErrorAction | IWsConnectionGetMessageAction | IWsConnectionCloseAction;


