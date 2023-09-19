import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { supplier } from 'models/supplier';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  supp: supplier = new supplier(0, '', 0, '', '');
  baseUrl: string;
  supplierArray: supplier[] = [];
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  //   supplierArray=[ new supplier(101,"Ram",44,"Enya 227 DW opens/Classic","BTE","I3","10-80/100","ITC and BTC are avalibale in MP,HP& UP Receiver",24995),
  //   new supplier(102,"Ramesh",45,"Enya 285 DWP/HP","PBTE","I3","25-105/115","ITC and BTC are avalibale in MP,HP& UP Receiver",24995),
  //   new supplier(103,"Ranga",46,"Enya 230 DW ITC/DWP ITC","ITC","3I2","20-85/110","ITC and BTC are avalibale in MP,HP& UP Receiver",24995),
  //   new supplier(104,"Rakesh",47,"Enya 210 CIC/PCIC","CIC","I0","20-85/110","ITC and BTC are avalibale in MP,HP& UP Receiver",24995)
  // ]
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
    this.supplierArray = [];
  }
  getsupplier(): Observable<supplier[]> {
    return this.httpClient
      .get<supplier[]>(this.baseUrl + '/suppliers')
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
  // getsupplier(){
  //   return this.supplierArray;
  // }
  getsupplierById(id: number): Observable<supplier> {
    return this.httpClient
      .get<supplier>(this.baseUrl + '/suppliers/' + id)
      .pipe(retry(1), catchError(this.httpError));
  }
  //   getsupplierByID( id:number):supplier{
  //     this.supplierArray.forEach( s=>{
  //     if(s.supplier_id==id){
  //       console.log(s);
  //       this.supp=s;
  //     }

  //   })
  //   return this.supp;
  // }
  // addsupplier(supp:supplier){
  // this.supplierArray.push(supp)
  // this.supplierArray.forEach(s=>{
  //   console.log(s)
  // })
  // }
  addsupplier(p: supplier): Observable<supplier> {
    return this.httpClient
      .post<supplier>(
        this.baseUrl + '/suppliers',
        JSON.stringify(p),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }
  updatesupplier(s: supplier): Observable<supplier> {
    return this.httpClient
      .put<supplier>(
        `${this.baseUrl}/suppliers/${s._id}`,
        JSON.stringify(s),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.httpError));
  }
  // updatesupplier(sup:supplier){
  //   var i=0;
  //   this.supplierArray.forEach(s=>{
  //     console.log(s.supplier_id,sup.supplier_id)
  //     if(s.supplier_id==sup.supplier_id){
  //       this.supplierArray[i]=sup
  //       console.log(s);
  //     }
  //     i=i+1
  //   })
  //   this.supplierArray.forEach(s=>{
  //     console.log(s)
  //   })

  // }
  // deletesupplier(removeId:number){
  //   const res=this.supplierArray.filter(obj=>obj.supplier_id !==removeId);
  // return res;
  // }
  // deletesupplier(id:number){
  // if (confirm("Are you sure to delete?")){
  //  return this.httpClient.delete<supplier>(`${this.baseUrl}/suppliers/${id}`)

  // }
  deletesupplier(s: supplier): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/suppliers/${s._id}`, this.httpHeader)
      .pipe(retry(1), catchError(this.httpError));
  }
}
