import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foodtrips',
  templateUrl: './foodtrips.component.html',
  styleUrls: ['./foodtrips.component.scss'],
})
export class FoodtripsComponent implements OnInit {
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
