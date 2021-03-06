import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';
import { v4 as uuid } from 'uuid';
import { stringify } from 'querystring';
import { cities, getWeatherEmoji } from '../cities';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-heroes',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities = cities;
  weathers = [];
  MAP_KEY:string = environment.MAP_KEY; 

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeathers();
  }
  

  getWeathers(): void {

    this.cities.forEach((cityObj) => {
      const city = cityObj.name;
      this.weatherService.getWeatherForList(city)
        .subscribe(weather => {
          this.weathers.push(weather);
          console.log(this.weathers);
        });
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    // add to citiarray 
    let newCity = { id: uuid(), name: name }
    this.cities.push(newCity);
    console.log(this.cities);


    // todo add city
    // this.heroService.addHero({ name } as string)
    //   .subscribe(hero => {
    //     this.cities.push(hero);
    //   });
  }

  delete(weather: any): void {
    this.cities = this.cities.filter(city => city.name != weather.main.name);
    //this.heroService.deleteCity(city).subscribe();
    console.log(this.cities);
  }

  getFormattedDate(UNIX_Timestamp): String {

    let time = new Date(UNIX_Timestamp * 1000);
    let timeStr = time.toLocaleDateString() + '  ' + time.toLocaleTimeString();

    return timeStr;
  }

  getWeatherDesc(weatherRes): String {
    let weather = weatherRes.weather[0];
    if (weather) {
      return weather.main + ', ' + weather.description;
    } else {
      return '';
    }
  }

  // to make up detail page url
  getCityId(weatherRes): String {
    let nameResp = weatherRes.name.toLowerCase();
    const res = this.cities.filter(city => city.name.includes(nameResp));
    if (res && res[0]) { return res[0].id.toString(); } else { return '' }
  }

  getWeatherImageHtml(desc: string): any {
    return getWeatherEmoji(desc);  
  }

  initAutocomplete(){
    alert('hello');
  }
}