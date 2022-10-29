import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/model/produect.models';
import { ProductService } from '../../../core/service/product.service';
import { CartService } from '../../../core/service/cart.service';
import { AddToCart, AppState } from '../../../core/store';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  catalog: string | undefined;
  search: string | undefined;
  pageNumber = 1;
  hasNextPage: boolean = true;
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private store: Store<AppState>,
    readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (res) => {
        this.products = [];
        if (res['catalog']) {
          console.log(res);
          this.catalog = res['catalog'];
          this.getProductsOfCatalog();
        } else if (res['search']) {
          console.log(res);
          this.search = res['search'];
          this.onSearch();
        } else {
          this.getAllProducts();
        }
      },
    });
  }
  getAllProducts() {
    this.productService.getAllProducts(10, this.pageNumber * 10).subscribe({
      next: (res) => {
        this.products.push(...res.products);
        this.hasNextPage = res.total > this.pageNumber * 10;
      },
    });
  }
  getProductsOfCatalog() {
    this.productService.productCategories(this.catalog ?? '').subscribe({
      next: (res) => {
        this.products = res.products;
      },
    });
  }
  onSearch() {
    this.productService.searchProduct(this.search ?? '').subscribe({
      next: (res) => {
        this.products = res.products;
      },
    });
  }
  onScrollDown(ev: any) {
    if (!this.search && !this.catalog) {
      this.onLoadMore();
    }
  }
  onLoadMore(): void {
    if (this.hasNextPage) {
      this.pageNumber += 1;
      this.getAllProducts();
    }
  }
  onAddToCart(item: Product): void {
    const cartId = Number.parseInt(localStorage.getItem('cartId') ?? '0');
    this.store.dispatch(
      AddToCart({ payload: { cartId, products: { id: item.id, quantity: 1 } } })
    );
  }
}
