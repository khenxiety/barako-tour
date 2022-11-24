import { Component, OnInit, Input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [MessageService],
})
export class CommentsComponent implements OnInit {
  @Input() commentIn: string = '';
  @Input() isLoaded: boolean = false;

  comment: any;
  public tours: Array<any> = [];
  public comments: Array<any> = [];

  public email: any;
  public displayName: any;

  searchValue: any;
  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log(this.isLoaded);
    if (this.isLoaded) {
      this.getUserComments();
    }
  }
  successToast(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: detail,
    });
  }
  errorToast(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
    });
  }

  getUserComments() {
    this.commentsService.getComments(this.commentIn).subscribe((res) => {
      this.comments = res;

      this.comments.sort((a: any, b: any) => {
        if (a.commentDate < b.commentDate) return -1;
        if (a.commentDate > b.commentDate) return 1;
        return 0;
      });

      console.log(this.comments);

      console.log(res);
    });
  }
  addUserComments() {
    if (this.email == undefined && this.displayName == undefined) {
      this.errorToast('Please Add a display name and your email to proceed');
      return;
    }
    if (!this.email.includes('@') || !this.email.includes('.com')) {
      this.errorToast('Please put a valid email to proceed');
      return;
    }

    if (this.email == undefined) {
      this.errorToast('Please Add an email to proceed');
      return;
    }
    if (this.displayName == undefined) {
      this.errorToast('Please Add a display name to proceed');
      return;
    }

    if (this.comment == undefined) {
      this.errorToast('Please Add a comment to continue');
      return;
    }
    let data = {
      comment: this.comment,
      email: this.email,
      commentDate: new Date().toString(),
      user: this.displayName,
      commentIn: this.commentIn,
    };

    this.commentsService.addComment(data).subscribe((res) => {
      this.comment = '';
      this.email = '';

      this.displayName = '';

      this.successToast('Comment Added');
    });
  }
}
