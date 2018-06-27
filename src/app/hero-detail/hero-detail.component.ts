import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: string;
  @Input() weather: string;

  constructor(
    private route: ActivatedRoute,
    private weatherService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // fetch detail by url 
    console.log('detail comp init!');
    
    this.getWeather();
  }

  getWeather(): void {
    // get id from path param
    const id = +this.route.snapshot.paramMap.get('id');

    // subscribe observable with id
    this.weatherService.getWeather(id)
      .subscribe(weather => this.weather = weather);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    // this.weatherService.updateHero(this.hero)
    //   .subscribe(() => this.goBack());
  }
}