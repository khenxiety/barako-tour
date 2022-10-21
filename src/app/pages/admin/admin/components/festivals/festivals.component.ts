import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.scss'],
})
export class FestivalsComponent implements OnInit {
  tours: Array<any> = [
    {
      id: '1',
      image: 'assets/images/bats.jpg',
      title: 'Batangas',
      description: 'test',
      location: 'Batangas City',
      contact: '09999706684',
      email: 'test@gmail.com',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
