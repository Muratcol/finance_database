import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { CurrencyCrosses } from '../currency/currency';

@Component({
  selector: 'app-currencyfooter',
  templateUrl: './currencyfooter.component.html',
  styleUrls: ['./currencyfooter.component.css']
})

export class CurrencyfooterComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
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

  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => this.currencies = data['data'])
  }

}
