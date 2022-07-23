import Api from "../../utils/Api";
import { OPEN_ORDER_POPUP, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, CLOSE_ORDER_POPUP } from "../constants";
import { TOrder } from "../types/data";
import { AppThunk, TAppDispatch } from "../types";
import { getCookie, setCookie } from "../../utils/utils";
import { refreshMainToken } from "../../utils/utils";

export interface IOpenOrderPopupAction {
  readonly type: typeof OPEN_ORDER_POPUP;
}

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly data: number;
  readonly orderData: TOrder;
  readonly result: boolean;
}

export interface IGetOrderErrorAction {
  readonly type: typeof GET_ORDER_ERROR;
}

export interface ICloseOrderPopupAction {
  readonly type: typeof CLOSE_ORDER_POPUP;
}


export type TOrderDetailsActions = IOpenOrderPopupAction | IGetOrderRequestAction | IGetOrderSuccessAction | IGetOrderErrorAction | ICloseOrderPopupAction;






export const getOrderNumber: AppThunk = (idData: string[], token: string, refresh: string, callback:(res:any)=> void) => {
  return function (dispatch: TAppDispatch) {
    dispatch({ type: GET_ORDER_REQUEST })
    Api.getOrderNumber(idData, token, refresh, callback)
      .then(res => {
        dispatch({ type: GET_ORDER_SUCCESS, data: res.order.number, orderData: res, result: res.success })
      })


  }
}
