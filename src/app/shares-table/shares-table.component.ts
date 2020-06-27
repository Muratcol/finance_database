import {
  Component,
  OnInit,
} from '@angular/core';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from '../services/currency.service';
import { Shares } from './shares';

@Component({
  selector: 'app-shares-table',
  templateUrl: './shares-table.component.html',
  styleUrls: ['./shares-table.component.css'],
})
export class SharesTableComponent implements OnInit {
  faArrowAltCircleUp = faArrowAltCircleUp;
  faArrowAltCircleDown = faArrowAltCircleDown;
  changeText: boolean;


  constructor(
    private currencyService: CurrencyService,

  ) {}

  shares: Shares[];
  interval: any;
  ngOnInit(): void {
    this.changeText = false;
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }



  refreshData() {
    this.currencyService
      .getShortShares()
      .subscribe((data) => (this.shares = data['data']));
  }
}
