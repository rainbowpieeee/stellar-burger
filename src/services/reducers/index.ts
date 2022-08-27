import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderStateReducer } from "./order-details";
import { userStateReducer } from "./user";
import { feedReducer } from "./feed";
import { myOrdersReducer } from "./my-orders";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderInfo: orderStateReducer,
  userInfo: userStateReducer,
  feed: feedReducer,
  myOrders: myOrdersReducer,
});
