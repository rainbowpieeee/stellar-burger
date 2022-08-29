import {
  TFeedWsActions,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_CLOSED,
} from "../action/ws-feed";
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

export const feedReducer = (state = initState, action: TFeedWsActions) => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        connected: true,
        error: false,
      };
    }
    case FEED_CONNECTION_ERROR: {
      return {
        ...state,
        connected: false,
        error: true,
      };
    }
    case FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        connected: false,
        error: false,
      };
    }
    case FEED_GET_MESSAGE: {
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
