import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../contact/contact';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ContactService {
  path:string = "http://localhost:5000"

  constructor(
    private http:HttpClient
  ) { }


  submitContactService (contactForm:Contact):Observable<Contact[]> {

    return this.http
    .post<Contact[]>(this.path + "/contact", contactForm)
    .pipe(
      tap(data => {
        console.log(data)
      },
      catchError(err => this.handleError(err)))
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
