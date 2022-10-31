import { Component, OnInit } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-foodtrip-details',
  templateUrl: './foodtrip-details.component.html',
  styleUrls: ['./foodtrip-details.component.scss'],
})
export class FoodtripDetailsComponent implements OnInit {
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

  data: any;

  dataId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore
  ) {
    this.dataId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });

    this.getTour();
  }

  getTour() {
    const tourInstance = doc(this.firestore, 'foodtrip/' + this.dataId);

    getDoc(tourInstance).then((res: any) => {
      this.data = res.data();
    });
  }
}
