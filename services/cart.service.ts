import { getLocaleDateFormat } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Cart } from 'models/cart';
import { Products } from 'models/products';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart = new Cart(0, 0, 0, []);
  baseUrl: string;
  cartArr: Cart[] = [];
  cartArrf: Cart[] = [];
  cId: number = 0;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
    this.cartArr = [];
  }

  addToCart(c: Cart): Observable<Cart> {
    return this.httpClient
      .post<Cart>(this.baseUrl + '/cart', JSON.stringify(c), this.httpHeader)
      .pipe(retry(1), catchError(this.httpError));
  }

  getAllCart() {
    return this.httpClient
      .get<Cart[]>(this.baseUrl + '/cart/')
      .pipe(retry(1), catchError(this.httpError));
  }

  getCart(id: number): Observable<Cart> {
    // let id:number=
    console.log(id);
    //   for(var i=0;i<this.cartArr.length;i++){
    //     var c=this.cartArr[i]

    //   if(id==c.uId)
    //   {
    //     // this.cartProduct=c
    //     this.cId=c.id
    //     console.log(this.cId)

    //   }
    // }
    //id=203
    return this.httpClient
      .get<Cart>(this.baseUrl + '/cart/' + id)
      .pipe(retry(1), catchError(this.httpError));
  }
  updateCart(c: Cart) {
    return this.httpClient
      .put<Cart>(
        `${this.baseUrl}/cart/${c._id}`,
        JSON.stringify(c),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }

  deleteCart(id: number) {
    return this.httpClient
      .delete<Cart>(this.baseUrl + '/cart/' + id)
      .pipe(retry(1), catchError(this.httpError));
  }

  deleteCartItem(pid: number, id: number) {
    return this.httpClient
      .delete<Cart>(this.baseUrl + '/cart/' + id + '/' + pid)
      .pipe(retry(1), catchError(this.httpError));
  }
  totalAmount(total: number) {}

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
