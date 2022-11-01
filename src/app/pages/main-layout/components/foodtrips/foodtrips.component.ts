import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
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

  isLoading: boolean = false;
  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });
    this.isLoading = true;
    this.getTours();
    this.getUserComments();
  }

  searchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      this.getTours();
      return;
    }

    this.tours = this.tours.filter(
      (res: any) =>
        res.foodTripTitle
          .toLowerCase()
          .includes(this.searchValue.toLowerCase()) ||
        res.originated.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  getTours() {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'foodtrip');

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
