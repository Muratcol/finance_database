import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Cryptos } from '../crypto-main/crypto';



@Component({
  selector: 'app-cryptofooter',
  templateUrl: './cryptofooter.component.html',
  styleUrls: ['./cryptofooter.component.css']
})
export class CryptofooterComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  constructor(
    private currencyService:CurrencyService,

    ) { }

  cryptos : Cryptos[];
  interval: any;
  ngOnInit(): void {
    this.refreshData();
  } 
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
  refreshData(){
    this.currencyService.getCryptos()
        .subscribe(data => this.cryptos = data['data'])
  }
  ngAfterViewInit() {
    
    this.interval = setInterval(() => {
      this.refreshData()
    },5000)  
  }
}
