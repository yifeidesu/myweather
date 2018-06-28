import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  //@Input() hero: Hero;
  @Input('times') times = [];
  @Input('temps') temps = [];
  @Input('humidity') humidity = [];

  constructor() { }

  ngOnInit() {
    console.log("child chart");
    console.log(this.times);
    console.log(this.temps);
  }

  canvas: any;
  ctx: any;

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
          data: this.humidity, // temp changing, y values 
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
        scales: {
          yAxes: [{
            id: 'temp',
            type: 'linear',
            position: 'left',
          }, {
            id: 'humi',
            type: 'linear',
            position: 'right',
            ticks: {
              max: 100,
              min: 0
            }
          }]
        }
        // display:true
      }
    });

    // let myChart = new Chart(this.ctx, {
    //   type: 'line',
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });

  }

}
