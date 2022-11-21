import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  searchValue: any;
  subscribed: any;
  constructor(private firestore: Firestore) {}

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
}
