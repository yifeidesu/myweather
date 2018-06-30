import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  { path: 'cities', component: CitiesComponent },
  { path: '', redirectTo: '/cities', pathMatch: 'full' },
  { path: 'cities/:id', component: CityDetailComponent },
  { path: 'chart', component: ChartComponent }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})


export class AppRoutingModule { }
