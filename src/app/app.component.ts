import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
// title = 'tour of heros';
  

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor(){}

  ngOnInit(){}
}
