import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from 'models/products';
import { catchError, Observable, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  prod = new Products(0, '', '', '', '', '', 0, 0, 0, '');
  baseUrl: string;
  productArr: Products[] = [];
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
    this.productArr = [];
  }
  getProducts(): Observable<Products[]> {
    return this.httpClient
      .get<Products[]>(this.baseUrl + '/products')
      .pipe(retry(1), catchError(this.httpError));
  }
  getProductById(id: number): Observable<Products> {
    return this.httpClient
      .get<Products>(this.baseUrl + '/products/' + id)
      .pipe(retry(1), catchError(this.httpError));
  }
  addProduct(p: Products): Observable<Products> {
    return this.httpClient
      .post<Products>(
        this.baseUrl + '/products',
        JSON.stringify(p),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }
  updateProduct(p: Products): Observable<Products> {
    return this.httpClient
      .put<Products>(
        `${this.baseUrl}/products/${p._id}`,
        JSON.stringify(p),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }
  deleteProduct(_id: any): Observable<Products> {
    return this.httpClient
      .delete<Products>(`${this.baseUrl}/products/${_id}`, this.httpHeader)
      .pipe(retry(1), catchError(this.httpError));
  }
  httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code:${error.status}\nMessafe:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
