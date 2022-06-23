import { ADD_ITEM, ADD_BUN, DELETE_INGREDIENT, CLEAN_STATE, REORDER_INGREDIENTS } from "../actions/burger-consructor";

const constructorInitialState = {
    elements: [],
    bun: ''
}

export const constructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case ADD_BUN:
            return {
                ...state,
                bun: action.bunItem ? {...action.bunItem, amount: 2 } : state.bun
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
                bun: ''
            }
        default:
            return state

    }
}
