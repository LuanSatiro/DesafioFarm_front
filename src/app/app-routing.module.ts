import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { FarmComponent } from './farm/farm.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { NewFarmComponent } from './farm/new-farm/new-farm.component';
import { DetailsFarmComponent } from './farm/details-farm/details-farm.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'farm/newFarm', component: NewFarmComponent },
  { path: 'farm/editFarm/:id', component: NewFarmComponent },
  { path: 'farm/details/:id', component: DetailsFarmComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
