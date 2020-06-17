import { Component, OnInit } from '@angular/core';
import { Password } from './resetPassword';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { matchOtherValidator } from '../helpers/matchPasswordFields'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordResetForm: FormGroup;
  newPassword: Password = new Password();


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createResetPasswordForm()
    
  }
  createResetPasswordForm() {
    this.passwordResetForm = this.formBuilder.group({
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      repeatPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          matchOtherValidator('password') // Custom validator
        ]
      ]
    });
  }
  resetPassword() {
    if (this.passwordResetForm.valid) {
      this.newPassword = Object.assign({}, this.passwordResetForm.value);
    }
    this.activatedRoute.params.subscribe(params => {
      this.userService.resetPassword(this.newPassword, params['resetPasswordToken']).subscribe((response) => {
        this.alertifyService.success('Password resetted. Routing to login page.');
        setTimeout(() => {
          this.router.navigate(['user/login'])
        }, 2000)
      });
    })

  }
}
