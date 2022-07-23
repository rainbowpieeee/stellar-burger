import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, OPEN_ORDER_POPUP, CLOSE_ORDER_POPUP } from "../constants";
import { TOrderDetailsActions } from "../actions/order-details";
import { TOrder } from '../types/data'

type TOrderState = {
  orderRequest: boolean,
  requestIsSuccessed: boolean,
  orderFailure: boolean,
  orderNumber: number | null,
  wholeOrder: TOrder | {},
  orderButtonIsClicked: boolean,
  buttonState: boolean;
}

const orderInitialState: TOrderState = {
  orderRequest: false,
  requestIsSuccessed: false,
  orderFailure: false,
  orderNumber: null,
  wholeOrder: {},
  orderButtonIsClicked: false,
  buttonState: true

}


export const orderReducer = (state = orderInitialState, action: TOrderDetailsActions): TOrderState => {
  switch (action.type) {
    case OPEN_ORDER_POPUP:
      return {
        ...state,
        orderButtonIsClicked: true,

      }
    case CLOSE_ORDER_POPUP:
      return {
        ...state,
        orderButtonIsClicked: false,
        requestIsSuccessed: false,
        orderNumber: null,
        wholeOrder: {},
        buttonState: false
      }
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderNumber: action.data,
        wholeOrder: action.orderData,
        requestIsSuccessed: action.result,

      }
    case GET_ORDER_ERROR:
      return {
        ...state,
        orderFailure: true,
        orderNumber: null,
      }
    default:
      return state
  }
}
