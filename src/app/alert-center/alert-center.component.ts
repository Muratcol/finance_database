import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {
  faLaptop,
  faMailBulk,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from './alertModel';
import { AlertifyService } from '../services/alertify.service';
import { AlertService } from '../services/alert.service';

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
  alertForm: FormGroup;
  alert: Alert = new Alert();
  username:string;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

    createAlertForm() {
      this.alertForm = this.formBuilder.group ({
        userName: this.username,
        pair: [null, Validators.required],
        limit: [null, Validators.required],
        conditionName: [null, Validators.required],
        frequency: [null, Validators.required],
        websitePopup: [null, Validators.required],
        emailNotify: [null, Validators.required]
      })
    }

    submitAlert() {

      if (this.alertForm.valid){
        this.alert = Object.assign({}, this.alertForm.value)
        this.alertService.createAlert(this.alert)
        .subscribe(() => {
          this.alertifyService.success('Alert created. Thank you')
        })
      }
      else {
        this.alertifyService.error("Please check your inputs.")
      }
      
    }




  openAlertTab(value) {
    if (value != 'Choose...') {
      this.alertTab = true;
      this.alertOptions = this.el.nativeElement.querySelector(
        'body > main > app-alert-center > div > div > div.alertOptions.row'
      );

      this.renderer.setStyle(this.alertOptions, 'display', 'flex');
    } else {
      this.renderer.addClass(this.alertOptions, 'fadeOff');
      setTimeout(() => {
        this.renderer.setStyle(this.alertOptions, 'display', 'none');
        this.renderer.removeClass(this.alertOptions, 'fadeOff');
        this.alertTab = false;
      }, 2000);
    }
    this.alertTab = true;
  }
}
