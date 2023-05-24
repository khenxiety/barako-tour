import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './components/footer/footer.component';
import { EventComponent } from './components/event/event.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { AboutComponent } from './components/about/about.component';
import { HistoryComponent } from './components/history/history.component';
import { TouristSpotsComponent } from './components/tourist-spots/tourist-spots.component';
import { FoodtripsComponent } from './components/foodtrips/foodtrips.component';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { PinComponent } from './components/svg-icons/pin/pin.component';
import { MarkdownModule } from 'ngx-markdown';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import { CommentsComponent } from './components/comments/comments.component';
import { FoodtripDetailsComponent } from './components/foodtrip-details/foodtrip-details.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {
    path: 'barako-tour',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'main-home',
        component: MainHomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'municipalities',
        component: HistoryComponent,
      },
      {
        path: 'batangas-event',
        component: EventComponent,
      },
      {
        path: 'tourist-spots',
        component: TouristSpotsComponent,
      },
      {
        path: 'tourist-spots/:id',
        component: TouristSpotsComponent,
      },
      {
        path: 'tourist-spots/tour-details/:id',
        component: TourDetailsComponent,
      },
      {
        path: 'localprod',
        component: FoodtripsComponent,
      },
      {
        path: 'localprod/:id',
        component: FoodtripsComponent,
      },
      {
        path: 'localprod/details/:id',
        component: FoodtripDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'barako-tour',
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [
    MainLayoutComponent,
    MainHeaderComponent,
    MainFooterComponent,
    HomePageComponent,
    MainHomeComponent,
    FooterComponent,
    EventComponent,
    AboutComponent,
    HistoryComponent,
    TouristSpotsComponent,
    FoodtripsComponent,
    PinComponent,
    TourDetailsComponent,
    CommentsComponent,
    FoodtripDetailsComponent,
    PlaceholderComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,
    TabViewModule,
    GalleriaModule,
    MarkdownModule,
    ToastModule,
  ],
})
export class MainPageModuleModule {}
