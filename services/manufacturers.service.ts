import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manufacturers } from 'models/manufacturers';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManufacturersService {
  baseUrl: string;
  manufacturerArr: Manufacturers[] = [];
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
    this.manufacturerArr = [];
  }

  addmanufacturers(manufact: Manufacturers): Observable<Manufacturers> {
    return this.httpClient
      .post<Manufacturers>(
        this.baseUrl + '/manufacturers',
        JSON.stringify(manufact),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }
  updateManufacturer(manufacturers: Manufacturers): Observable<Manufacturers> {
    return this.httpClient
      .put<Manufacturers>(
        `${this.baseUrl}/manufacturers/${manufacturers._id}`,
        JSON.stringify(manufacturers),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }

  getmanufacturer(): Observable<Manufacturers[]> {
    return this.httpClient
      .get<Manufacturers[]>(this.baseUrl + '/manufacturers')
      .pipe(retry(1), catchError(this.httpError));
  }

  /*  getProductById(id: number): manufacturers {
    this.manufacturerArr.forEach((p) => {
      if (p.id == id) {
        console.log(p);
        this.manufact = p;
      }
    });
    return this.manufact;
  } */
  /* updateManufacturer(manufacturers: manufacturers) {
    var i = 0;
    this.manufacturerArr.forEach((u) => {
      console.log(u.id, manufacturers.id);
      if (u.id == manufacturers.id) {
        this.manufacturerArr[i] = manufacturers;
        console.log(u);
      }
      i = i + 1;
    });
    this.manufacturerArr.forEach((u) => {
      console.log(u);
    });
  } */
  deletemanufacture(_id: any) {
    return this.httpClient
      .delete<Manufacturers>(
        `${this.baseUrl}/manufacturers/${_id}`,
        this.httpHeader
      )
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
