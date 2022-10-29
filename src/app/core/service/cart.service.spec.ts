import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { CartsRes } from '../model/produect.models';
import { of } from 'rxjs';

describe('CartService', () => {
  let service: CartService;
  let http: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get', 'post', 'put']);
    service = new CartService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getUserCart and return list', async () => {
    // arrange
    http.get.and.returnValue(of(cartMock));
    // act

    service.getUserCart(5).subscribe((res) => {
      //assert
      expect(res.carts.length).toBeTruthy();
    });
  });
  it('should call getCart and return list', async () => {
    // arrange
    http.get.and.returnValue(of(cartMock));
    // act

    service.getCart(1).subscribe((res) => {
      //assert
      expect(res).toBeTruthy();
    });
  });
  it('should call addToCart and return list', async () => {
    // arrange
    http.put.and.returnValue(of(cartMock));
    // act

    service.addToCart(5, { quantity: 1, id: 1 }).subscribe((res) => {
      //assert
      expect(res).toBeTruthy();
    });
  });
});

const cartMock: CartsRes = {
  carts: [
    {
      id: 19,
      products: [
        {
          id: 43,
          title: 'frock gold printed',
          price: 600,
          quantity: 3,
          total: 1800,
          discountPercentage: 15.55,
          discountedPrice: 1520,
        },
      ],
      total: 2492,
      discountedTotal: 2140,
      userId: 5, // user id is 5
      totalProducts: 5,
      totalQuantity: 14,
    },
  ],
  total: 1,
  skip: 0,
  limit: 1,
};
