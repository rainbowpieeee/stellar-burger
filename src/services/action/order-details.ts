import { sendOrderRequest } from "../api";
import { AppDispatch, AppThunk } from "../types";
import { TOrderSuccess } from "../types/data";

export const ORDER_REQUEST: "ORDER_REQUEST" = "ORDER_REQUEST";
export const ORDER_SUCCESS: "ORDER_SUCCESS" = "ORDER_SUCCESS";
export const ORDER_FAILED: "ORDER_FAILED" = "ORDER_FAILED";

export interface IReqOrder {
  readonly type: typeof ORDER_REQUEST;
}

export interface ISetInfoOrder {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: TOrderSuccess;
}

export interface ISetReqOrderFailed {
  readonly type: typeof ORDER_FAILED;
}

export const reqOrder = (): IReqOrder => ({
  type: ORDER_REQUEST,
});

export const setInfoOrder = (payload: TOrderSuccess): ISetInfoOrder => ({
  type: ORDER_SUCCESS,
  payload,
});

export const setReqOrderFailed = (): ISetReqOrderFailed => ({
  type: ORDER_FAILED,
});

export const sendOrderThunk: AppThunk = (idList: ReadonlyArray<string>) => {
  return function (dispatch: AppDispatch) {
    dispatch(reqOrder());
    sendOrderRequest(idList)
      .then((res) => {
        dispatch(setInfoOrder(res));
      })
      .catch((e) => {
        console.log(e);
        dispatch(setReqOrderFailed());
      });
  };
};

export type TOrderDetailsActions =
  | IReqOrder
  | ISetInfoOrder
  | ISetReqOrderFailed;
