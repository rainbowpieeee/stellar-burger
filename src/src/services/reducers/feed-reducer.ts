import {CLICK_ON_ORDER, WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE } from "../constants";
import {  TFeedOrdersResult  } from '../types/data';
import { WsActionsForReducer } from '../actions/orders-feed';

type TFeedReducerState = {
  ordersData: TFeedOrdersResult  | null,
  wsConnected: boolean,
  error: boolean,
  orderNumber: number | null;
}

const FeedReducerState: TFeedReducerState = {
  ordersData: null,
  wsConnected: false,
  error: false,
  orderNumber: null
}



export const FeedReducer = (state = FeedReducerState, action: WsActionsForReducer): TFeedReducerState => {
  switch (action.type) {
    case CLICK_ON_ORDER:
      return {
        ...state,
        orderNumber: action.payload
      }
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      }
    case WS_GET_MESSAGE:
      return {
        ...state,
        ordersData: action.payload
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected:false
      }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}



