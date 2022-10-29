import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Cart, CartsRes } from '../model/produect.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.apiBaseUrl + 'carts/';
  private createCartUrl = this.baseUrl + 'add';
  private getUserCartUrl = this.baseUrl + '/user/';
  constructor(private readonly http: HttpClient) {}

  createCart(userId = 1): Observable<CartsRes> {
    return this.http
      .post<CartsRes>(this.createCartUrl, { userId })
      .pipe(take(1));
  }
  getUserCart(userId = 1): Observable<CartsRes> {
    return this.http.get<CartsRes>(this.getUserCartUrl + userId).pipe(take(1));
  }
  getCart(cartId = 1): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl + cartId).pipe(take(1));
  }
  addToCart(
    cartId: number,
    products: {
      id: number;
      quantity: number;
    }
  ): Observable<Cart> {
    return this.http
      .put<Cart>(this.baseUrl + cartId, { products: [products] })
      .pipe(take(1));
  }
}
