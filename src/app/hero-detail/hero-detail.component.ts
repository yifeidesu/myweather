import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WeatherService } from '../weather.service';
import { getWeatherImageHtml } from '../cities';
import { DayData } from '../dayData';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: string;
  @Input() weather: string;

  // 5-day
  //res5days = [];

  times = [];
  temps = [];
  humidity = [];
  dayDataArray = [];

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // fetch detail by url 
    console.log('detail comp init!');

    this.getWeather();
  }

  getWeather(): void {
    // get id from path param
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('detail route id = ' + id);

    // subscribe observable with id
    // todo change to get weather forecast
    this.weatherService.getWeatherForecast(id)
      .subscribe(weatherRes => {

        /** rewrite */
        this.weather = weatherRes;
        this.prepare5DayData(this.weather);
        weatherRes.list.forEach(element => {

          this.times.push(element.dt_txt);
          this.temps.push(element.main.temp);
          this.humidity.push(element.main.humidity);
        });
      }
      );
  }

  prepare5DayData(res) {

    // const days = ['Sun.', 'Mon.', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'];
    // const day = new Date(res.list[0].dt);
  
  
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

        console.log(dt_txt);
        let date = new Date(dt_txt);
        console.log(date);

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
    console.log(this.dayDataArray);
    
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
}


