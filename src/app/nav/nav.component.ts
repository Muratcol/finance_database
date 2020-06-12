import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(
    private userService:UserService,
    private alertifyService:AlertifyService
  ) {}
  
  isLoggedIn():boolean{
    return this.userService.isLoggedIn
  }

  logOut(){
    this.userService.isLoggedIn = false
    this.alertifyService.success('LogOut Succesfull')
  }

  ngOnInit(): void {

  }

}
