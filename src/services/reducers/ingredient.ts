import { CLICK_ON_INGREDIENT, CLICK_ON_CLOSE_BUTTON } from "../constants";
import { TIngredientActions } from "../actions/ingredient";
import { TIngredient } from '../types/data';

type TCurrentChoice = {
  itemIsClicked: boolean;
  currentItem: TIngredient | { [key in any]: never };
}

const currentChoiceInitialState: TCurrentChoice = {
  itemIsClicked: false,
  currentItem: {}
}


export const ingredientReducer = (state = currentChoiceInitialState, action: TIngredientActions): TCurrentChoice => {
  switch (action.type) {
    case CLICK_ON_INGREDIENT:
      return {
        ...state,
        itemIsClicked: true,
        currentItem: action.item[0]
      }
    case CLICK_ON_CLOSE_BUTTON:
      return {
        ...state,
        itemIsClicked: false,
        currentItem: {}
      }
    default:
      return state
  }
}
