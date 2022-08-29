import { ThunkAction } from "redux-thunk";
import { TBurgerConstructorActions } from "../action/burger-constructor";
import { TBurgerIngredientsActions } from "../action/burger-ingredients";
import { TIngredientDetailsActions } from "../action/ingredient-details";
import { TOrderDetailsActions } from "../action/order-details";
import { ActionCreator, Action } from "redux";
import store from "../store";

type TApplicationActions =
  | TBurgerConstructorActions
  | TIngredientDetailsActions
  | TBurgerIngredientsActions
  | TOrderDetailsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
