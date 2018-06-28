import { Component, OnInit } from '@angular/core';
// import { string } from '../hero';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: string[] = [];

  constructor(private heroService: WeatherService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    // this.heroService.getWeathers()
    //   .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    //to do get some weathers to show
  }
}