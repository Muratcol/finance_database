import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
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
export class CurrencyTableComponent implements AfterViewInit {

  @ViewChild('headerarea') headerarea: ElementRef
  @ViewChild('textarea') textarea: ElementRef

  ngAfterViewInit() {
    this.header = this.el.nativeElement.querySelector('.dxyCurrency')
    this.headerData = this.el.nativeElement.querySelector('.pt-1')
    this.renderer.setProperty(this.header, 'innerHTML', (this.headerarea.nativeElement as HTMLTableCellElement).innerText)
    this.renderer.setProperty(this.headerData, 'innerHTML', (this.textarea.nativeElement as HTMLTableCellElement).innerText)
  }

  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  interval: any;
  header: string;
  headerData: string;
  advice: any;
  values = "";

  advices : Advices[];
  constructor(
    private currencyService:CurrencyService,
    private el:ElementRef,
    private renderer:Renderer2
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
              this.renderer.removeClass(animationCarrier, 'increase')
              this.renderer.removeClass(animationCarrier, 'decrease')
          }
          }
          }, 3.5 * 1000)
          
        })
  }
  mouseOver(event: any) {

    this.header = this.el.nativeElement.querySelector('.dxyCurrency')
    this.headerData = this.el.nativeElement.querySelector('.pt-1')
    this.renderer.setProperty(this.header, 'innerHTML', (event.target.parentNode.firstChild as HTMLTableCellElement).innerText)
    if ((event.target.parentNode.childNodes[2] as HTMLTableCellElement).innerText.includes('Buy')) {
      this.renderer.setStyle(this.headerData, 'color', 'green')
    }
    else {
      this.renderer.setStyle(this.headerData, 'color', 'red')
    }
    this.renderer.setProperty(this.headerData, 'innerHTML', (event.target.parentNode.childNodes[2] as HTMLTableCellElement).innerText)
    
  }
}
