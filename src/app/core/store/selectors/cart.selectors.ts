import { createFeatureSelector } from '@ngrx/store';
import { Cart } from '../../model/produect.models';

// selectors

export const getAppCartState = createFeatureSelector<{ cart: Cart }>('cart');
