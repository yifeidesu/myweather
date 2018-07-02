import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import { element } from 'protractor';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input('times') times = [];
  @Input('temps') temps = [];
  @Input('humidities') humidities = [];
  @Input('winds') winds = [];
  @Input('windsDegree') windsDegree = [];

  canvas: any;
  ctx: any;
  myChart;

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

    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.times, // x-axis labels, dates
        datasets: [{}]
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            // backgroundColor: 'transparent',
            // align: 'top',
            // borderRadius: 0,
            // color: 'black',
            // offset: 6,
            font: {
              weight: 'bold'
            },
          }
        },


        legend: { display: false },
        responsive: false,
        tooltips: {

          callbacks: {
            title: function () {
              return '';
            },
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'hA'
              }
            }
          }],
          yAxes: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
            }
          }
          ]
        }
      }
    });

    this.showTemps();
    const btns = Array.from(document.querySelectorAll('.btn'));
    
    btns.forEach(btn => {
      
      
      btn.addEventListener('click', () => {
        btns.forEach(btn => {
          if(btn.classList.contains('active')){btn.classList.remove('active');}
        });
        
        btn.classList.add('active');
      });
    });
    
    
  }


  showTemps() {

    this.myChart.data.datasets[0].data = this.temps;
    this.myChart.data.datasets[0].steppedLine = false;
    this.myChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.1)';
    this.myChart.data.datasets[0].borderColor = 'rgba(255, 99, 132, 1)';
    this.myChart.data.datasets[0].borderWidth = 1;
    this.myChart.data.datasets[0].borderDash = [];
    this.myChart.data.datasets[0].pointRadius = 1;
    this.myChart.options.scales.yAxes[0].scaleLabel.labelString = "Temperature, C";
    this.myChart.options.plugins.datalabels.formatter = Math.round;
    this.myChart.options.plugins.datalabels.align = 'top';
    this.myChart.options.plugins.datalabels.color = 'rgba(255, 99, 132, 1)';
    this.myChart.options.plugins.datalabels.rotation = 0;
    this.myChart.options.plugins.datalabels.font.size = 12;

    this.myChart.update();
  }


  showHumidities() {

    this.myChart.data.datasets[0].data = this.humidities;
    this.myChart.data.datasets[0].steppedLine = true;
    this.myChart.data.datasets[0].pointRadius = 0.2;
    this.myChart.data.datasets[0].backgroundColor = 'rgba(0, 0, 255, 0.1)';
    this.myChart.data.datasets[0].borderColor = 'rgba(0, 0, 255, 1)';
    this.myChart.data.datasets[0].borderWidth = 1;
    this.myChart.data.datasets[0].borderDash = [];
    this.myChart.options.scales.yAxes[0].scaleLabel.labelString = "Humidity";
    this.myChart.options.plugins.datalabels.color = 'blue';
    this.myChart.options.plugins.datalabels.formatter = {};
    this.myChart.options.plugins.datalabels.align = '-60';
    this.myChart.options.plugins.datalabels.offset = 6;
    this.myChart.options.plugins.datalabels.rotation = 0;
    this.myChart.options.plugins.datalabels.font.size = 12;

    this.myChart.options.plugins.datalabels.formatter = function (value, context) {
      var i = context.dataIndex;
      return (i % 3 == 0) ? value + '%' : '';
    }

    this.myChart.update();
  }

  showWinds() {

    this.myChart.data.datasets[0].data = this.winds;
    this.myChart.data.datasets[0].steppedLine = false;
    this.myChart.data.datasets[0].backgroundColor = 'rgba(0, 200, 0, .1)';
    this.myChart.data.datasets[0].borderColor = 'rgba(0, 200, 0, 1)';
    this.myChart.data.datasets[0].borderWidth = 0.5;
    this.myChart.data.datasets[0].borderDash = [2, 2];
    this.myChart.data.datasets[0].pointRadius = 0;

    this.myChart.options.scales.yAxes[0].scaleLabel.labelString = "Wind, km/h";
    this.myChart.options.plugins.datalabels.formatter = {};
    this.myChart.options.plugins.datalabels.align = 'end';
    this.myChart.options.plugins.datalabels.color = 'green';
    this.myChart.options.plugins.datalabels.font.size = 20;
    
    const degrees = this.windsDegree;
    this.myChart.options.plugins.datalabels.rotation = function (context) {
      let i = context.dataIndex;
      return degrees[i]
    }

    this.myChart.options.plugins.datalabels.formatter = function (value, context) {

      var i = context.dataIndex;

      // const arrow  = 
      // ( degrees[i] < 22.5 || degrees[i] > 337.5 )? '\u2191' : 
      // ( degrees[i] > 22.5 && degrees[i] < 67.5 )? '\u2197' : 
      // ( degrees[i] > 67.5 && degrees[i] < 112.5 )? '\u2192' : 
      // ( degrees[i] > 112.5 && degrees[i] < 157.5 )? '\u2198' : 
      // ( degrees[i] < 157.5 && degrees[i] < 202.5 )? '\u2193' : 
      // ( degrees[i] < 202.5 && degrees[i] < 247.5 )? '\u2199' : 
      // ( degrees[i] < 247.5 && degrees[i] < 292.5 )? '\u2190' : 
      // ( degrees[i] < 292.5 && degrees[i] < 337.5 )? '\u2196' : '\u2191';

      return '\u2191';
    }
    this.myChart.update();
  }
}
