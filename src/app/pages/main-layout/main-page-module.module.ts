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
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { AboutComponent } from './components/about/about.component';
import { HistoryComponent } from './components/history/history.component';
import { TouristSpotsComponent } from './components/tourist-spots/tourist-spots.component';
import { FoodtripsComponent } from './components/foodtrips/foodtrips.component';
import { SublianComponent } from './components/sublian/sublian.component';
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
        path: 'history',
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
        path: 'tourist-spots/tour-details/:id',
        component: TourDetailsComponent,
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
    SublianComponent,
    PinComponent,
    TourDetailsComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    CalendarModule,
    FormsModule,
    ImageModule,
    TabViewModule,
    GalleriaModule,
    MarkdownModule,
  ],
})
export class MainPageModuleModule {}
