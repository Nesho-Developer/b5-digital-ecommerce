import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { Product, ProductRes } from '../model/produect.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiBaseUrl + 'products';
  private searchUrl = this.baseUrl + '/search';
  private categoriesUrl = this.baseUrl + '/categories';
  private productCategoriesUrl = this.baseUrl + '/category/';
  private loadCatalog$ = new BehaviorSubject(false);
  constructor(private readonly http: HttpClient) {}
  private catalogs$ = this.loadCatalog$.pipe(
    switchMap((lang) => this.categories()),
    shareReplay(1)
  );

  getAllProducts(limit = 10, skip = 10): Observable<ProductRes> {
    console.log('clled');
    return this.http
      .get<ProductRes>(this.baseUrl, { params: { limit, skip } })
      .pipe(take(1));
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + id).pipe(take(1));
  }
  searchProduct(query: string): Observable<ProductRes> {
    return this.http
      .get<ProductRes>(this.searchUrl, { params: { q: query } })
      .pipe(take(1));
  }
  private categories(): Observable<string[]> {
    return this.http.get<string[]>(this.categoriesUrl).pipe(take(1));
  }
  loadCatalogs() {
    this.loadCatalog$.next(true);
  }
  getCatalogs() {
    return this.catalogs$;
  }
  productCategories(category: string): Observable<ProductRes> {
    return this.http
      .get<ProductRes>(this.productCategoriesUrl + category)
      .pipe(take(1));
  }
}
