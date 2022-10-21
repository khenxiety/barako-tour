import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
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
  tourist: Array<any> = [
    {
      title: 'Villa Jovita',
      location: 'Santa Cruz, Agoncillo, Batangas',
      contact: '0956-562-0182',
      link: 'http://facebook.com/Villa-Jovita-453065921704808',
      description:
        'Known as the “The Bali of Batangas.” Villa Jovita is known for their spring water coming from Pansipit River and bamboo-canopied pools.',
      images: 'assets/images/islaverde2.jpeg',
    },
    {
      title: 'Adia Montana',
      location: 'Brgy. Adia, Agoncillo, Batangas',
      contact: 'adiamontanaph@gmail.com',
      link: 'https://www.facebook.com/adiamontanaph',
      description:
        'The uniqueness of this resort is by having infinity pool, cottages at the rolling hills and breathtaking view of Mt. Maculot from the view deck.',
      images: 'assets/images/islaverde2.jpeg',
    },
    {
      title: 'Pansipit River',
      location: 'N/A',
      contact: 'N/A',
      link: 'N/A',
      description:
        'The river stretches about 9 kilometres passing along the towns of Agoncillo, Lemery, San Nicolas and Taal serving as a border between the communities.',
      images: 'assets/images/islaverde2.jpeg',
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
  constructor() {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });
  }
}
