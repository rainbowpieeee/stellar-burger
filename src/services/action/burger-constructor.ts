import { TIngredientWithUniqKey } from "../types/data";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const DELETE_ITEM: "DELETE_ITEM" = "DELETE_ITEM";
export const REORDER_INGREDIENTS: "REORDER_INGREDIENTS" = "REORDER_INGREDIENTS";
export const SET_DEFAULT_VALUE_INGREDIENTS: "SET_DEFAULT_VALUE_INGREDIENTS" =
  "SET_DEFAULT_VALUE_INGREDIENTS";

export interface IAddIngredientToConstructor {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredientWithUniqKey;
}

export interface IAddBunToConstructor {
  readonly type: typeof ADD_BUN;
  readonly payload: TIngredientWithUniqKey;
}

export interface IDeleteItemById {
  readonly type: typeof DELETE_ITEM;
  readonly id: string;
}

export interface IReorderIngredients {
  readonly type: typeof REORDER_INGREDIENTS;
  payload: ReadonlyArray<TIngredientWithUniqKey>;
}

export interface ISetDefaultValueIngredients {
  readonly type: typeof SET_DEFAULT_VALUE_INGREDIENTS;
}

export const addIngredientToConstructor = (
  payload: TIngredientWithUniqKey
): IAddIngredientToConstructor => ({
  type: ADD_INGREDIENT,
  payload,
});

export const addBunToConstructor = (
  payload: TIngredientWithUniqKey
): IAddBunToConstructor => ({
  type: ADD_BUN,
  payload,
});

export const deleteItemById = (id: string): IDeleteItemById => ({
  type: DELETE_ITEM,
  id,
});

export const reorderIngredients = (
  payload: ReadonlyArray<TIngredientWithUniqKey>
): IReorderIngredients => ({
  type: REORDER_INGREDIENTS,
  payload,
});

export const setDefaultValueIngredients = (): ISetDefaultValueIngredients => ({
  type: SET_DEFAULT_VALUE_INGREDIENTS,
});

export type TBurgerConstructorActions =
  | IAddIngredientToConstructor
  | IAddBunToConstructor
  | IDeleteItemById
  | IReorderIngredients
  | ISetDefaultValueIngredients;
