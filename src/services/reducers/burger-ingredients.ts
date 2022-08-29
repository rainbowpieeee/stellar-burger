import {
  BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_REQUEST,
  INCREMENT_INGREDIENTS,
  INCREMENT_BUN,
  DECREMENT_INGREDIENTS,
  RESET_QTY_INGREDIENTS,
  TBurgerIngredientsActions,
} from "../action/burger-ingredients";
import { TIngredient } from "../types/data";

type TIngredientsState = {
  burgerIngredients: ReadonlyArray<TIngredient>;
  burgerIngredientsRequest: boolean;
  burgerIngredientsFailed: boolean;
};

const ingredientsInitialState: TIngredientsState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,
};

export const burgerIngredientsReducer = (
  state = ingredientsInitialState,
  action: TBurgerIngredientsActions
) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsInitialState: true };
    }
    case BURGER_INGREDIENTS_SUCCESS: {
      return {
        burgerIngredients: action.payload,
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: false,
      };
    }
    case BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: true,
      };
    }
    case INCREMENT_INGREDIENTS: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients].map((element) =>
          element._id === action.payload._id
            ? { ...element, qty: element.qty! + 1 || 1 }
            : element
        ),
      };
    }
    case DECREMENT_INGREDIENTS: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients].map((element) =>
          element._id === action.payload._id
            ? { ...element, qty: element.qty! - 1 || null }
            : element
        ),
      };
    }
    // Булка может быть одна
    // Если мы перетащили булку, то добавляем ей qty = 2(так как их две)
    // Остальным булкам убираем qty = null
    // Если это не булка, ничего не делаем
    case INCREMENT_BUN: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients].map((element) =>
          element._id === action.payload._id && element.type === "bun"
            ? { ...element, qty: 2 }
            : element.type === "bun"
            ? { ...element, qty: null }
            : element
        ),
      };
    }

    case RESET_QTY_INGREDIENTS: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients].map((element) => {
          return { ...element, qty: null };
        }),
      };
    }
    default: {
      return state;
    }
  }
};
