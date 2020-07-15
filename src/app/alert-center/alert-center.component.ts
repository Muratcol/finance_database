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
import { CurrencyService } from '../services/currency.service';

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
  webPopup: any;
  emailNotify: any;
  userName: string;
  pairOptions: Array<string> = [];
  activePair: number;
  limitInput:string;
  interval: any;
  currentValue:number;
  allAlerts: Alert[];
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private currencyService: CurrencyService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.createAlertForm();
    this.printAlerts();
    this.showPairOptions();
  }
  ngAfterViewInit() {
    this.interval = setInterval(() => {
      this.sendNotify();
    },5000)  
  }
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
  createAlertForm() {
    this.alertForm = this.formBuilder.group({
      pair: [null, Validators.required],
      limit: [null, Validators.required],
      conditionName: [null, Validators.required],
      frequency: [null],
      websitePopup: [null],
      emailNotify: [null],
    });
  }
  deleteAlert(event: any) {
    let alert = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
    this.renderer.setStyle(alert, 'display', 'none');
    let _id = alert.firstChild.nextSibling
    console.log(_id)
    // this.alertService.deleteAlert(alert)
    // .subscribe(() => this.alertifyService.success('Alert Deleted!'))
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

  showPairOptions(){
    this.currencyService.getCurrencies()
    .subscribe(data => {
      for (let forex of data['data']) {
        this.pairOptions.push(forex['pair'])
      }
    })
  }

  showActivePair(value) {
    this.currencyService.getCurrencies()
    .subscribe(data => {
      for(let forex of data['data']) {
        if(forex['pair'] == value) {
          this.activePair = forex['ask']
          this.limitInput = this.el.nativeElement.querySelector('.limitInput')
          this.renderer.setProperty(this.limitInput, 'value', (this.activePair as number));
          return this.activePair
        }
      }
    })
  }
  sendNotify() {
    
    this.alertService.getAlerts().subscribe((data) => {
      this.allAlerts = data['data'];
    });
    for(let alert of this.allAlerts) {
      if(!alert.alertStatus) continue
      this.currencyService.getCurrencies()
      .subscribe(data => {
        for(let forex of data['data']) {
          
          if(forex['pair'] == alert.pair) {
            this.currentValue = forex.ask
            this.currentValue = Number(this.currentValue)
          }
        }
      })
      if (alert.conditionName == "Moves Above"){
        if(this.currentValue > alert.limit || this.currentValue == alert.limit) {
          this.alertifyService.success(`${alert.pair} is currently ${this.currentValue}. ${alert.limit} limit has passed !!`)
          this.alertService.closeAlertStatus(alert._id)
          .subscribe((data) => {console.log(data)})
          this.alertService.sendEmailNotify(alert._id)
          .subscribe((data) => console.log(data))
        }
      }
      else {
        if(alert.limit < this.currentValue) {
          this.alertifyService.success(`${alert.pair} has passed ${this.currentValue} limit !!`)
          this.alertService.closeAlertStatus(alert._id)
          .subscribe((data) => {console.log(data)})
          this.alertService.sendEmailNotify(alert._id)
          .subscribe((data) => console.log(data))
        }
      }
    }
  }

}
