import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.scss'],
  providers: [MessageService],
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
  constructor(private messageService: MessageService) {}
  successToast(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: detail,
    });
  }
  errorToast(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
    });
  }
  ngOnInit(): void {}
}
