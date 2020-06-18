import { Component, OnInit, ElementRef } from '@angular/core';
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
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [CurrencyService]

})
export class CardsComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  faDollarSign = faDollarSign
  faEuroSign = faEuroSign
  faPoundSign = faPoundSign
  interval: any;
  pariteSell:number;
  pariteBuy:number;
  currencies : Currency[];
  constructor(
    private currencyService:CurrencyService,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.refreshData()
      this.interval = setInterval(() => {
        this.refreshData()
      },5000)  

  }

  currencyParserSell(firstCurrency:number, secondCurrency:number){
    let sum = Number(this.currencies[firstCurrency].satis.replace(/,/, '.')) / Number(this.currencies[secondCurrency].satis.replace(/,/, '.'))
    return Number(sum.toFixed(5))
  }
  currencyParserBuy(firstCurrency:number, secondCurrency:number){
    let sum = Number(this.currencies[firstCurrency].alis.replace(/,/, '.')) / Number(this.currencies[secondCurrency].alis.replace(/,/, '.'))
    return Number(sum.toFixed(5))
  }

  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => {
          this.currencies = data['data']
          this.pariteSell = this.currencyParserBuy(0,1)
          this.pariteBuy = this.currencyParserSell(0,1)

          setTimeout(() => {
            let animationCarriers = this.el.nativeElement.querySelectorAll('.usdBox')
            for (let animationCarrier of animationCarriers) {
            if (animationCarrier.classList.contains('increaseCard') || animationCarrier.classList.contains('decreaseCard')) {
              animationCarrier.classList.remove('increaseCard')
              animationCarrier.classList.remove('decreaseCard')  
          }
          }
          }, 3.5 * 1000)
        })
  }
}
