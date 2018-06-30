import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WeatherService } from '../weather.service';
import { getWeatherImageHtml } from '../cities';
import { DayData } from '../dayData';
import { getDay, formatTime } from '../dateUtils';


@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  @Input() weather: string;

  times = [];
  temps = [];
  humidity = [];
  dayDataArray = [];

  datetime = '';

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    // get id from path param
    const id = +this.route.snapshot.paramMap.get('id');

    // subscribe observable with id
    // todo change to get weather forecast
    this.weatherService.getWeatherForecast(id)
      .subscribe(weatherRes => {

        //console.log(weatherRes);
        const dtTxt = weatherRes.list[0].dt_txt;
        this.datetime = getDay(dtTxt) + ' ' + dtTxt.slice(5, 10) + ' - ' + formatTime(dtTxt);

        /** rewrite */
        this.weather = weatherRes;
        this.prepare5DayData(this.weather);

        // for chart.
        weatherRes.list.forEach(element => {
          this.times.push(element.dt_txt);
          this.temps.push(element.main.temp);
          this.humidity.push(element.main.humidity);
        });
      }
      );
  }

  prepare5DayData(res) {

    let dates = [];

    res.list.forEach(element => {

      const dt_txt = element.dt_txt.slice(0, 10);
      let dayData;

      if (!dates.includes(dt_txt)) {

        dayData = new DayData(
          dt_txt,
          element.dt,
          element.main.temp_max,
          element.main.temp_min,
          element.weather[0].main);

        let date = new Date(dt_txt);

        console.log(element.dt_txt);

        const time = formatTime(element.dt_txt);

        dates.push(dt_txt);
        this.dayDataArray.push(dayData);

      } else {
        dayData = this.dayDataArray.filter(el => el.dtTxt == dt_txt)[0];
      }

      const elTempMax = element.main.temp_max;
      dayData.tempMax = (elTempMax > dayData.tempMax) ? elTempMax : dayData.tempMax;

      const elTempMin = element.main.temp_min;
      dayData.tempMin = (elTempMin < dayData.tempMin) ? elTempMin : dayData.tempMin;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // this.weatherService.updateHero(this.hero)
    //   .subscribe(() => this.goBack());
  }

  getWeatherImageHtml(desc: string): any {
    return getWeatherImageHtml(desc);
  }

  getDay(dt): string {
    return getDay(dt);
  }

  formatTime(dt): string {
    return formatTime(dt);
  }
}


