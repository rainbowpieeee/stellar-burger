import { combineReducers } from 'redux';
import { FeedReducer } from './feed-reducer';
import { burgerDataReducer } from './burger-ingredients'
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order-details';
import { constructorReducer } from './burger-constructor';
import { userDataReducer } from './user';
import { userOrdersFeedReducer } from './authuser-orders-feed';

export const rootReducer = combineReducers({
  burgerData: burgerDataReducer,
  currentSelect: ingredientReducer,
  currentOrder: orderReducer,
  constructorState: constructorReducer,
  userState: userDataReducer,
  ordersFeed: FeedReducer,
  userFeed: userOrdersFeedReducer
})
