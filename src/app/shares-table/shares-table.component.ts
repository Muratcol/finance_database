import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewChild,
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
export class SharesTableComponent implements AfterViewInit {

    @ViewChild('headerarea') headerarea: ElementRef
    @ViewChild('textarea') textarea: ElementRef
  
    ngAfterViewInit() {
      this.header = this.el.nativeElement.querySelector('.headerOutput')
      this.headerData = this.el.nativeElement.querySelector('.pt-1')
      this.renderer.setProperty(this.header, 'innerHTML', (this.headerarea.nativeElement as HTMLTableCellElement).innerText)
      this.renderer.setProperty(this.headerData, 'innerHTML', (this.textarea.nativeElement as HTMLTableCellElement).innerText)
    }
  
  faArrowAltCircleUp = faArrowAltCircleUp;
  faArrowAltCircleDown = faArrowAltCircleDown;
  changeText: boolean;
  values = "";

  constructor(
    private currencyService: CurrencyService,
    private el: ElementRef,
    private renderer: Renderer2

  ) {}

  shares: Shares[];
  interval: any;
  header: string;
  headerData: string;

  ngOnInit(): void {
    this.changeText = false;
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 7000);
  }
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
  refreshData() {
    this.currencyService
      .getShortShares()
      .subscribe((data) => (this.shares = data['data']));
  }

  mouseOver(event: any) {
    this.header = this.el.nativeElement.querySelector('.headerOutput')
    this.headerData = this.el.nativeElement.querySelector('.pt-1')
    this.renderer.setProperty(this.header, 'innerHTML', (event.target.parentNode.firstChild as HTMLTableCellElement).innerText)
    if ((event.target.parentNode.childNodes[2] as HTMLTableCellElement).innerText.includes('+')) {
      this.renderer.setStyle(this.headerData, 'color', 'green')
    }
    else {
      this.renderer.setStyle(this.headerData, 'color', 'red')
    }
    this.renderer.setProperty(this.headerData, 'innerHTML', (event.target.parentNode.childNodes[2] as HTMLTableCellElement).innerText)
  }
}
