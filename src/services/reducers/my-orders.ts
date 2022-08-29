import {
  TMyOrdersWsActions,
  MY_ORDERS_CONNECTION_SUCCESS,
  MY_ORDERS_CONNECTION_ERROR,
  MY_ORDERS_GET_MESSAGE,
  MY_ORDERS_CONNECTION_CLOSED,
} from "../action/ws-my-orders";
import { orderStatus } from "../constant";

const initState: {
  connected: boolean;
  error: boolean;
  total: number;
  totalToday: number;
  orders: ReadonlyArray<{
    ingredients: ReadonlyArray<string>;
    id: string;
    status: orderStatus;
    number: number;
    createdAt: string;
    updateAt: string;
    name: string;
  }>;
} = {
  connected: false,
  error: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const myOrdersReducer = (
  state = initState,
  action: TMyOrdersWsActions
) => {
  switch (action.type) {
    case MY_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        connected: true,
        error: false,
      };
    }
    case MY_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        connected: false,
        error: true,
      };
    }
    case MY_ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        connected: false,
        error: false,
      };
    }
    case MY_ORDERS_GET_MESSAGE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
