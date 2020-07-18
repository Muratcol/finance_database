import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import {
  faBell,
  faCog,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  faBell = faBell;
  faCog = faCog;
  faTriangle = faCaretUp;
  windowStatus: boolean = false;
  allAlerts:string;
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private el: ElementRef,
    private renderer: Renderer2,
    private alertService:AlertService
  ) {}

  isLoggedIn(): boolean {
    this.showAlerts();
    return this.userService.isLoggedIn;
  }
  showAlerts():void  {
      this.alertService.getAlerts().subscribe((data) => {
      this.allAlerts = data['data'];
    });
  }
  logOut(): void {
    this.userService.isLoggedIn = false;
    this.userService.logOutUser();
    this.alertifyService.success('LogOut Succesfull');
  }
  showAlertWrapper(): void {
    let alertWindow = this.el.nativeElement.querySelector(
      '.alertWindowWrapper'
    );
    if (this.windowStatus) {   
      this.renderer.addClass(alertWindow, 'slideToHide')
      setTimeout(() => {
        this.renderer.removeClass(alertWindow, 'slide');
        this.windowStatus = !this.windowStatus;
      }, 400)

    } else {
      this.renderer.removeClass(alertWindow, 'slideToHide')
      this.renderer.addClass(alertWindow, 'slide');
      this.windowStatus = !this.windowStatus;
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit():void {
    this.showAlerts()
  }
}
