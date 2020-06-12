import { Component, OnInit } from '@angular/core';
import { UserEmail } from './forgotPasswordEmail';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private authService : UserService,
    private router:Router,
    private alertifyService:AlertifyService
  ) { }

  emailForm:FormGroup
  userEmail:UserEmail = new UserEmail

  createPasswordResetForm() {
    this.emailForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    this.createPasswordResetForm();
  }

  forgotPassword() {
    if (this.emailForm.valid) {
      this.userEmail = Object.assign({}, this.emailForm.value);
      this.authService.forgotPassword(this.userEmail)
      .subscribe(() => {
        this.alertifyService.success('Check your email for reset your password. Routing login panel')
        setTimeout(() => "", 2000)
        this.router.navigate(['user/login'])
      });
    }
  }
}
