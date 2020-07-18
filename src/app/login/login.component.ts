import { Component, OnInit } from '@angular/core';
import { UserLogin } from './user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private authService : UserService,
    private router:Router,
    private alertifyService:AlertifyService

  ) { }

  userLoginForm:FormGroup;
  user:UserLogin = new UserLogin;
  authenticated : boolean
  createUserLoginForm() {
    this.userLoginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }


  ngOnInit(): void {
    this.createUserLoginForm();
  }

  logIn():void {

    if (!this.userLoginForm.valid) {
      this.alertifyService.error('Please check your inputs')
    }
    this.user = Object.assign({}, this.userLoginForm.value);
    this.authService.logInUser(this.user)
    .subscribe(() => {
      this.alertifyService.success('Login Succesfully. Routing Currencies')
      setTimeout(() => "", 1500)
      this.router.navigate([''])
    });

    
  }
  logOut():void {
    this.authService.logOutUser()
  }

}
