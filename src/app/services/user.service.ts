import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../register/userRegister';
import { UserLogin } from '../login/user';
import { AlertifyService } from './alertify.service';
import { UserInfos } from '../user/userInfos';
import { UserEmail } from '../forgot-password/forgotPasswordEmail';
import { Password } from '../reset-password/resetPassword';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService
  ) {}
  path = 'http://localhost:5000';
  isLoggedIn: boolean = false;
  userInfos: any = null;

  registerUser(userInfo: User): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    const body = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
    };

    return this.http
      .post<User[]>(this.path + '/auth/register', body, httpOptions)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  logInUser(userInfo: UserLogin): any {
    let body = {
      email: userInfo.email,
      password: userInfo.password,
    };
    return this.http.post<UserLogin[]>(this.path + '/auth/login', body).pipe(
      tap((data) => {
        if (data['success'] === true) {
          this.userInfos = {
            username: data['data']['name'],
            email: data['data']['email'],
            title: data['data']['title'] ? data['data']['title'] : null,
            website: data['data']['website'] ? data['data']['website'] : null,
            about: data['data']['about'] ? data['data']['about'] : null,
            place: data['data']['place'] ? data['data']['place'] : null,
            imgUrl: data['data']['imgUrl'],
          };
          this.isLoggedIn = true;
          localStorage.setItem('name', data['data']['name']);
          localStorage.setItem('access_token', data['access_token']);
          return true;
        }
        this.isLoggedIn = false;
        return false;
      }),
      catchError((err) => {
        err['status'] === 400
          ? this.alertifyService.error('Invalid Email')
          : null;
        return err;
      })
    );
  }

  logOutUser(): void {
    this.isLoggedIn = false;
    let access_token = localStorage.getItem('access_token')
    let http_options = {
      headers: new HttpHeaders ({
        Authorization: 'Bearer: ' + access_token
      })
      
    }
    this.http.get(this.path + '/auth/logout', http_options);
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
  }

  updateUserInfos(userUpdate: UserInfos): Observable<UserInfos[]> {
    let access_token = localStorage.getItem('access_token');

    let http_options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer: ' + access_token,
      }),
    };
    const body = {
      name:
        userUpdate.username == null || userUpdate.username == ''
          ? localStorage.getItem('name')
          : userUpdate.username,
      title:
        userUpdate.title == null || userUpdate.title == ''
          ? undefined
          : userUpdate.title,
      place:
        userUpdate.place == null || userUpdate.place == ''
          ? undefined
          : userUpdate.place,
      website:
        userUpdate.website == null || userUpdate.website == ''
          ? undefined
          : userUpdate.website,
      about:
        userUpdate.about == null || userUpdate.about == ''
          ? undefined
          : userUpdate.about,
    };

    return this.http
      .put<UserInfos[]>(this.path + '/auth/edit', body, http_options)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  uploadImage(image: File): Observable<any> {
    let access_token = localStorage.getItem('access_token');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer: ' + access_token,
      }),
    };
    const formData = new FormData();
    formData.append('profile_image', image, image.name);
    return this.http
      .post(this.path + '/auth/upload', formData, httpOptions)
      .pipe(
        tap(
          (data) => {
            console.log(JSON.stringify(data));
          },
          catchError((err) => this.handleError(err))
        )
      );
  }

  forgotPassword(userEmail: UserEmail): Observable<UserEmail[]> {
    return this.http
      .post<UserEmail[]>(this.path + '/auth/forgotpassword', userEmail)
      .pipe(
        tap(
          (data) => {
            console.log(JSON.stringify(data));
          },
          catchError((err) => this.handleError(err))
        )
      );
  }

  resetPassword(
    newPassword: Password,
    resetPasswordToken: string
  ): Observable<Password[]> {
    return this.http
      .put<Password[]>(
        this.path +
          '/auth/resetpassword?resetPasswordToken=' +
          resetPasswordToken,
        newPassword
      )
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
