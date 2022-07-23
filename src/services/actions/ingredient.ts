import { CLICK_ON_INGREDIENT, CLICK_ON_CLOSE_BUTTON } from "../constants";
import { TIngredient } from "../types/data";

export interface IClickOnIngredientAction {
  readonly type: typeof CLICK_ON_INGREDIENT;
  readonly item: Array<TIngredient>;
}

export interface IClickOnCloseButtonAction {
  readonly type: typeof CLICK_ON_CLOSE_BUTTON;
}

export type TIngredientActions = IClickOnIngredientAction | IClickOnCloseButtonAction;


