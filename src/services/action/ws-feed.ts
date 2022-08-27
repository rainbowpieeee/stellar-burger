export const FEED_CONNECTION_INIT: "FEED_CONNECTION_INIT" =
  "FEED_CONNECTION_INIT";
export const FEED_CONNECTION_CLOSE: "FEED_CONNECTION_CLOSE" =
  "FEED_CONNECTION_CLOSE";
export const FEED_CONNECTION_SUCCESS: "FEED_CONNECTION_SUCCESS" =
  "FEED_CONNECTION_SUCCESS";
export const FEED_CONNECTION_ERROR: "FEED_CONNECTION_ERROR" =
  "FEED_CONNECTION_ERROR";
export const FEED_CONNECTION_CLOSED: "FEED_CONNECTION_CLOSED" =
  "FEED_CONNECTION_CLOSED";
export const FEED_GET_MESSAGE: "FEED_GET_MESSAGE" = "FEED_GET_MESSAGE";

export interface IFeedWsInit {
  readonly type: typeof FEED_CONNECTION_INIT;
  readonly payload: string;
}

export interface IFeedWsClose {
  readonly type: typeof FEED_CONNECTION_CLOSE;
}

export interface IFeedWsConnectionSuccess {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
}

export interface IFeedWsConnectionError {
  readonly type: typeof FEED_CONNECTION_ERROR;
}

export interface IFeedWsConnectionClosed {
  readonly type: typeof FEED_CONNECTION_CLOSED;
}

export interface IFeedWsGetMessage {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: Event;
}

export const feedWsInit = (payload: string): IFeedWsInit => {
  return {
    type: FEED_CONNECTION_INIT,
    payload,
  };
};

export const feedWsClose = (): IFeedWsClose => {
  return {
    type: FEED_CONNECTION_CLOSE,
  };
};

export const feedConnectionSuccess = (): IFeedWsConnectionSuccess => {
  return {
    type: FEED_CONNECTION_SUCCESS,
  };
};

export const feedConnectionError = (): IFeedWsConnectionError => {
  return {
    type: FEED_CONNECTION_ERROR,
  };
};

export const feedConnectionClosed = (): IFeedWsConnectionClosed => {
  return {
    type: FEED_CONNECTION_CLOSED,
  };
};

export const feedGetMessage = (message: Event): IFeedWsGetMessage => {
  return {
    type: FEED_GET_MESSAGE,
    payload: message,
  };
};

export type TFeedWsActions =
  | IFeedWsInit
  | IFeedWsConnectionSuccess
  | IFeedWsConnectionError
  | IFeedWsConnectionClosed
  | IFeedWsGetMessage;
