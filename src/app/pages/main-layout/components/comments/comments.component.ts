import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comment: any;
  public tours: Array<any> = [];
  public comments: Array<any> = [];

  searchValue: any;
  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.getUserComments();
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
      console.log(res);

      this.comment = '';
    });
  }
}
