import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsComponent } from './catalogs.component';
import { ProductService } from '../../../core/service/product.service';

describe('CatalogsComponent', () => {
  let component: CatalogsComponent;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('productServiceSpy', [
      'getCatalogs',
    ]);
    component = new CatalogsComponent(productServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
