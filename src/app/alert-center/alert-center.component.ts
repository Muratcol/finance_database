import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {
  faLaptop,
  faMailBulk,
  faTrash,
  faPen,
  faArrowRight,
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
  faArrow = faArrowRight;
  alertTab: boolean = false;
  selectedCurrency: string;
  alertSection: string;
  alertOptions: string;
  alertForm: FormGroup;
  alert: Alert = new Alert();
  radios: any;
  username: string;
  webPopup: any;
  emailNotify: any;
  userName: string;
  allAlerts: Alert[];
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.createAlertForm();
    this.userName = localStorage.getItem('name');
    this.printAlerts();
    console.log(this.allAlerts)
  }

  createAlertForm() {
    this.alertForm = this.formBuilder.group({
      userName: [null],
      pair: [null, Validators.required],
      limit: [null, Validators.required],
      conditionName: [null, Validators.required],
      frequency: [null],
      websitePopup: [null],
      emailNotify: [null],
    });
  }

  submitAlert() {
    this.radios = this.el.nativeElement.querySelectorAll('.radio');
    this.webPopup = this.el.nativeElement.querySelector('.webPopup');
    this.emailNotify = this.el.nativeElement.querySelector('.emailNotify');
    this.alertForm.value.userName = this.userName;
    this.radios[0].checked
      ? (this.alertForm.value.frequency = 'Once')
      : (this.alertForm.value.frequency = 'Requirring');
    this.alertForm.value.websitePopup = this.webPopup.checked;
    this.alertForm.value.emailNotify = this.emailNotify.checked;
    if (this.alertForm.valid) {
      this.alert = Object.assign({}, this.alertForm.value);
      this.printAlerts();
      this.alertService.createAlert(this.alert).subscribe(() => {
        this.alertifyService.success('Alert created. Thank you');
      });
    } else {
      this.alertifyService.error('Please check your inputs.');
    }
  }

  openAlertTab(value) {
    if (value != 'Choose...') {
      this.alertTab = true;
      this.alertOptions = this.el.nativeElement.querySelector(
        'body > main > app-alert-center > div > form > div.alertOptions.row'
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

  printAlerts() {
    this.alertService.getAlerts().subscribe((data) => {
      this.allAlerts = data['data'];
    });
  }
}
