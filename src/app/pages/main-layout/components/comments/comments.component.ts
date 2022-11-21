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

  comment: any;
  public tours: Array<any> = [];
  public comments: Array<any> = [];

  public email: string = '';
  public displayName: string = '';

  searchValue: any;
  constructor(
    private firestore: Firestore,
    private commentsService: CommentsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserComments();
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
    this.commentsService.getComments().subscribe((res) => {
      this.comments = res;
    });
  }
  addUserComments() {
    if (this.email == '' && this.displayName) {
      this.errorToast('Please Add a display name and your email to proceed');
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
