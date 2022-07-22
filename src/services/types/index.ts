import { state } from "../../index";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TOrderDetailsActions } from "../actions/order-details";
import { TUserRequestActions} from "../actions/user-data";

export type TRootState = ReturnType<typeof state.getState>

type TApplicationActions = TOrderDetailsActions | TBurgerIngredientsActions | TUserRequestActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type TAppDispatch = typeof state.dispatch

