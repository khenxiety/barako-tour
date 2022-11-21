import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-tourist-spots',
  templateUrl: './tourist-spots.component.html',
  styleUrls: ['./tourist-spots.component.scss'],
})
export class TouristSpotsComponent implements OnInit {
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

  paramsId: string = '';

  limit: number = 5;

  public specificTourTitle: string = '';
  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.paramsId = this.activatedRoute.snapshot.params['id'];

    console.log(this.paramsId);
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });

    if (this.paramsId) {
      this.getSpecificTours();
      this.getUserComments();
      this.getMunicipalities();

      return;
    }

    this.getTours();
    this.getUserComments();
    this.getMunicipalities();
  }

  searchFilter(event: any) {
    this.getTours();
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    if (filterValue == '') {
      this.getTours();
      return;
    }
    this.isLoading = true;

    this.getAllTours();

    setTimeout(() => {
      this.isLoading = false;
      this.tours = this.tours.filter(
        (res: any) =>
          res.tourTitle
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          res.location.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }, 500);
  }
  async filter(event: any) {
    console.log(event);
    if (event == 'all') {
      this.getTours();
      return;
    }
    this.isLoading = true;

    this.getAllTours();

    setTimeout(() => {
      this.isLoading = false;
      this.tours = this.tours.filter(
        (res: any) =>
          res.tourTitle.toLowerCase().includes(event.toLowerCase()) ||
          res.location.toLowerCase().includes(event.toLowerCase())
      );
    }, 500);
  }

  getMunicipalities() {
    const municipalities = collection(this.firestore, 'history');

    getDocs(municipalities).then((res) => {
      this.municipalities = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.isLoading = false;
    });
  }

  handleLimits() {
    window.scroll({
      top: 0,
    });
    this.limit = this.limit + 5;

    this.getTours();
  }

  getTours() {
    const tourQuery = collection(this.firestore, 'tours');

    const limitq = query(tourQuery, limit(this.limit));
    this.isLoading = true;

    getDocs(limitq).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      console.log(this.tours);
      this.isLoading = false;
    });
  }

  getAllTours() {
    const tourQuery = collection(this.firestore, 'tours');

    this.isLoading = true;

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }

  getSpecificTours() {
    const tourQuery = collection(this.firestore, 'tours');
    const q = query(tourQuery, where('locationId', '==', this.paramsId));

    this.isLoading = true;

    getDocs(q).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.specificTourTitle = this.tours[0].location;
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
