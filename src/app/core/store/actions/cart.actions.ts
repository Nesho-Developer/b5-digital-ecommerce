import { ActionType, createAction, props } from '@ngrx/store';
import { Cart } from '../../model/produect.models';

export const APP_CART = '@App/cart';
export const STORE_CART = '@App/StoreCart';
export const LOAD_CART = '@App/loadCart';
export const LOAD_USER_CART = '@App/loadUserCart';
export const ADD_TO_CART = '@App/addToCart';
export const REMOVE_FROM_CART = '@App/removeFromCart';

export const CreateCart = createAction(
  APP_CART,
  props<{
    payload: { userId: number };
  }>()
);
export const LoadCart = createAction(
  LOAD_CART,
  props<{
    payload: { cartId: number };
  }>()
);
export const LoadUserCart = createAction(
  LOAD_USER_CART,
  props<{
    payload: { userId: number };
  }>()
);
export const AddToCart = createAction(
  ADD_TO_CART,
  props<{
    payload: {
      cartId: number;
      products: {
        id: number;
        quantity: number;
      };
    };
  }>()
);
export const RemoveFromCart = createAction(
  REMOVE_FROM_CART,
  props<{
    payload: { itemId: number; cartId: number };
  }>()
);
export const StoreCart = createAction(
  STORE_CART,
  props<{
    payload: Cart;
  }>()
);

export type CartActions =
  | ActionType<typeof LoadCart>
  | ActionType<typeof AddToCart>
  | ActionType<typeof StoreCart>;
