import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {
  faLaptop,
  faMailBulk,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert-center',
  templateUrl: './alert-center.component.html',
  styleUrls: ['./alert-center.component.css'],
})
export class AlertCenterComponent implements OnInit {
  faLaptop = faLaptop;
  faMail = faMailBulk;
  faTrash = faTrash;
  faPen = faPen;
  alertTab: boolean = false;
  selectedCurrency: string;
  alertSection: string;
  alertOptions: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
  }
  openAlertTab(value) {
    value == 'Choose...' ? this.alertTab = false : this.alertTab = true;

    if (this.alertTab) {
      this.alertOptions = this.el.nativeElement.querySelector("body > main > app-alert-center > div > div > div.alertOptions.row")
      
      this.renderer.setStyle(this.alertOptions, 'display', 'flex');

    } else {
      this.renderer.addClass(this.alertOptions, 'fadeOff');
      setTimeout(() => {
        this.renderer.setStyle(this.alertOptions, 'display', 'none');
        this.renderer.removeClass(this.alertOptions, 'fadeOff');
      },2000)      

    }
    this.alertTab = true;
  }
}
