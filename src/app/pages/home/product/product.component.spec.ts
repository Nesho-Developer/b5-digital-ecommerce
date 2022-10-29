import { ProductComponent } from './product.component';
import { CartService } from '../../../core/service/cart.service';
import { ProductService } from '../../../core/service/product.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../../../core/model/produect.models';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let storeSpy: jasmine.SpyObj<Store<AppState>>;
  let routeSpy: jasmine.SpyObj<any>;
  let subject: BehaviorSubject<any> = new BehaviorSubject({});
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
    routeSpy = {
      queryParams: subject,
    };

    component = new ProductComponent(
      productServiceSpy,
      cartServiceSpy,
      storeSpy,
      routeSpy
    );
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllProducts and return list', async () => {
    // arrange
    const list = [mockProduct];
    productServiceSpy.getAllProducts.and.returnValue(
      of({ products: list, total: 100, skip: 0, limit: 10 })
    );
    // act
    component.getAllProducts();
    //assert
    expect(component.products.length).toEqual(1);
  });
});
const mockProduct: Product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: '...',
  images: ['...', '...', '...'],
};
