import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { Cryptos } from './crypto';

@Component({
  selector: 'app-crypto-main',
  templateUrl: './crypto-main.component.html',
  styleUrls: ['./crypto-main.component.css']
})
export class CryptoMainComponent implements OnInit {
  constructor(
    private currencyService:CurrencyService,

    ) { }

  cryptos: Cryptos[];
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
    this.currencyService.getCryptos()
        .subscribe(data => this.cryptos = data['data'])
  }
}
