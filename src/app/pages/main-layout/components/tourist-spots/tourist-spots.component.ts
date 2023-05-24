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
  // pagination

  public toursPerPage: number = 5;
  public selectedPage = 1;
  toursArray: any[] = [];

  public municipalities: Array<any> = [];
  isLoading: boolean = false;
  comment: any;
  public tours: Array<any> = [];
  public comments: Array<any> = [];

  searchValue: any;

  paramsId: string = '';

  limit: number = 5;

  public selectedFilter: string = '';
  public specificTourTitle: string = '';
  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.paramsId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.windowUp();

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
  windowUp(): void {
    window.scroll({
      top: 0,
    });
  }

  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.toursPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.tours.length / this.toursPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: any) {
    this.windowUp();

    this.selectedPage += page;
    this.slicedData();
  }
  previousPage(page: any) {
    this.windowUp();

    this.selectedPage -= page;
    this.slicedData();
  }
  slicedData() {
    let pageIndex = (this.selectedPage - 1) * this.toursPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.toursPerPage + this.toursPerPage;
    this.toursArray = [];
    this.toursArray = this.tours.slice(pageIndex, endIndex);
  }

  searchFilter(event: any) {
    this.getTours();
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      this.getTours();
      this.selectedFilter = 'Filter';
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

    // this.getAllTours();
    this.getTourFilter(event.id);
    this.selectedFilter = event.municipality;

    // setTimeout(() => {
    //   this.selectedFilter = event;
    //   this.isLoading = false;
    //   this.tours = this.tours.filter(
    //     (res: any) =>
    //       res.tourTitle.toLowerCase().includes(event.toLowerCase()) ||
    //       res.location.toLowerCase().includes(event.toLowerCase())
    //   );
    // }, 500);
  }

  getTourFilter(event: any) {
    const filterDb = collection(this.firestore, 'tours');

    const filterQ = query(filterDb, where('locationId', '==', event));
    getDocs(filterQ).then((res: any) => {
      this.toursArray = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.toursArray.sort((a, b) => {
        if (a.location < b.location) {
          return -1;
        }
        if (a.location > b.location) {
          return 1;
        }

        return 0;
      });

      this.isLoading = false;
    });
  }

  getMunicipalities() {
    const municipalities = collection(this.firestore, 'history');

    getDocs(municipalities).then((res) => {
      this.municipalities = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.isLoading = true;

      this.municipalities.sort((a, b) => {
        if (a.municipality < b.municipality) {
          return -1;
        }
        if (a.municipality > b.municipality) {
          return 1;
        }

        return 0;
      });
      this.isLoading = false;
    });
  }

  handleLimits() {
    // window.scroll({
    //   top: 0,
    // });
    this.limit = this.limit + 5;

    this.getTours();
  }

  getTours() {
    const tourQuery = collection(this.firestore, 'tours');

    const limitq = query(tourQuery, limit(this.limit));
    this.isLoading = true;

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.tours.sort((a, b) => {
        if (a.location < b.location) {
          return -1;
        }
        if (a.location > b.location) {
          return 1;
        }

        return 0;
      });
      let pageIndex = (this.selectedPage - 1) * this.toursPerPage;
      this.toursArray = this.tours.slice(pageIndex, this.toursPerPage);

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
      this.tours.sort((a, b) => {
        if (a.location < b.location) {
          return -1;
        }
        if (a.location > b.location) {
          return 1;
        }

        return 0;
      });
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
      let pageIndex = (this.selectedPage - 1) * this.toursPerPage;
      this.toursArray = this.tours.slice(pageIndex, this.toursPerPage);
      this.isLoading = false;
    });
  }

  getUserComments() {
    return;
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
