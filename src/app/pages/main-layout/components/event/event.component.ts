import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {
  addDoc,
  collection,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { getDocs } from 'firebase/firestore';
import { MarkdownService } from 'ngx-markdown';
import emailjs, { EmailJSResponseStatus, init } from '@emailjs/browser';
import { doc } from 'firebase/firestore';
import { MessageService } from 'primeng/api';
init('user_2OS84QxjMn43nqkQifnJH');
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [MessageService],
})
export class EventComponent implements OnInit {
  @ViewChild('modalCloseButton') modalCloseButton: ElementRef | undefined;

  date14: Date | undefined;

  message: string =
    'You are receiving this email because you subscribed to the following event below:';

  fullname: string = '';
  eventName: string = 'Test';
  email: string = 'barakotour.batangas@gmail.com';

  events: Array<any> = [];

  isLoading: boolean = false;
  municipalitiesFilter: Array<any> = [];
  public selectedFilter: string = '';
  public selectedEvent: any;

  public searchValue: string = '';
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(
    private firestore: Firestore,
    private messageService: MessageService
  ) {}
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

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });
    this.getEvents();
    this.getMunicipalities();
  }
  searchFilter(event: any) {
    this.getEvents();
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '' || filterValue == 'All') {
      this.isLoading = false;

      this.getEvents();
      this.searchValue = '';
      return;
    } else {
      setTimeout(() => {
        this.isLoading = false;

        this.events = this.events.filter(
          (res: any) =>
            res.municipality
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()) ||
            res.mayor.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }, 1000);
    }
  }
  async filter(event: any) {
    if (event == 'all') {
      this.selectedFilter = 'Filter';

      this.getEvents();
      return;
    }
    this.isLoading = true;

    this.getEvents();

    setTimeout(() => {
      this.selectedFilter = event;
      this.isLoading = false;
      this.events = this.events.filter((res: any) =>
        res.originated.toLowerCase().includes(event.toLowerCase())
      );
    }, 500);
  }
  getMunicipalities() {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'history');
    getDocs(tourQuery).then((res: any) => {
      this.municipalitiesFilter = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      // this.spinner.hide();
    });
  }

  getEvents(): void {
    const eventsDb = collection(this.firestore, 'festivals');

    const eventsQ = query(eventsDb, where('festivalDate', '==', '11-17-2022'));

    getDocs(eventsDb).then((res) => {
      this.events = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.isLoading = false;
      console.log(this.events);
    });
  }
  sendReminder(event: any): void {
    this.selectedEvent = event;

    console.log(this.selectedEvent);
  }
  addEvent(): void {
    const data = {
      email: this.email,
      eventDate: this.selectedEvent.festivalDate,
      eventName: this.selectedEvent.festivalTitle,
      name: this.fullname,
    };
    const addEvent = collection(this.firestore, 'subscribed');

    addDoc(addEvent, data).then((res) => {
      console.log(res);
      this.selectedEvent = [];

      this.email = '';
      this.fullname = '';
    });
  }

  sendEmailNotif() {
    console.log('sent');
    if (this.email == '' && this.fullname == '') {
      this.errorToast('Please fill up the fields');

      console.log('Please fill up the fields');

      return;
    } else if (!this.email.includes('@') || !this.email.includes('.com')) {
      this.errorToast('Please put a valid email');
      console.log('Please put a valid email');

      return;
    }
    let data = {
      full_name: this.fullname,
      eventDate: this.selectedEvent.festivalDate,
      message: this.message,
      event: this.selectedEvent.festivalTitle,
      email: this.email,
    };
    emailjs
      .send('service_qqa8bhn', 'template_33py05l', data, 'xhRrK14ZM1juEgWdu')
      .then((res: EmailJSResponseStatus) => {
        console.log(res.text);
        this.successToast('Subscrived to the event successfully');
        this.addEvent();

        this.modalClose();
      });
  }

  modalClose() {
    this.modalCloseButton?.nativeElement.click();
  }
}
