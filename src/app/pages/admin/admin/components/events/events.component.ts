import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
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
