import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CurrencyService } from '../services/currency.service';

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
  sells: Array<number> = [];
  dates: Array<string> = [];

  constructor(private currencyService: CurrencyService) {}

  interval: any = setInterval(() => {
    this.updateChart();
    this.currencyService
      .getMyData()
      .subscribe((data) => (this.chartData = data));
    for (let i of this.chartData) {
      this.sells.push(i['sell']);
      this.dates.push(i['date']);
      // var exactDate = i['date'].split('T', 2)
      // exactDate = exactDate[1].split('.',2)
      // this.dates.push(exactDate[0])
    }
    this.lineChartData = [
      {
        data: this.sells,
        label: 'USD/TRY Currency Chart',
        pointRadius: 0,
      },
    ];
    this.lineChartLabels = this.dates;
    this.sells = [];
    this.dates = [];
    this.chartData = [];
  }, 10 * 1000);

  updateChart() {
    this.currencyService.updateChart();
  }

  sendDatasToChart() {
    
  }





  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'USD/TRY Currency Chart', pointRadius: 0 },
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
    '04.00',
  ];

  lineChartOptions = {
    animation: {
      duration: 0
    },
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          type:'time',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
          time: {
            displayFormats: {
              hour: 'hA'
            }
          }
        },
      ],
    },
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
