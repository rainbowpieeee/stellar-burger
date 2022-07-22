import { combineReducers } from 'redux';

import { burgerDataReducer } from './burger-ingredients'
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order-details';
import { constructorReducer } from './burger-constructor';
import { userDataReducer } from './user';

export const rootReducer = combineReducers({
  burgerData: burgerDataReducer,
  currentSelect: ingredientReducer,
  currentOrder: orderReducer,
  constructorState: constructorReducer,
  userState: userDataReducer
})
