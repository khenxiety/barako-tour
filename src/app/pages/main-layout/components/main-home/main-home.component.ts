import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import SwiperCore, { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
})
export class MainHomeComponent implements OnInit {
  test: Array<any> = [
    {
      pic: 'assets/HC.jpg',
    },
    {
      pic: 'assets/islaverde2.jpeg',
    },
    {
      pic: 'assets/islaverde1.jpg',
    },
    {
      pic: 'assets/churches_1445526887_7312_2522.jpg',
    },
    {
      pic: 'assets/Batangas-Summer-Destination-Camella-1-scaled.webp',
    },
    {
      pic: 'assets/Batangas-City.jpg',
    },
  ];
  foods: Array<any> = [
    {
      pic: 'assets/images/bulalo2.jpg',
    },
    {
      pic: 'assets/images/lomi.jpg',
    },
    {
      pic: 'assets/images/suman.jpg',
    },
    {
      pic: 'assets/images/tamales.jpg',
    },
    {
      pic: 'assets/Batangas-Summer-Destination-Camella-1-scaled.webp',
    },
    {
      pic: 'assets/Batangas-City.jpg',
    },
  ];

  foodtrips: Array<any> = [];
  festivals: Array<any> = [];

  tours: Array<any> = [];
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });

    this.getTours();
    this.getFoodtrips();
    this.getFestival();
  }
  config2: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  config1: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    freeMode: true,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    mousewheel: true,
    breakpoints: {
      '@0.10': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '@0.50': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  };

  getTours() {
    const tourQuery = collection(this.firestore, 'tours');

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }
  getFoodtrips() {
    const tourQuery = collection(this.firestore, 'foodtrip');

    getDocs(tourQuery).then((res: any) => {
      this.foodtrips = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }

  getFestival(): void {
    const tourQuery = collection(this.firestore, 'festivals');

    getDocs(tourQuery).then((res: any) => {
      this.festivals = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }
  onSwiper([swiper]: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
