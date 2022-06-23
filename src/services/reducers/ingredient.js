import { CLICK_ON_INGREDIENT, CLICK_ON_CLOSE_BUTTON } from "../actions/ingredient";

const currentChoiceInitialState = {
    itemIsClicked: false,
    currentItem: {}
}


export const ingredientReducer = (state = currentChoiceInitialState, action) => {
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
