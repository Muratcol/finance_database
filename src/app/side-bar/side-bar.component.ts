import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { 
  faMoneyCheck,
  faUser,
  faHome,
  faPhone,
  faBell,
  faGem,
  faBiohazard
 } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css', '../app.component.css']
})
export class SideBarComponent implements OnInit {
  username:string
  title:string
  faUser = faUser
  faMoneyCheck = faMoneyCheck
  faHome = faHome
  faPhone = faPhone
  faBell = faBell
  faGem = faGem
  faCrypto = faBiohazard
  constructor(
    private userService:UserService,
    ) { }

  isLoggedIn():boolean{
    if (this.userService.isLoggedIn) {
      this.username = this.userService.userInfos['username']
      this.title = this.userService.userInfos['title']
      return true
    }
    return false
    
  }

  ngOnInit(): void {
  }


}
