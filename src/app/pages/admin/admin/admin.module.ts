import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { TouristSpotsComponent } from './components/tourist-spots/tourist-spots.component';
import { AboutComponent } from './components/about/about.component';
import { FoodtripsComponent } from './components/foodtrips/foodtrips.component';
import { HistoryComponent } from './components/history/history.component';
import { FestivalsComponent } from './components/festivals/festivals.component';
import { EventsComponent } from './components/events/events.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { TableModule } from 'primeng/table';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
const routes: Routes = [
  {
    path: 'barako-admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'manage-tourist-spots',
        component: TouristSpotsComponent,
      },
      {
        path: 'manage-foodtrips',
        component: FoodtripsComponent,
      },
      {
        path: 'manage-festivals',
        component: FestivalsComponent,
      },
      {
        path: 'manage-about',
        component: AboutComponent,
      },
      {
        path: 'manage-history',
        component: HistoryComponent,
      },
      {
        path: 'manage-event',
        component: EventsComponent,
      },
      {
        path: '',
        redirectTo: 'manage-tourist-spots',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AdminComponent,

    TouristSpotsComponent,
    AboutComponent,
    FoodtripsComponent,
    HistoryComponent,
    FestivalsComponent,
    EventsComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    AdminHeaderComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), TableModule],
})
export class AdminModule {}
