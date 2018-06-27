import { Component, OnInit } from '@angular/core';

//import { string } from '../hero';
import { HeroService } from '../hero.service';
import { v4 as uuid } from 'uuid';
import { stringify } from 'querystring';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  weathers = [];

  //seeds
  cityObjs = [
    { id: 1, name: 'vancouver' },
    { id: 2, name: 'ottawa' },
    { id: 3, name: 'hamilton' },
    { id: 4, name: 'london,ca' },
    { id: 5, name: 'kingston' },
    { id: 6, name: 'windsor' }];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getWeathers();
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //   .subscribe(heroes => this.heroes = heroes);
  // }

  getWeathers(): void {

    this.cityObjs.forEach((cityObj) => {
      let city = cityObj.name;
      this.heroService.getWeatherForList(city)
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
    this.cityObjs.push(newCity);
    console.log(this.cityObjs);


    // todo add city
    // this.heroService.addHero({ name } as string)
    //   .subscribe(hero => {
    //     this.cities.push(hero);
    //   });
  }

  delete(weather: any): void {
    this.cityObjs = this.cityObjs.filter(city => city.name != weather.main.name);
    //this.heroService.deleteCity(city).subscribe();
    console.log(this.cityObjs);
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
    const res = this.cityObjs.filter(city => city.name.includes(nameResp));
    if (res && res[0]) { return res[0].id.toString(); } else { return '' }
  }
}