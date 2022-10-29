import { ActionReducerMap } from '@ngrx/store';
import * as cartReducer from './cart.reducer';
import { Cart } from '../../model/produect.models';

// Feature by core module
export interface AppState {
  cartReducer: Cart;
}

export const reducers: ActionReducerMap<AppState> = {
  cartReducer: cartReducer.cartReducer,
};
