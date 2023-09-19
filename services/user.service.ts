import { Injectable } from '@angular/core';
import { User } from 'models/user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

//import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  UpdateUser(user: User) {
    throw new Error('Method not implemented');
  }

  u: User = new User(0, '', '', '', '', '', '', 0, '', '', '', '', '', '');
  baseUrl: string;
  userArr: User[] = [];
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
    this.userArr = [];
  }
  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.baseUrl + '/user')
      .pipe(retry(1), catchError(this.httpError));
  }
  getAll(params: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/user', { params });
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient
      .get<User>(this.baseUrl + '/user/' + id)
      .pipe(retry(1), catchError(this.httpError));
  }

  addUser(u: User): Observable<User> {
    return this.httpClient
      .post<User>(this.baseUrl + '/user', JSON.stringify(u), this.httpHeader)
      .pipe(retry(1), catchError(this.httpError));
  }

  updateUser(u: User): Observable<User> {
    return this.httpClient
      .put<User>(
        `${this.baseUrl}/user/${u._id}`,
        JSON.stringify(u),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }

  deleteUser(removeId: number): Observable<User> {
    return this.httpClient
      .delete<User>(`${this.baseUrl}/user/${removeId}`, this.httpHeader)
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
