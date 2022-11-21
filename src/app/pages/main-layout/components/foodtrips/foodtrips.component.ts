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

  searchValue: any;
  public municipalities: Array<any> = [];

  paramsId: string;
  isLoading: boolean = false;
  limit: number = 5;

  public specificFoodTitle: string = '';

  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.paramsId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });

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

  searchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      this.getFoodtrips();
      return;
    }
    this.isLoading = true;

    this.getAllFoodtrips();

    setTimeout(() => {
      this.isLoading = false;
      this.tours = this.tours.filter(
        (res: any) =>
          res.foodTripTitle
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          res.originated.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }, 500);
  }
  async filter(event: any) {
    console.log(event);
    if (event == 'all') {
      this.getFoodtrips();
      return;
    }
    this.isLoading = true;

    this.getAllFoodtrips();

    setTimeout(() => {
      this.isLoading = false;
      this.tours = this.tours.filter(
        (res: any) =>
          res.foodTripTitle.toLowerCase().includes(event.toLowerCase()) ||
          res.originated.toLowerCase().includes(event.toLowerCase())
      );
    }, 500);
  }
  handleLimits() {
    this.limit = this.limit + 5;

    this.getFoodtrips();
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
  getFoodtrips() {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'foodtrip');
    const limitq = query(tourQuery, limit(this.limit));

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
  getAllFoodtrips() {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'foodtrip');
    const limitq = query(tourQuery, limit(this.limit));
    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      console.log(this.tours);
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
      console.log(this.tours);
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
