import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input('times') times = [];
  @Input('temps') temps = [];
  @Input('humidity') humidity = [];

  canvas: any;
  ctx: any;

  constructor() { }

  ngOnInit() {
    /** todo remove */
    // console.log("child chart");
    // console.log(this.times);
    // console.log(this.temps);
  }


  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.times, // x-axis labels, dates
        datasets: [{
          label: 'Temp',
          yAxisID: 'temp',
          data: this.temps, // temp changing, y values 
          backgroundColor: [
            'rgba(255, 99, 132, 0.1)'
          ],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          pointRadius: 0.5
        },
        {
          label: 'Humidity',
          yAxisID: 'humi',
          data: this.humidity, // humidity changing, y values 
          backgroundColor: [
            'rgba(0, 99, 132, 0.1)'
          ],
          borderColor: 'rgba(0, 99, 132, 1)',
          borderWidth: 2,
          pointRadius: 0,
          steppedLine: true
        }]
      },
      options: {
        responsive: false,
        tooltips: {
          backgroundColor: 'blue'
        },
        scales: {
          yAxes: [{
            id: 'temp',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Temp'
            }
          }, {
            id: 'humi',
            type: 'linear',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Humidity'
            },
            ticks: {
              max: 100,
              min: 0
            }
          }]
        }
      }
    });
  }
}
