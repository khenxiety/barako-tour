import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tour.webclient';

  ngOnInit(): void {
    const arr = [1, 2, 3, 4, 5];
    const object = [
      {
        id: 1,
        firstName: 'First',
        secondName: 'Second',
      },
      {
        id: 2,
        firstName: 'First 2',
        secondName: 'Second 2',
      },
      {
        id: 3,
        firstName: 'First 3',
        secondName: 'Second 3',
      },
      {
        id: 4,
        firstName: 'First 4',
        secondName: 'Second 4',
      },
    ];
    // double each values

    const total = object.filter((res) => res.id != 2);

    console.log(total);
  }
}
