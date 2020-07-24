import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import { 
  faArrowAltCircleUp,
  faArrowAltCircleDown,

 } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { CurrencyCrosses } from '../currency/currency';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: []

})


export class CardsComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  animation:boolean = false
  interval: any;

  currencies : CurrencyCrosses[];
  constructor(
    private currencyService:CurrencyService,
    private el:ElementRef,
    private renderer:Renderer2
  ) { }

  ngOnInit(): void {
    this.refreshData()
  }
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }

  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => {
          this.currencies = data['data']
          this.animation= true
          setTimeout(() => {
            let animationCarriers = this.el.nativeElement.querySelectorAll('.usdBox')
            for (let animationCarrier of animationCarriers) {
            if (animationCarrier.classList.contains('decreaseCard') || animationCarrier.classList.contains('decreaseCard')) {
              this.renderer.removeClass(animationCarrier, 'increaseCard')
              this.renderer.removeClass(animationCarrier, 'decreaseCard')
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
