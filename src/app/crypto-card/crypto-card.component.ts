import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { 
  faArrowAltCircleUp,
  faArrowAltCircleDown,

 } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Cryptos } from '../crypto-main/crypto';


@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css']
})
export class CryptoCardComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  animation:boolean = false
  interval: any;

  cryptos : Cryptos[];
  constructor(
    private currencyService:CurrencyService,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.refreshData() 
  }
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }

  refreshData(){
    this.currencyService.getCryptos()
        .subscribe(data => {
          this.cryptos = data['data']
          this.animation= true
          setTimeout(() => {
            let animationCarriers = this.el.nativeElement.querySelectorAll('.usdBox')
            for (let animationCarrier of animationCarriers) {
            if (animationCarrier.classList.contains('decreaseCard') || animationCarrier.classList.contains('decreaseCard')) {
              animationCarrier.classList.remove('increaseCard')
              animationCarrier.classList.remove('decreaseCard')  
          }
          }
          }, 3.5 * 1000)
        })
    this.animation = false
  }
  ngAfterViewInit() {
    this.interval = setInterval(() => {
      this.refreshData()
    },5000)  
  }
}

