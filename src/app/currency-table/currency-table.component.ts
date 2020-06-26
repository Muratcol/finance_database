import { Component, OnInit, ElementRef } from '@angular/core';
import { 
  faArrowAltCircleUp,
  faArrowAltCircleDown,
 } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Advices } from './advices';


@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css'],
  providers: []
})
export class CurrencyTableComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  interval: any;


  advices : Advices[];
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


  refreshData(){
    this.currencyService.getForexAdvices()
        .subscribe(data => {
          this.advices = data['data']
     

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
