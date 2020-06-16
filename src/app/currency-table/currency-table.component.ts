import { Component, OnInit } from '@angular/core';
import { 
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faDollarSign,
  faEuroSign,
  faPoundSign
 } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../currency/currency';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css'],
  providers: [CurrencyService]
})
export class CurrencyTableComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  faDollarSign = faDollarSign
  faEuroSign = faEuroSign
  faPoundSign = faPoundSign
  interval: any;
  gbpusd:number;
  usdjpy:number;
  usdchf:number;
  usdcad:number;
  usdsek:number;
  eurjpy:number;
  audusd:number;
  currencies : Currency[];
  constructor(
    private currencyService:CurrencyService,
  ) { }

  ngOnInit(): void {
    this.refreshData()
      this.interval = setInterval(() => {
        this.refreshData()
      },5000)  

  }
  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => {
          this.currencies = data['data']

          this.gbpusd = Number(this.currencies[2].satis.replace(/,/, '.')) / Number(this.currencies[0].satis.replace(/,/, '.'))
          this.gbpusd = Number(this.gbpusd.toFixed(4))
          
          this.usdjpy = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[11].satis.replace(/,/, '.'))
          this.usdjpy = Number(this.usdjpy.toFixed(4))

          this.usdcad = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[4].satis.replace(/,/, '.'))
          this.usdcad = Number(this.usdcad.toFixed(4))

          this.usdsek = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[9].satis.replace(/,/, '.'))
          this.usdsek = Number(this.usdsek.toFixed(4))

          this.usdchf = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[3].satis.replace(/,/, '.'))
          this.usdchf = Number(this.usdchf.toFixed(4))

          this.eurjpy = Number(this.currencies[1].satis.replace(/,/, '.')) / Number(this.currencies[11].satis.replace(/,/, '.'))
          this.eurjpy = Number(this.eurjpy.toFixed(4))

          this.audusd = Number(this.currencies[7].satis.replace(/,/, '.')) / Number(this.currencies[0].satis.replace(/,/, '.'))
          this.audusd = Number(this.audusd.toFixed(4))

        })
  }
}
