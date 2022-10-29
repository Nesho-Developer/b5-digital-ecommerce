import { ToolBarComponent } from './tool-bar.component';
import { CartService } from '../../../core/service/cart.service';
import { ProductService } from '../../../core/service/product.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../core/store';

describe('ToolBarComponent', () => {
  let component: ToolBarComponent;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let storeSpy: jasmine.SpyObj<Store<AppState>>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('cartServiceSpy', [
      'getUserCart',
      'getCart',
      'addToCart',
    ]);
    productServiceSpy = jasmine.createSpyObj('productServiceSpy', [
      'getAllProducts',
      'searchProduct',
      'categories',
      'loadCatalogs',
      'getCatalogs',
      'productCategories',
    ]);
    storeSpy = jasmine.createSpyObj('storeSpy', ['dispatch', 'select']);
    routerSpy = jasmine.createSpyObj('routerSpy', ['navigate']);
    component = new ToolBarComponent(
      cartServiceSpy,
      productServiceSpy,
      storeSpy,
      routerSpy
    );
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
