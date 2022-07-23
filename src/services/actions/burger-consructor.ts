import { ADD_ITEM, ADD_BUN, DELETE_INGREDIENT, REORDER_INGREDIENTS, CLEAN_STATE } from "../constants";
import { TIngredient } from "../types/data";


export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly data: Array<TIngredient>;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly bunItem: TIngredient;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly id: number;
}

export interface IReorderIngredientsAction {
  readonly type: typeof REORDER_INGREDIENTS;
  readonly data: Array<TIngredient>;
}

export interface ICleanStateAction {
  readonly type: typeof CLEAN_STATE;
}

export type TBurgerConstructorActions = IAddItemAction | IAddBunAction | IDeleteIngredientAction | IReorderIngredientsAction | ICleanStateAction;

