import {
  ADD_INGREDIENT,
  DELETE_ITEM,
  ADD_BUN,
  REORDER_INGREDIENTS,
  SET_DEFAULT_VALUE_INGREDIENTS,
  TBurgerConstructorActions,
} from "../action/burger-constructor";
import { TIngredientWithUniqKey } from "../types/data";

type TConstructorState = {
  ingredients: Array<TIngredientWithUniqKey>;
};

const constructorInitialState: TConstructorState = {
  ingredients: [],
};

export const burgerConstructorReducer = (
  state = constructorInitialState,
  action: TBurgerConstructorActions
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case ADD_BUN: {
      const indexElement = [...state.ingredients].findIndex((element) => {
        return element.type === "bun";
      });
      // Если булки нет в массиве, то добавляем
      // Если есть, то ищем индекс и меняем
      const res =
        indexElement === -1
          ? [action.payload, ...state.ingredients]
          : [
              ...state.ingredients.slice(0, indexElement),
              action.payload,
              ...state.ingredients.slice(indexElement + 1),
            ];

      return {
        ...state,
        ingredients: res,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter((element) => {
          return element.uuid !== action.id;
        }),
      };
    }
    case REORDER_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...action.payload],
      };
    }
    case SET_DEFAULT_VALUE_INGREDIENTS: {
      return {
        ...constructorInitialState,
      };
    }
    default: {
      return state;
    }
  }
};
