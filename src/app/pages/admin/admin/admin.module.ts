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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from 'primeng/editor';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageCommentsComponent } from './components/manage-comments/manage-comments.component';
import { CalendarModule } from 'primeng/calendar';
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
        path: 'manage-accounts',
        component: ManageUsersComponent,
      },
      {
        path: 'manage-comments',
        component: ManageCommentsComponent,
      },
      {
        path: '',
        redirectTo: 'manage-history',
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
    ManageUsersComponent,
    ManageCommentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmPopupModule,
    FileUploadModule,
    HttpClientModule,
    EditorModule,
    CalendarModule,
  ],
})
export class AdminModule {}
