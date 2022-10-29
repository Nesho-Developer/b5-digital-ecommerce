import { SideNavComponent } from './side-nav.component';
import { ProductService } from '../../../core/service/product.service';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('productServiceSpy', [
      'getCatalogs',
    ]);
    component = new SideNavComponent(productServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
