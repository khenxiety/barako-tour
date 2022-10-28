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
  images: Array<any> = [
    {
      previewImageSrc: 'assets/images/islaverde1.jpg',
      thumbnailImageSrc: 'assets/images/islaverde1.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      previewImageSrc: 'assets/images/islaverde1.jpg',
      thumbnailImageSrc: 'assets/images/islaverde1.jpg',
      alt: 'Description for Image 1',
      title: 'Title 2',
    },
    {
      previewImageSrc: 'assets/images/islaverde2.jpeg',
      thumbnailImageSrc: 'assets/images/islaverde2.jpeg',
      alt: 'Description for Image 1',
      title: 'Title 3',
    },
    {
      previewImageSrc: 'assets/images/islaverde2.jpeg',
      thumbnailImageSrc: 'assets/images/islaverde2.jpeg',
      alt: 'Description for Image 1',
      title: 'Title 4',
    },
    {
      previewImageSrc: 'assets/images/islaverde2.jpeg',
      thumbnailImageSrc: 'assets/images/islaverde2.jpeg',
      alt: 'Description for Image 1',
      title: 'Title 5',
    },
  ];
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
    console.log(this.dataId);
  }

  getTour() {
    const tourInstance = doc(this.firestore, 'tours/' + this.dataId);

    getDoc(tourInstance).then((res: any) => {
      this.data = res.data();
      console.log(this.data, this.dataId);
    });
  }
}
