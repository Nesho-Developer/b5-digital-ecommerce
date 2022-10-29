import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/service/cart.service';
import { Store } from '@ngrx/store';
import {
  AppState,
  CreateCart,
  getAppCartState,
  LoadCart,
  LoadUserCart,
} from '../../../core/store';
import { Actions } from '@ngrx/effects';
import { Cart } from '../../../core/model/produect.models';
import { ProductService } from '../../../core/service/product.service';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  cart: Cart | undefined;
  catalog = this.productService.getCatalogs();
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private store: Store<AppState>,
    private readonly _actions: Actions,
    private readonly router: Router
  ) {
    this.loadSubscribeToCart();
    this.productService.loadCatalogs();
  }
  loadSubscribeToCart(): void {
    const cartId = Number.parseInt(localStorage.getItem('cartId') ?? '0');
    this.store.select(getAppCartState).subscribe((cart) => {
      this.cart = cart.cart;
    });
    console.log(cartId);
    if (cartId) {
      this.store.dispatch(
        LoadCart({
          payload: {
            cartId: cartId,
          },
        })
      );
    } else {
      this.store.dispatch(
        LoadUserCart({
          payload: {
            userId: 1,
          },
        })
      );
    }
  }
  ngOnInit(): void {}

  onSearch(value: string) {
    this.router.navigate(['/home'], { queryParams: { search: value } }).then();
  }
}
