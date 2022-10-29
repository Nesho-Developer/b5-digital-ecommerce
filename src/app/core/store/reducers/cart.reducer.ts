import * as CartActions from '../actions';
import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../model/produect.models';

export const CART_INITIAL_STATE: Cart = {
  discountedTotal: 0,
  id: 0,
  products: [],
  total: 0,
  totalProducts: 0,
  totalQuantity: 0,
  userId: 0,
};

export const cartReducer = createReducer(
  CART_INITIAL_STATE,
  on(CartActions.CreateCart, (state, { payload }) => {
    return {
      ...state,
      payload,
    };
  }),
  on(CartActions.LoadCart, (state, { payload }) => {
    return {
      ...state,
      payload,
    };
  }),
  on(CartActions.LoadUserCart, (state, { payload }) => {
    return {
      ...state,
      payload,
    };
  }),
  on(CartActions.AddToCart, (state, { payload }) => {
    return {
      ...state,
    };
  }),
  on(CartActions.RemoveFromCart, (state, { payload }) => {
    return {
      ...state,
      payload,
    };
  }),
  on(CartActions.StoreCart, (state, { payload }) => {
    console.log(payload);
    return {
      ...state,
      ...payload,
    };
  })
);
