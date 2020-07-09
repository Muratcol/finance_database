import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Alert } from '../alert-center/alertModel';

@Injectable()

export class AlertService {
    path:string = "http://localhost:5000"
  
    constructor(
      private http:HttpClient
    ) { }
  
  
    createAlert (alertForm:Alert):Observable<Alert[]> {
  
      let access_token = localStorage.getItem('access_token')

      let http_options = {
        headers: new HttpHeaders ({
          Authorization: 'Bearer: ' + access_token
        })
        
      }
      const body = {
        "username" : localStorage.getItem('name'),
        'pair': alertForm.pair,
        'limit':alertForm.limit,
        'conditionName':alertForm.conditionName,
        'frequency':alertForm.frequency,
        'websitePopup':alertForm.websitePopup,
        'emailNotify':alertForm.emailNotify
      }
  
  
      return this.http
      .put<Alert[]>(this.path + '/alert/createAlert', body, http_options)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      )
      
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
