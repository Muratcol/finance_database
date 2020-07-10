import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Indices } from './indices';

@Component({
  selector: 'app-smfooter',
  templateUrl: './smfooter.component.html',
  styleUrls: ['./smfooter.component.css']
})
export class SmfooterComponent{
  faArrowAltCircleUp = faArrowAltCircleUp
  faArrowAltCircleDown = faArrowAltCircleDown
  constructor(
    private currencyService:CurrencyService,

    ) { }

  indices : Indices[];
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
    this.currencyService.getIndices()
        .subscribe(data => this.indices = data['data'])
  }

}