import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService],
})
export class AdminComponent implements OnInit {
  isCollapsed: boolean = false;
  children: Array<any> = [
    // {
    //   title: 'dashboard',
    //   route: '/dashboard',
    // },
    {
      title: 'manage-municipalities',
      route: '/manage-history',
    },
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
      title: 'manage-event',
      route: '/manage-event',
    },
    {
      title: 'manage-about',
      route: '/manage-about',
    },
    {
      title: 'manage-accounts',
      route: '/manage-accounts',
    },
    {
      title: 'manage-comments',
      route: '/manage-comments',
    },
  ];
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  toCollapsed(event: any) {
    this.isCollapsed = event;
    console.log(this.isCollapsed);
  }
}
