import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/produect.models';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get', 'post', 'put']);
    service = new ProductService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllProducts and return list', async () => {
    // arrange
    const list = [mockProduct];
    http.get.and.returnValue(of({ products: list }));
    // act
    service.getAllProducts().subscribe((res) => {
      //assert
      expect(res.products.length).toEqual(1);
    });
  });
  it('should call searchProduct and return list', async () => {
    // arrange
    const list = [mockProduct];
    http.get.and.returnValue(of({ products: list }));
    // act

    service.searchProduct('test').subscribe((res) => {
      //assert
      expect(res.products.length).toEqual(1);
    });
  });
  it('should call categories and return list', async () => {
    // arrange
    const list = [mockProduct];
    http.get.and.returnValue(of(['fruits', 'laptops']));
    // act

    service.getCatalogs().subscribe((res) => {
      //assert
      expect(res.length).toEqual(2);
    });
  });
  it('should call productCategories and return list', async () => {
    // arrange
    const list = [mockProduct];
    http.get.and.returnValue(of({ products: list }));
    // act

    service.productCategories('laptops').subscribe((res) => {
      //assert
      expect(res.products.length).toEqual(1);
    });
  });
  it('should call getProduct and return list', async () => {
    // arrange
    const product = mockProduct;
    http.get.and.returnValue(of(product));
    // act

    service.getProduct(1).subscribe((res) => {
      //assert
      expect(res).toEqual(mockProduct);
    });
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
