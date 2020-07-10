import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Commodity } from '../commodity-main/commodity';

@Component({
  selector: 'app-commodityfooter',
  templateUrl: './commodityfooter.component.html',
  styleUrls: ['./commodityfooter.component.css']
})
export class CommodityfooterComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
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