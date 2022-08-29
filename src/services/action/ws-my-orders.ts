export const MY_ORDERS_CONNECTION_INIT: "MY_ORDERS_CONNECTION_INIT" =
  "MY_ORDERS_CONNECTION_INIT";
export const MY_ORDERS_CONNECTION_CLOSE: "MY_ORDERS_CONNECTION_CLOSE" =
  "MY_ORDERS_CONNECTION_CLOSE";
export const MY_ORDERS_CONNECTION_SUCCESS: "MY_ORDERS_CONNECTION_SUCCESS" =
  "MY_ORDERS_CONNECTION_SUCCESS";
export const MY_ORDERS_CONNECTION_ERROR: "MY_ORDERS_CONNECTION_ERROR" =
  "MY_ORDERS_CONNECTION_ERROR";
export const MY_ORDERS_CONNECTION_CLOSED: "MY_ORDERS_CONNECTION_CLOSED" =
  "MY_ORDERS_CONNECTION_CLOSED";
export const MY_ORDERS_GET_MESSAGE: "MY_ORDERS_GET_MESSAGE" =
  "MY_ORDERS_GET_MESSAGE";

export interface IMyOrdersWsInit {
  readonly type: typeof MY_ORDERS_CONNECTION_INIT;
  readonly payload: string;
}

export interface IMyOrdersWsClose {
  readonly type: typeof MY_ORDERS_CONNECTION_CLOSE;
}

export interface IMyOrdersWsConnectionSuccess {
  readonly type: typeof MY_ORDERS_CONNECTION_SUCCESS;
}

export interface IMyOrdersWsConnectionError {
  readonly type: typeof MY_ORDERS_CONNECTION_ERROR;
}

export interface IMyOrdersWsConnectionClosed {
  readonly type: typeof MY_ORDERS_CONNECTION_CLOSED;
}

export interface IMyOrdersWsGetMessage {
  readonly type: typeof MY_ORDERS_GET_MESSAGE;
  readonly payload: Event;
}

export const myOrdersWsInit = (payload: string): IMyOrdersWsInit => {
  return {
    type: MY_ORDERS_CONNECTION_INIT,
    payload,
  };
};

export const myOrdersWsClose = (): IMyOrdersWsClose => {
  return {
    type: MY_ORDERS_CONNECTION_CLOSE,
  };
};

export const myOrdersConnectionSuccess = (): IMyOrdersWsConnectionSuccess => {
  return {
    type: MY_ORDERS_CONNECTION_SUCCESS,
  };
};

export const myOrdersConnectionError = (): IMyOrdersWsConnectionError => {
  return {
    type: MY_ORDERS_CONNECTION_ERROR,
  };
};

export const myOrdersConnectionClosed = (): IMyOrdersWsConnectionClosed => {
  return {
    type: MY_ORDERS_CONNECTION_CLOSED,
  };
};

export const myOrdersGetMessage = (message: Event): IMyOrdersWsGetMessage => {
  return {
    type: MY_ORDERS_GET_MESSAGE,
    payload: message,
  };
};

export type TMyOrdersWsActions =
  | IMyOrdersWsInit
  | IMyOrdersWsConnectionSuccess
  | IMyOrdersWsConnectionError
  | IMyOrdersWsConnectionClosed
  | IMyOrdersWsGetMessage;
