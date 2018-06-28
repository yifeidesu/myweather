import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: string;
  @Input() weather: string;

  times = [];
  temps = [];
  humidity = [];

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

    // subscribe observable with id
    // todo change to get weather forecast
    this.weatherService.getWeatherForecast(id)
      .subscribe(weatherRes => {
        this.weather = weatherRes;

        weatherRes.list.forEach(element => {

          this.times.push(element.dt_txt);
          this.temps.push(element.main.temp);
          this.humidity.push(element.main.humidity);

        });
        console.log(this.times);
        console.log(this.temps);

      }
      );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // this.weatherService.updateHero(this.hero)
    //   .subscribe(() => this.goBack());
  }
}