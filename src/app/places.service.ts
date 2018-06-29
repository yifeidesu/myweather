import { Injectable } from '@angular/core';
import { env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  MAP_KEY = env.MAP_KEY;

  constructor() { }

}
