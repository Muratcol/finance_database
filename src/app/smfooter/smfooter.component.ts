import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Indicies } from './indicies';

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

  indicies : Indicies[];
  interval: any;
  ngOnInit(): void {
    this.refreshData()
      this.interval = setInterval(() => {
        this.refreshData()
      },5000)  
  } 

  refreshData(){
    this.currencyService.getIndices()
        .subscribe(data => this.indicies = data['data'])
  }

}