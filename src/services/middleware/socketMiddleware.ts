import {  WS_CONNECTION_CLOSED,  WS_SEND_MESSAGE } from "../constants";
import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/utils";



export const socketMiddleware = (wsUrl: string, wsActions: { [key in any]: any }, isAuth?: boolean) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (A: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsSuccess, wsError, wsMessage, wsClose, WS_CONNECTION_CLOSED, WS_SEND_MESSAGE } = wsActions;
      const accessToken = isAuth && getCookie('token')
      if (type === wsStart) {
        socket = isAuth ? new WebSocket(`${wsUrl}?token=${accessToken}`) : new WebSocket(`${wsUrl}${payload}`);
      }


      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type:wsSuccess, payload: event });

        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: wsError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const data = JSON.parse(event.data)

          dispatch({ type: wsMessage, payload: data });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }

        if (type === wsClose) {
          socket.close()
        }
      }

      next(action);
    };
  };
};
