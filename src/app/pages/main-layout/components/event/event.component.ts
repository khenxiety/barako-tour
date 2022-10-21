import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  date14: Date | undefined;
  constructor() {}

  ngOnInit(): void {}

  test() {
    console.log(this.date14);
  }
}
