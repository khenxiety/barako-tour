import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tourist-spots',
  templateUrl: './tourist-spots.component.html',
  styleUrls: ['./tourist-spots.component.scss'],
})
export class TouristSpotsComponent implements OnInit {
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
