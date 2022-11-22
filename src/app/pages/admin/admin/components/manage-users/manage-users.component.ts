import { Component, OnInit } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import emailjs, { EmailJSResponseStatus, init } from '@emailjs/browser';
init('user_2OS84QxjMn43nqkQifnJH');

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ManageUsersComponent implements OnInit {
  searchValue: any;
  subscribed: any;

  selecteddata: any;

  message: string = 'We are reminding you that you have an incoming event:';

  public isClicked: boolean = false;
  constructor(
    private firestore: Firestore,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService
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
    const subscribedDb = collection(this.firestore, 'subscribed');

    getDocs(subscribedDb).then((res) => {
      this.subscribed = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      console.log(this.subscribed);
    });
  }

  searchFilter(event: any) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // if (filterValue == '') {
    //   this.getTours();
    //   return;
    // }
    // this.tours = this.tours.filter(
    //   (res: any) =>
    //     res.municipality.toLowerCase().includes(filterValue.toLowerCase()) ||
    //     res.mayor.toLowerCase().includes(filterValue.toLowerCase())
    // );
  }

  selectedData(data: any) {
    this.selecteddata = data;
  }

  confirm(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteData(id);
      },
      reject: () => {
        this.errorToast('Data not Deleted Successfully');
      },
    });
  }

  deleteData(id: any) {
    const deleteTourInstance = doc(this.firestore, 'subscribed/' + id);

    deleteDoc(deleteTourInstance)
      .then((res) => {
        this.successToast('Data Deleted Successfully');
        this.ngOnInit();
      })
      .catch((err) => {
        this.errorToast(err.code);
      });
  }

  sendEmailNotif(email: ISubscribed) {
    this.isClicked = true;
    console.log(email);

    let data = {
      full_name: email?.name,
      eventDate: email?.eventDate,
      message: this.message,
      event: email?.eventName,
      email: email?.email,
    };
    emailjs
      .send('service_qqa8bhn', 'template_33py05l', data, 'xhRrK14ZM1juEgWdu')
      .then((res: EmailJSResponseStatus) => {
        console.log(res.text);
        this.successToast('Notification sent successfully');
        this.isClicked = false;
      });
  }
}

export interface ISubscribed {
  email: string;
  eventDate: string;
  eventName: string;
  id: string;
  name: string;
}
