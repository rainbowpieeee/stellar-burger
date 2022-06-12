import { BURGER_DATA_REQUEST, BURGER_DATA_SUCCESS, BURGER_DATA_ERROR, ADD_AMMOUNT, DECREASE_AMOUNT } from "../actions/burger-ingredients";

const initialState = {
    ingredients: [],
    dataRequest: false,
    dataRequestFailed: false
}

export const burgerDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case BURGER_DATA_REQUEST:
            return {
                ...state,
                dataRequest: true
            };
        case BURGER_DATA_SUCCESS:
            return {
                ...state,
                ingredients: action.data.map(item => { return {...item, amount: 0 } }),
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
                    return item._id === action.id && item.type !== 'bun' ? {...item, amount: item.amount + 1 } : item
                })
            }
        case DECREASE_AMOUNT:
            return {
                ...state,
                ingredients: [...state.ingredients].map(item => {
                    return item._id === action.id ? {...item, amount: item.amount - 1 } : item
                })
            }
        default:
            return {...state };
    }
}
