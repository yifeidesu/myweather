import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {

  // todo move to env var
  private APIKEY = '41fe05d915b9210f85a5c3b82ee96bf1';

  // temperal
  cities = ['toronto', 'vancouver'];
  //private heroesUrl = 'api/heroes';  // URL to web api
  //private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?apikey=' + this.APIKEY + '&q=' + this.city;

  getWeatherUrl(city: String): string {
    return 'https://api.openweathermap.org/data/2.5/weather?apikey='
      + this.APIKEY + '&q='
      + city
      + '&units=metric';
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  // getWeathers(): Observable<any> {
  //   let weathers = [];
   
  //   return this.http.get<any>(this.weatherUrl)
  //     .pipe(
  //       tap(res => {
  //         console.log(res.main.temp);
  //         this.log(`fetched hero` + res.main.temp)
  //       }),
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  getWeatherForList(city: String): Observable<any> {
    let url = this.getWeatherUrl(city);
    console.log(url);

    return this.http.get<any>(url)
      .pipe(
        tap(res => {
          console.log(res.main.temp);

          this.log(`fetched hero` + res.main.temp)
        }),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getWeatherForecast(id: number): Observable<any> {
    //const url = `${this.weatherUrl}/${id}`;
    const url = this.getWeatherForecastUrl();
    return this.http.get<any>(url).pipe(
      tap(res => this.log(`===id=${id} \n forecast=${res}`)),
      catchError(this.handleError<any>(`getHero id=${id}`))
    );
  }

  // id to name, name put in url
  getWeatherForecastUrl(): string {
    return 'https://api.openweathermap.org/data/2.5/forecast?q=toronto&units=metric&apikey=' + this.APIKEY;
  }

  /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.weatherUrl}/?name=${term}`).pipe(
  //     tap(_ => this.log(`found heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.weatherUrl, hero, httpOptions).pipe(
  //     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }

  // /** DELETE: delete the hero from the server */
  // deleteHero(hero: Hero | number): Observable<Hero> {
  //   const id = typeof hero === 'number' ? hero : hero.id;
  //   const url = `${this.weatherUrl}/${id}`;

  //   return this.http.delete<Hero>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }

  /** PUT: update the hero on the server */
  // updateHero(hero: Hero): Observable<any> {
  //   return this.http.put(this.weatherUrl, hero, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}