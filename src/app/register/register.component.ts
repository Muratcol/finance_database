import { Component, OnInit } from '@angular/core';
import { User } from './userRegister';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { matchOtherValidator } from '../helpers/matchPasswordFields'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.createUserRegisterForm();
  }
  createUserRegisterForm() {
    this.userRegisterForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
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
  register() {
    if (this.userRegisterForm.valid) {
      console.log(this.userRegisterForm.value)
      this.user = Object.assign({}, this.userRegisterForm.value);
    }
    this.userService.registerUser(this.user).subscribe((response) => {
      this.alertifyService.success('User succesfully created. Feel free to login');
      setTimeout(() => "", 2000)
      this.router.navigate(['user/login'])
    });
  }
}
