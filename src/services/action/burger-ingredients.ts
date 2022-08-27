import { getIngredientItemsRequest } from "../api";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient } from "../types/data";

export const BURGER_INGREDIENTS_REQUEST: "BURGER_INGREDIENTS_REQUEST" =
  "BURGER_INGREDIENTS_REQUEST";
export const BURGER_INGREDIENTS_SUCCESS: "BURGER_INGREDIENTS_SUCCESS" =
  "BURGER_INGREDIENTS_SUCCESS";
export const BURGER_INGREDIENTS_FAILED: "BURGER_INGREDIENTS_FAILED" =
  "BURGER_INGREDIENTS_FAILED";
export const INCREMENT_INGREDIENTS: "INCREMENT_INGREDIENTS" =
  "INCREMENT_INGREDIENTS";
export const INCREMENT_BUN: "INCREMENT_BUN" = "INCREMENT_BUN";
export const DECREMENT_INGREDIENTS: "DECREMENT_INGREDIENTS" =
  "DECREMENT_INGREDIENTS";
export const RESET_QTY_INGREDIENTS: "RESET_QTY_INGREDIENTS" =
  "RESET_QTY_INGREDIENTS";

export interface IReqIngredient {
  readonly type: typeof BURGER_INGREDIENTS_REQUEST;
}

export interface ISetIngredientsValue {
  readonly type: typeof BURGER_INGREDIENTS_SUCCESS;
  readonly payload: ReadonlyArray<TIngredient>;
}

export interface ISetReqIngredientsFailed {
  readonly type: typeof BURGER_INGREDIENTS_FAILED;
}

export interface IIncrementQtyIngredient {
  readonly type: typeof INCREMENT_INGREDIENTS;
  readonly payload: TIngredient;
}

export interface IIncrementQtyBunt {
  readonly type: typeof INCREMENT_BUN;
  readonly payload: TIngredient;
}

export interface IDecrementQtyIngredients {
  readonly type: typeof DECREMENT_INGREDIENTS;
  readonly payload: TIngredient;
}

export interface IResetQtyIngredients {
  readonly type: typeof RESET_QTY_INGREDIENTS;
}

export const reqIngredient = (): IReqIngredient => ({
  type: BURGER_INGREDIENTS_REQUEST,
});

export const setIngredientsValue = (
  payload: ReadonlyArray<TIngredient>
): ISetIngredientsValue => ({
  type: BURGER_INGREDIENTS_SUCCESS,
  payload,
});

export const setReqIngredientsFailed = (): ISetReqIngredientsFailed => ({
  type: BURGER_INGREDIENTS_FAILED,
});

export const incrementQtyIngredient = (
  payload: TIngredient
): IIncrementQtyIngredient => ({
  type: INCREMENT_INGREDIENTS,
  payload,
});

export const incrementQtyBun = (payload: TIngredient): IIncrementQtyBunt => ({
  type: INCREMENT_BUN,
  payload,
});

export const decrementQtyIngredients = (
  payload: TIngredient
): IDecrementQtyIngredients => ({
  type: DECREMENT_INGREDIENTS,
  payload,
});

export const resetQtyIngredients = (): IResetQtyIngredients => ({
  type: RESET_QTY_INGREDIENTS,
});

export const getIngredientItemsThunk: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(reqIngredient());
    getIngredientItemsRequest()
      .then((res) => {
        dispatch(setIngredientsValue(res.data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(setReqIngredientsFailed());
      });
  };
};

export type TBurgerIngredientsActions =
  | IReqIngredient
  | ISetIngredientsValue
  | ISetReqIngredientsFailed
  | IIncrementQtyIngredient
  | IIncrementQtyBunt
  | IDecrementQtyIngredients
  | IResetQtyIngredients;
