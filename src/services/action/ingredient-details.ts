import { TIngredient } from "../types/data";

export const SET_INGREDIENT_DETAIL: "SET_INGREDIENT_DETAIL" =
  "SET_INGREDIENT_DETAIL";
export const INIT_INGREDIENT_DETAIL = "INIT_INGREDIENT_DETAIL";

export interface TSetDetailInfoIngredient {
  readonly type: typeof SET_INGREDIENT_DETAIL;
  readonly payload: TIngredient;
}

export interface TSetDefaultValuesIngredientDetail {
  readonly type: typeof INIT_INGREDIENT_DETAIL;
}

export const setDetailInfoIngredient = (
  payload: TIngredient
): TSetDetailInfoIngredient => ({
  type: SET_INGREDIENT_DETAIL,
  payload,
});

export const setDefaultValuesIngredientDetail =
  (): TSetDefaultValuesIngredientDetail => ({
    type: INIT_INGREDIENT_DETAIL,
  });

export type TIngredientDetailsActions =
  | TSetDetailInfoIngredient
  | TSetDefaultValuesIngredientDetail;
