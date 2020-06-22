import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { CurrencyCrosses } from '../currency/currency';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Commodity } from '../commodity-main/commodity';
import { Indicies } from '../smfooter/indicies';

@Injectable()
export class CurrencyService {

  constructor(private http:HttpClient) { }
  path = "http://localhost:5000/currencies"
  chartData: Array<object> = new Array();
  myData: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([])


  getCurrencies():Observable<CurrencyCrosses[]> {
    return this.http
    .get<CurrencyCrosses[]>(this.path)
    .pipe(
      tap(data => { // we can log or catch error of data which we get from .get
        // console.log(JSON.stringify(data))
      }), 
      catchError(err => this.handleError(err)) // these .pipe patterns come from Observable
    );
     //subscribe means we want this data
  }

  getCommodities():Observable<Commodity[]> {
    return this.http
    .get<Commodity[]>(this.path + "/commodities")
    .pipe(
      tap(),
      catchError(err => this.handleError(err))
    )
  }
  getIndices():Observable<Indicies[]> {
    return this.http
    .get<Indicies[]>(this.path + "/major-indicies")
    .pipe(
      tap(),
      catchError(err => this.handleError(err))
    )
  }

  updateChart(){
    return this.http
    .get(this.path + "/chart-data").subscribe(
      (response) => {
        for (let i of response['data']) {
          this.chartData.push({
            sell: Number(i['dollar']['sell'].replace(/,/, '.')),
            date: i['createdAt']
          })
        }
        this.myData.next(this.chartData)}
    )
  }
  
  getMyData() {
    this.updateChart();
    this.chartData = []
    return this.myData.asObservable();
  }








  handleError(err: HttpErrorResponse) {
    let errorMessage = ""
    if(err.error instanceof ErrorEvent) {
      errorMessage = 'Somethings not right ' + err.error.message
    }
    else {
      errorMessage = "Internal Error"
    }
    return throwError(errorMessage)
  }

}