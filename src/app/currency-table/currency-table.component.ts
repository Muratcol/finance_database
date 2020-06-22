import { Component, OnInit, ElementRef } from '@angular/core';
import { 
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faDollarSign,
  faEuroSign,
  faPoundSign
 } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { CurrencyCrosses } from '../currency/currency';


@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css'],
  providers: []
})
export class CurrencyTableComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  faDollarSign = faDollarSign
  faEuroSign = faEuroSign
  faPoundSign = faPoundSign
  interval: any;

  newusdchf:string;
  oldusdchf:string;

  newusdjpy:string;
  oldusdjpy:string;

  newusdcad:number;
  oldusdcad:number;

  newusdsek:number;
  oldusdsek:number;

  neweurjpy:number;
  oldeurjpy:number;

  newaudusd:number;
  oldaudusd:number;

  neweursek:number;
  oldeursek:number;


  currencies : CurrencyCrosses[];
  constructor(
    private currencyService:CurrencyService,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.refreshData()
      this.interval = setInterval(() => {
        this.refreshData()
      },2000)  

  }

  // currencyParser(firstCurrency:number, secondCurrency:number){
  //   let sum = Number(this.currencies[firstCurrency].satis.replace(/,/, '.')) / Number(this.currencies[secondCurrency].satis.replace(/,/, '.'))
  //   return Number(sum.toFixed(4))
  // }
  // getPercantage(oldCurrency:number, newCurrency:number) {
  //   let sum = "%" + (100 - (oldCurrency / newCurrency) * 100).toFixed(2)
  //   return sum
  // }



  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => {
          this.currencies = data['data']

          // this.newusdchf = this.currencies[3].ask
          // if (this.newusdchf != this.oldusdchf && this.oldusdchf != 0) {
          //   this.gbpusdDiffPerc = this.getPercantage(this.oldgbpusd, this.newgbpusd)
          //   this.gbpusdDiff = this.newgbpusd - this.oldgbpusd
          // }
          // this.oldgbpusd = this.newgbpusd
          

          setTimeout(() => {
            let animationCarriers = this.el.nativeElement.querySelectorAll('tr')
            for (let animationCarrier of animationCarriers) {
            if (animationCarrier.classList.contains('increase') || animationCarrier.classList.contains('decrease')) {
              animationCarrier.classList.remove('increase')
              animationCarrier.classList.remove('decrease')
          }
          }
          }, 3.5 * 1000)
          
        })
  }
}
