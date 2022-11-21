import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import emailjs, { EmailJSResponseStatus, init } from '@emailjs/browser';
import { doc } from 'firebase/firestore';
init('user_2OS84QxjMn43nqkQifnJH');
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
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

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });
    this.getEvents();
  }

  test() {
    console.log(this.date14?.toLocaleDateString());
  }
  sendReminder(event: any): void {}

  getEvents(): void {
    const eventsDb = collection(this.firestore, 'festivals');

    const eventsQ = query(eventsDb, where('festivalDate', '==', '11-17-2022'));

    getDocs(eventsDb).then((res) => {
      this.events = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      console.log(this.events);
    });
  }

  addEvent(): void {
    const data = {
      email: this.email,
      eventDate: this.date14?.toLocaleDateString(),
      eventName: this.eventName,
      name: this.fullname,
    };
    const addEvent = collection(this.firestore, 'subscribed');

    addDoc(addEvent, data).then((res) => {
      console.log(res);

      this.email = '';
      this.date14 = undefined;
      this.eventName = '';
      this.fullname = '';
    });
  }

  sendEmailNotif(): void {
    let data = {
      full_name: this.fullname,
      eventDate: this.date14?.toLocaleDateString(),
      message: this.message,
      event: this.eventName,
      email: this.email,
    };
    emailjs
      .send('service_qqa8bhn', 'template_33py05l', data, 'xhRrK14ZM1juEgWdu')
      .then((res: EmailJSResponseStatus) => {
        console.log(res.text);

        this.modalCloseButton?.nativeElement.click();
        this.addEvent();
      });
  }
}
