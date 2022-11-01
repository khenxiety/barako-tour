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
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
})
export class TourDetailsComponent implements OnInit {
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

  isLoading: boolean = false;

  image: any = '';
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

    this.isLoading = true;
    this.getTour();
  }

  getTour() {
    const tourInstance = doc(this.firestore, 'tours/' + this.dataId);
    this.isLoading = true;
    getDoc(tourInstance).then((res: any) => {
      this.data = res.data();

      this.image = `url(${this.data?.imageGallery[0].previewImageSrc})`;
      this.isLoading = false;
    });
  }
}
