import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-foodtrips',
  templateUrl: './foodtrips.component.html',
  styleUrls: ['./foodtrips.component.scss'],
})
export class FoodtripsComponent implements OnInit {
  comment: any;
  public tours: Array<any> = [];
  public comments: Array<any> = [];
  // pagination
  public toursPerPage: number = 5;
  public selectedPage = 1;
  toursArray: any[] = [];

  searchValue: any;
  public municipalities: Array<any> = [];

  paramsId: string;
  isLoading: boolean = false;
  limit: number = 5;

  public specificFoodTitle: string = '';
  public selectedFilter: string = '';

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
      this.isLoading = true;
      this.getSpecificFoodtrips();
      this.getUserComments();
      this.getMunicipalities();
      return;
    }
    this.isLoading = true;
    this.getFoodtrips();
    this.getMunicipalities();
    this.getUserComments();
  }

  windowUp(): void {
    window.scroll({
      top: 0,
    });
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.toursPerPage = Number(newSize);
    this.changePage(0);
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

  async searchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      this.getFoodtrips();
      return;
    }
    this.isLoading = true;

    await this.getAllFoodtrips();

    setTimeout(() => {
      this.isLoading = false;
      this.toursArray = this.tours.filter(
        (res: any) =>
          res.foodTripTitle
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          res.originated.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }, 500);
  }
  async filter(event: any) {
    if (event == 'all') {
      this.getFoodtrips();
      this.selectedFilter = 'Filter';
      return;
    }
    this.isLoading = true;

    this.getFoodtripFilter(event.id);
    this.selectedFilter = event.municipality;
  }
  handleLimits() {
    this.limit = this.limit + 5;

    this.getFoodtrips();
  }

  getFoodtripFilter(event: any) {
    const filterDb = collection(this.firestore, 'foodtrip');

    const filterQ = query(filterDb, where('originatedId', '==', event));
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
  getFoodtrips() {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'foodtrip');
    const limitq = query(tourQuery, limit(this.limit));

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.tours.sort((a, b) => {
        if (a.originated < b.originated) {
          return -1;
        }
        if (a.originated > b.originated) {
          return 1;
        }

        return 0;
      });
      let pageIndex = (this.selectedPage - 1) * this.toursPerPage;
      this.toursArray = this.tours.slice(pageIndex, this.toursPerPage);
      this.isLoading = false;
    });
  }
  async getAllFoodtrips():Promise<any> {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'foodtrip');
    const limitq = query(tourQuery, limit(this.limit));
    await getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];


      this.tours.sort((a, b) => {
        if (a.originated < b.originated) {
          return -1;
        }
        if (a.originated > b.originated) {
          return 1;
        }
        return 0;
      });

      this.isLoading = false;
    });
    
  }
  getSpecificFoodtrips() {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'foodtrip');
    const q = query(tourQuery, where('originatedId', '==', this.paramsId));

    getDocs(q).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.specificFoodTitle = this.tours[0].originated;
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
