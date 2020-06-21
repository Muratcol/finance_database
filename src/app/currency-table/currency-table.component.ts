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

  newgbpusd:number;
  oldgbpusd:number = 0;
  gbpusdDiffPerc:string;
  gbpusdDiff:number;

  newusdjpy:number;
  oldusdjpy:number = 0;
  usdjpyDiffPerc:string;
  usdjpyDiff:number;


  newusdchf:number;
  oldusdchf:number;
  usdchfDiffPerc:string;
  usdchfDiff:number;


  newusdcad:number;
  oldusdcad:number;
  usdcadDiffPerc:string;
  usdcadDiff:number;


  newusdsek:number;
  oldusdsek:number;
  usdsekDiffPerc:string;
  usdsekDiff:number;

  neweurjpy:number;
  oldeurjpy:number;
  eurjpyDiffPerc:string;
  eurjpyDiff:number;

  newaudusd:number;
  oldaudusd:number;
  audusdDiffPerc:string;
  audusdDiff:number;

  neweursek:number;
  oldeursek:number;
  eursekDiffPerc:string;
  eursekDiff:number;

  currencies : Currency[];
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

  currencyParser(firstCurrency:number, secondCurrency:number){
    let sum = Number(this.currencies[firstCurrency].satis.replace(/,/, '.')) / Number(this.currencies[secondCurrency].satis.replace(/,/, '.'))
    return Number(sum.toFixed(4))
  }
  getPercantage(oldCurrency:number, newCurrency:number) {
    let sum = "%" + (100 - (oldCurrency / newCurrency) * 100).toFixed(2)
    return sum
  }



  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => {
          this.currencies = data['data']

          this.newgbpusd = this.currencyParser(2, 0)
          if (this.newgbpusd != this.oldgbpusd && this.oldgbpusd != 0) {
            this.gbpusdDiffPerc = this.getPercantage(this.oldgbpusd, this.newgbpusd)
            this.gbpusdDiff = this.newgbpusd - this.oldgbpusd
          }
          this.oldgbpusd = this.newgbpusd
          
          
          this.newusdjpy = this.currencyParser(0, 11)
          if (this.newusdjpy != this.oldusdjpy && this.oldusdjpy != 0) {
            this.usdjpyDiffPerc = this.getPercantage(this.oldusdjpy, this.newusdjpy)
            this.usdjpyDiff = this.newusdjpy - this.oldusdjpy
          }
          this.oldusdjpy = this.newusdjpy

          this.newusdchf = this.currencyParser(0, 3)
          if (this.newusdchf != this.oldusdchf && this.oldusdchf != 0) {
            this.usdchfDiffPerc = this.getPercantage(this.oldusdchf, this.newusdchf)
            this.usdchfDiff = this.newusdchf - this.oldusdchf
          }
          this.oldusdchf = this.newusdchf

          this.newusdcad = this.currencyParser(0, 4)
          if (this.newusdcad != this.oldusdcad && this.oldusdcad!= 0) {
            this.usdcadDiffPerc = this.getPercantage(this.oldusdcad, this.newusdcad)
            this.usdcadDiff = this.newusdcad - this.oldusdcad
          }
          this.oldusdcad = this.newusdcad

          this.newusdsek = this.currencyParser(0, 9)
          if (this.newusdsek != this.oldusdsek && this.oldusdsek!= 0) {
            this.usdsekDiffPerc = this.getPercantage(this.oldusdsek, this.newusdsek)
            this.usdsekDiff = this.newusdsek - this.oldusdsek
          }
          this.oldusdsek = this.newusdsek

          this.neweurjpy = this.currencyParser(1, 11)
          if (this.neweurjpy != this.oldeurjpy && this.oldeurjpy!= 0) {
            this.eurjpyDiffPerc = this.getPercantage(this.oldeurjpy, this.neweurjpy)
            this.eurjpyDiff = this.neweurjpy - this.oldeurjpy
          }
          this.oldeurjpy = this.neweurjpy

          this.newaudusd = this.currencyParser(7, 0)
          if (this.newaudusd != this.oldaudusd && this.oldaudusd!= 0) {
            this.audusdDiffPerc = this.getPercantage(this.oldaudusd, this.newaudusd)
            this.audusdDiff = this.newaudusd - this.oldaudusd
          }
          this.oldaudusd = this.newaudusd

          this.neweursek = this.currencyParser(1, 9)
          if (this.neweursek != this.oldeursek && this.oldeursek!= 0) {
            this.eursekDiffPerc = this.getPercantage(this.oldeursek, this.neweursek)
            this.eursekDiff = this.neweursek - this.oldeursek
          }
          this.oldeursek = this.neweursek


          setTimeout(() => {
            let animationCarriers = this.el.nativeElement.querySelectorAll('tr')
            for (let animationCarrier of animationCarriers) {
            if (animationCarrier.classList.contains('increase') || animationCarrier.classList.contains('decrease')) {
              animationCarrier.classList.remove('increase')
          }
          }
          }, 3.5 * 1000)
          
        })
  }
}
