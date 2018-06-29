import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  MAP_KEY = environment.MAP_KEY;

  constructor() { }

}
