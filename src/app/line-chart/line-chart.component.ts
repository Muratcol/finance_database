import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CurrencyService } from '../services/currency.service';
import * as moment from 'moment';
import { Time } from '@angular/common';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  providers: [CurrencyService],
})
export class LineChartComponent {
  chartData: any = [];
  sells: Array<number> = [];
  dates: Array<any> = [];
  constructor(private currencyService: CurrencyService) {}

  interval: any = setInterval(() => {
    this.updateChart();
    this.sendDatasToChart();
  }, 10 * 1000);

  updateChart() {
    this.currencyService.updateChart();
  }

  sendDatasToChart() {
    this.currencyService
      .getMyData()
      .subscribe((data) => (this.chartData = data));
    for (let i of this.chartData) {
      this.sells.push(i['sell']);
      const date = new Date(i['date']);
      const momentDate = moment(date.toISOString());
      this.dates.push(momentDate);
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
  }

  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'USD/TRY Currency Chart', pointRadius: 0 },
  ];

  lineChartLabels: Date[] = [];

  lineChartOptions = {
    animation: {
      duration: 0,
    },
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    legend: {
      labels: {
        fontColor: 'white',
        fontSize: 18,
        fontFamily: 'Sawarabi Mincho',
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          ticks: {
            autoSkip: false,
            maxTicksLimit: 7,
            source: 'auto',
            beginAtZero: true,
          },
          time: {
            parser: 'HH',
            unit: 'minute',
          },
          displayFormats: {
            hour: 'h:mm a',
          },
          distribution: 'linear',
        },
      ],
    },
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
  ],
  borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
  ],
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#E1BC28',
    },
  ];
  

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}
