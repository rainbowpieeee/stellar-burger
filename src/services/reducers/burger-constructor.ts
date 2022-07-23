import { ADD_ITEM, ADD_BUN, DELETE_INGREDIENT, CLEAN_STATE, REORDER_INGREDIENTS } from "../constants";
import { TBurgerConstructorActions } from "../actions/burger-consructor";
import { TIngredient } from "../types/data"

type TBurgerConstructorState = {
  elements: Array<TIngredient>;
  bun: TIngredient | { [key in any]: never };
}

const constructorInitialState: TBurgerConstructorState = {
  elements: [],
  bun: {}
}

export const constructorReducer = (state = constructorInitialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.bunItem ? { ...action.bunItem, amount: 2 } : state.bun
      }
    case ADD_ITEM:
      return {
        ...state,
        elements: [...state.elements, ...action.data]
      }
    case DELETE_INGREDIENT:
      return {
        ...state,
        elements: [...state.elements].filter(item => { return item.uid !== action.id })

      }
    case REORDER_INGREDIENTS:
      return {
        ...state,
        elements: action.data
      }
    case CLEAN_STATE:
      return {
        ...state,
        elements: [],
        bun: {}
      }
    default:
      return state

  }
}
