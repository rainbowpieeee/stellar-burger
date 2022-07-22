import { BURGER_DATA_REQUEST, BURGER_DATA_SUCCESS, BURGER_DATA_ERROR, ADD_AMMOUNT, DECREASE_AMOUNT, CLEAN_INGREDIENTS_AMOUNTS } from "../constants";
import { TIngredient } from '../types/data';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';

type TBurgerIngredientsState = {
  ingredients: Array<TIngredient>;
  dataRequest: boolean;
  dataRequestFailed: boolean;
}

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  dataRequest: true,
  dataRequestFailed: false
}

export const burgerDataReducer = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientsState => {
  switch (action.type) {
    case BURGER_DATA_REQUEST:
      return {
        ...state,

      };
    case BURGER_DATA_SUCCESS:
      return {
        ...state,
        ingredients: action.data.map(item => { return { ...item, amount: 0 } }),
        dataRequest: false
      };
    case BURGER_DATA_ERROR:
      return {
        ...state,
        ingredients: [],
        dataRequest: false,
        dataRequestFailed: true,

      };
    case ADD_AMMOUNT:
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          return item._id === action.id && item.type !== 'bun' ? { ...item, amount: item.amount + 1 } : item
        })
      }
    case DECREASE_AMOUNT:
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          return item._id === action.id ? { ...item, amount: item.amount - 1 } : item
        })
      }
    case CLEAN_INGREDIENTS_AMOUNTS:
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          return { ...item, amount: 0 }
        })
      }
    default:
      return state;
  }
}
