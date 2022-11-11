import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-tourist-spots',
  templateUrl: './tourist-spots.component.html',
  styleUrls: ['./tourist-spots.component.scss'],
})
export class TouristSpotsComponent implements OnInit {
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
  public municipalities: Array<any> = [];
  isLoading: boolean = false;
  comment: any;
  public tours: Array<any> = [];
  public comments: Array<any> = [];

  searchValue: any;
  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });

    this.getTours();
    this.getUserComments();
    this.getMunicipalities();
  }

  searchFilter(event: any) {
    this.getTours();
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    if (filterValue == '') {
      this.isLoading = false;

      this.getTours();
      this.searchValue = '';
      return;
    } else {
      setTimeout(() => {
        this.isLoading = false;

        this.tours = this.tours.filter(
          (res: any) =>
            res.tourTitle
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()) ||
            res.location.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }, 1000);
    }
  }
  async filter(event: any) {
    console.log(event);

    await this.getTours();
    // const filterValue = (event.target as HTMLInputElement).value;
    // if (filterValue == '') {
    //   this.getTours();
    //   return;
    // }

    this.tours = this.tours.filter(
      (res: any) =>
        res.tourTitle.toLowerCase().includes(event.toLowerCase()) ||
        res.location.toLowerCase().includes(event.toLowerCase())
    );
  }
  getMunicipalities() {
    const municipalities = collection(this.firestore, 'history');

    getDocs(municipalities).then((res) => {
      this.municipalities = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      console.log(this.municipalities);
      this.isLoading = false;
    });
  }

  getTours() {
    const tourQuery = collection(this.firestore, 'tours');

    const limitq = query(tourQuery, limit(10));
    this.isLoading = true;

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.isLoading = false;
    });
  }

  getUserComments() {
    this.commentsService.getComments().subscribe((res) => {
      this.comments = res;
    });
  }
  addUserComments() {
    let data = {
      comment: this.comment,

      commentDate: new Date().toString(),
      user: 'user',
    };

    this.commentsService.addComment(data).subscribe((res) => {
      this.comment = '';
    });
  }
}
