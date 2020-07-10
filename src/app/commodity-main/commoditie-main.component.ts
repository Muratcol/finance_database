import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service'
import { Commodity } from './commodity';
import { 
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faDollarSign,
  faEuroSign,
  faPoundSign
 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-commoditie-main',
  templateUrl: './commoditie-main.component.html',
  styleUrls: ['./commoditie-main.component.css']
})

export class CommoditieMainComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  faDollarSign = faDollarSign
  faEuroSign = faEuroSign
  faPoundSign = faPoundSign
  constructor(
    private currencyService:CurrencyService,

    ) { }

  commodities : Commodity[];
  interval: any;
  ngOnInit(): void {
    this.refreshData()
      this.interval = setInterval(() => {
        this.refreshData()
      },5000)  
  } 
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
  refreshData(){
    this.currencyService.getCommodities()
        .subscribe(data => this.commodities = data['data'])
  }
}
