import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [MessageService],
})
export class AboutComponent implements OnInit {
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
