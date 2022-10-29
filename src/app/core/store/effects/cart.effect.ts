import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  AddToCart,
  CreateCart,
  LoadCart,
  LoadUserCart,
  RemoveFromCart,
  StoreCart,
} from '../actions';
import { of } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { CartService } from '../../service/cart.service';

@Injectable()
export class CartEffects {
  constructor(
    private _actions$: Actions,
    private cartService: CartService,
    private _store$: Store<AppState>
  ) {}

  createCart$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(CreateCart),
        map((action) => {
          return action.payload;
        }),

        switchMap((payload) => {
          return this.cartService.createCart(payload.userId).pipe(
            tap(({ carts }) => {
              console.log(carts);
              localStorage.setItem('cartId', carts[0].id.toString());
              this._store$.dispatch(StoreCart({ payload: carts[0] }));
            }),
            catchError((payload) => {
              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );
  loadCart$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(LoadCart),
        map((action) => {
          return action.payload.cartId;
        }),

        switchMap((CartId: number) => {
          return this.cartService.getCart(CartId).pipe(
            tap((payload) => {
              this._store$.dispatch(StoreCart({ payload: payload }));
            }),
            catchError((payload) => {
              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );
  loadUserCart$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(LoadUserCart),
        map((action) => {
          return action.payload.userId;
        }),

        switchMap((userId: number) => {
          return this.cartService.getUserCart(userId).pipe(
            tap(({ carts }) => {
              localStorage.setItem('cartId', carts[0].id.toString());
              this._store$.dispatch(StoreCart({ payload: carts[0] }));
            }),
            catchError((payload) => {
              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );

  addToCart$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AddToCart),
        map((action) => {
          return action.payload;
        }),

        switchMap((payload) => {
          return this.cartService
            .addToCart(payload.cartId, payload.products)
            .pipe(
              tap((payload) => {
                this._store$.dispatch(StoreCart({ payload: payload }));
              }),
              catchError((payload) => {
                return of(null);
              })
            );
        })
      ),
    { dispatch: false }
  );
  removeFromCart$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RemoveFromCart),
        map((action) => {
          return action.payload;
        })

        // switchMap(({ cartId, itemId }) => {
        //   return this.cartService.removeFromCart(cartId, itemId).pipe(
        //     tap((payload) => {
        //       this.openSnackBar(payload?.Result?.StatusMessage ?? '');
        //       if ([1, 2].includes(payload.Result.StatusCode)) {
        //         const { UserCart } = payload;
        //         this._store$.dispatch(StoreCart({ payload: UserCart }));
        //       }
        //     }),
        //     catchError((payload) => {
        //       return of(null);
        //     })
        //   );
        // })
      ),
    { dispatch: false }
  );
}
