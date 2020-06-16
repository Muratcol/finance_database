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

  currencies : Currency[];
  constructor(
    private currencyService:CurrencyService,
  ) { }

  ngOnInit(): void {
    this.refreshData()
      this.interval = setInterval(() => {
        this.refreshData()
      },2000)  

  }
  refreshData(){
    this.currencyService.getCurrencies()
        .subscribe(data => {
          this.currencies = data['data']

          this.newgbpusd = Number(this.currencies[2].satis.replace(/,/, '.')) / Number(this.currencies[0].satis.replace(/,/, '.'))
          this.newgbpusd = Number(this.newgbpusd.toFixed(4))
          if (this.newgbpusd != this.oldgbpusd && this.oldgbpusd != 0) {
            this.gbpusdDiffPerc = "%" + (100 - (this.oldgbpusd / this.newgbpusd) * 100).toFixed(2)
            this.gbpusdDiff = this.newgbpusd - this.oldgbpusd
          }
          this.oldgbpusd = this.newgbpusd
          
          this.newusdjpy = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[11].satis.replace(/,/, '.'))
          this.newusdjpy = Number(this.newusdjpy.toFixed(4))
          if (this.newusdjpy != this.oldusdjpy && this.oldusdjpy != 0) {
            this.usdjpyDiffPerc = "%" + (100 - (this.oldusdjpy / this.newusdjpy) * 100).toFixed(2)
            this.usdjpyDiff = this.newusdjpy - this.oldusdjpy
          }
          this.oldusdjpy = this.newusdjpy

          this.newusdchf = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[3].satis.replace(/,/, '.'))
          this.newusdchf = Number(this.newusdchf.toFixed(4))
          if (this.newusdchf != this.oldusdchf && this.oldusdchf != 0) {
            this.usdchfDiffPerc = "%" + (100 - (this.oldusdchf / this.newusdchf) * 100).toFixed(2)
            this.usdchfDiff = this.newusdchf - this.oldusdchf
          }
          this.oldusdchf = this.newusdchf

          this.newusdcad = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[4].satis.replace(/,/, '.'))
          this.newusdcad = Number(this.newusdcad.toFixed(4))
          if (this.newusdcad != this.oldusdcad && this.oldusdcad!= 0) {
            this.usdcadDiffPerc = "%" + (100 - (this.oldusdcad / this.newusdcad) * 100).toFixed(2)
            this.usdcadDiff = this.newusdcad - this.oldusdcad
          }
          this.oldusdcad = this.newusdcad

          this.newusdsek = Number(this.currencies[0].satis.replace(/,/, '.')) / Number(this.currencies[9].satis.replace(/,/, '.'))
          this.newusdsek = Number(this.newusdsek.toFixed(4))
          if (this.newusdsek != this.oldusdsek && this.oldusdsek!= 0) {
            this.usdsekDiffPerc = "%" + (100 - (this.oldusdsek / this.newusdsek) * 100).toFixed(2)
            this.usdsekDiff = this.newusdsek - this.oldusdsek
          }
          this.oldusdsek = this.newusdsek

          this.neweurjpy = Number(this.currencies[1].satis.replace(/,/, '.')) / Number(this.currencies[11].satis.replace(/,/, '.'))
          this.neweurjpy = Number(this.neweurjpy.toFixed(4))
          if (this.neweurjpy != this.oldeurjpy && this.oldeurjpy!= 0) {
            this.eurjpyDiffPerc = "%" + (100 - (this.oldeurjpy / this.neweurjpy) * 100).toFixed(2)
            this.eurjpyDiff = this.neweurjpy - this.oldeurjpy
          }
          this.oldeurjpy = this.neweurjpy

          this.newaudusd = Number(this.currencies[7].satis.replace(/,/, '.')) / Number(this.currencies[0].satis.replace(/,/, '.'))
          this.newaudusd = Number(this.newaudusd.toFixed(4))
          if (this.newaudusd != this.oldaudusd && this.oldaudusd!= 0) {
            this.audusdDiffPerc = "%" + (100 - (this.oldaudusd / this.newaudusd) * 100).toFixed(2)
            this.audusdDiff = this.newaudusd - this.oldaudusd
          }
          this.oldaudusd = this.newaudusd

        })
  }
}
