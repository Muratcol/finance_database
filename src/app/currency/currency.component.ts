import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service'
import { CurrencyCrosses } from './currency';
import { 
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faDollarSign,
  faEuroSign,
  faPoundSign
 } from '@fortawesome/free-solid-svg-icons';


@Component({
  
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  providers: []
})



export class CurrencyComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  faDollarSign = faDollarSign
  faEuroSign = faEuroSign
  faPoundSign = faPoundSign
  constructor(
    private currencyService:CurrencyService,

    ) { }

  currencies : CurrencyCrosses[];
  interval: any;
  ngOnInit(): void {
    this.refreshData()
      this.interval = setInterval(() => {
        this.refreshData()
      },5000)  
  } 
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => this.currencies = data['data'])
  }
}
