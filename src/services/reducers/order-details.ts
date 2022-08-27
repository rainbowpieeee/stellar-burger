import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  TOrderDetailsActions,
} from "../action/order-details";
import { TOrderSuccess } from "../types/data";

const orderInitState: TOrderSuccess & {
  orderRequest: boolean;
  orderFailed: boolean;
} = {
  orderRequest: false,
  orderFailed: false,
  order: { number: 0 },
  success: false,
  name: "",
};
export const orderStateReducer = (
  state = orderInitState,
  action: TOrderDetailsActions
) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        success: false,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        orderRequest: false,
        orderFailed: false,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        success: false,
      };
    }
    default: {
      return state;
    }
  }
};
