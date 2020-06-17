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
  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => {
          this.currencies = data['data']
          this.pariteSell = Number(this.currencies[0].alis.replace(/,/, '.')) / Number(this.currencies[1].alis.replace(/,/, '.'))
          this.pariteSell = Number(this.pariteSell.toFixed(5))
          this.pariteBuy = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[1].satis.replace(/,/, '.'))
          this.pariteBuy = Number(this.pariteBuy.toFixed(5))

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
