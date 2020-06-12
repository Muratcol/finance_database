import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CurrencyService } from '../services/currency.service';
import { Observable } from 'rxjs';
import { CurrencyChart } from '../currency/currency';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  providers: [CurrencyService],
})
export class LineChartComponent {
  dollarData: string;
  euroData: string;
  gbpData: string;
  chartData: any = [];
  datanew: any;
  sells:Array<number> = []
  dates:Array<string> = []





  constructor(private currencyService: CurrencyService) {}

  interval:any = setInterval(() => {
    
    this.updateChart();
    this.currencyService
      .getMyData()
      .subscribe((data) => (this.chartData = data));
      for (let i of this.chartData) {
        this.sells.push(i['sell'])
        var exactDate = i['date'].split('T', 2)
        exactDate = exactDate[1].split('.',2)
        this.dates.push(exactDate[0])
      }
      this.lineChartData = [{
        data: this.sells,
        label: "USD Daily Data"
      }]
      this.lineChartLabels = this.dates
      this.sells = []
      this.dates = []
      this.chartData = [];
  }, 30 * 60 * 1000);

  
  updateChart() {
    this.currencyService.updateChart();
    
  }

  lineChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0], label: 'USD Daily Data' },
  ];

  lineChartLabels: Label[] = [
    '06.00',
    '08.00',
    '10.00',
    '12.00',
    '14.00',
    '16.00',
    '18.00',
    '20.00',
    '22.00',
    '00.00',
    '02.00',
    '04.00'
  ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#E1BC28',
      backgroundColor: '#343A40',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}
