import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { effects } from './effects';
import { AppState, reducers } from './reducers';
import { environment } from '../../../environments/environment';

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({
    keys: ['cart'],
    rehydrate: true,
    storage: localStorage,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

export const STORE_DEV_TOOLS: any[] | ModuleWithProviders<any> =
  environment.production
    ? []
    : StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: !environment.production,
      });

@NgModule({
  imports: [
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature('cart', {
      cart: reducers.cartReducer,
    }),

    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot(),
    STORE_DEV_TOOLS,
  ],
})
export class CoreStoreModule {
  constructor() {}
}
