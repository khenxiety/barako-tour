import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isCollapsed: boolean = false;
  children: Array<any> = [
    // {
    //   title: 'dashboard',
    //   route: '/dashboard',
    // },
    {
      title: 'manage-tourist-spots',
      route: '/manage-tourist-spots',
    },
    {
      title: 'manage-foodtrips',
      route: '/manage-foodtrips',
      icon: 'https://img.icons8.com/ios/50/000000/wok.png',
    },
    {
      title: 'manage-festivals',
      route: '/manage-festivals',
    },

    {
      title: 'manage-history',
      route: '/manage-history',
    },
    {
      title: 'manage-event',
      route: '/manage-event',
    },
    {
      title: 'manage-about',
      route: '/manage-about',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  toCollapsed(event: any) {
    this.isCollapsed = event;
    console.log(this.isCollapsed);
  }
}
