import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Alert } from '../alert-center/alertModel';
import { UserEmail } from '../forgot-password/forgotPasswordEmail';

@Injectable()
export class AlertService {
  path: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  createAlert(alertForm: Alert): Observable<Alert[]> {
    let access_token = localStorage.getItem('access_token');

    let http_options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer: ' + access_token,
      }),
    };
    const body = {
      pair: alertForm.pair,
      limit: alertForm.limit,
      conditionName: alertForm.conditionName,
      frequency: alertForm.frequency,
      websitePopup: alertForm.websitePopup,
      emailNotify: alertForm.emailNotify,
    };

    return this.http
      .post<Alert[]>(this.path + '/alert/createAlert', body, http_options)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAlerts():Observable<Alert[]> {
    let access_token = localStorage.getItem('access_token');

    let http_options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer: ' + access_token,
      }),
    };

    return this.http
    .get<Alert[]>(this.path + "/alert/getAllAlerts", http_options)
    .pipe(
      tap(),
      catchError(err => this.handleError(err))
    )
  }
  closeAlertStatus(alertId): Observable<Boolean[]> {
    let access_token = localStorage.getItem('access_token');

    let http_options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer: ' + access_token,
      }),
    };
    const body = {
      alerStatus:false
    };
    return this.http
      .put<Boolean[]>(this.path + '/alert/editAlert/' + alertId, body, http_options)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  sendEmailNotify(alertId): Observable<UserEmail[]> {
    let access_token = localStorage.getItem('access_token');
    let body = {
      id: alertId
    }
    let http_options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer: ' + access_token,
      }),
    };
    return this.http
      .post<UserEmail[]>(this.path + '/auth/forgotpassword', body, http_options)
      .pipe(
        tap(
          (data) => {
            console.log(JSON.stringify(data));
          },
          catchError((err) => this.handleError(err))
        )
      );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Somethings not right ' + err.error.message;
    } else {
      errorMessage = 'Internal Error';
    }
    return throwError(errorMessage);
  }
}
