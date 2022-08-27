import {
  SET_INGREDIENT_DETAIL,
  INIT_INGREDIENT_DETAIL,
  TIngredientDetailsActions,
} from "../action/ingredient-details";
import { TIngredient } from "../types/data";

type TIngredientWithNull<T> = { [k in keyof T]: T[k] | null };

const ingredientDetailState: TIngredientWithNull<TIngredient> = {
  calories: null,
  carbohydrates: null,
  fat: null,
  image: null,
  image_large: null,
  image_mobile: null,
  name: null,
  price: null,
  proteins: null,
  type: null,
  __v: null,
  _id: null,
};

export const ingredientDetailsReducer = (
  state = ingredientDetailState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAIL: {
      return {
        ...action.payload,
      };
    }
    case INIT_INGREDIENT_DETAIL: {
      return {
        ...ingredientDetailState,
      };
    }
    default: {
      return state;
    }
  }
};
