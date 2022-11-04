import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { doc } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AboutComponent implements OnInit {
  @ViewChild('addTourCloseModal') addTourCloseModal: ElementRef | undefined;
  @ViewChild('updateTourCloseModal') updateTourCloseModal:
    | ElementRef
    | undefined;
  tours: Array<any> = [];
  municipalities: Array<any> = [];

  public formBuild: FormGroup = new FormGroup({});
  public updateForm: FormGroup = new FormGroup({});

  imageUrl: Array<any> = [];

  searchValue: any;

  selectedTour: any;
  public comments: Array<any> = [];
  constructor(
    private firestore: Firestore,
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private storage: Storage,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buildForm();

    this.getTours();
  }

  getTours() {
    const tourQuery = collection(this.firestore, 'about');

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.updateForm = new FormGroup({
        aboutDescription: new FormControl(
          { value: this.tours[0]?.aboutDescription || '', disabled: false },
          Validators.required
        ),
      });
      this.spinner.hide();
    });
  }

  getComments() {}

  buildForm() {
    this.updateForm = new FormGroup({
      aboutDescription: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
    });
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

  selectData(id: any) {
    this.selectedTour = id;
    this.updateTour(id);
  }
  //about
  updateTour(id: any) {
    if (this.selectedTour) {
      this.spinner.show();
      const updateInstance = doc(this.firestore, 'about/' + id);

      updateDoc(updateInstance, this.updateForm.value)
        .then((res: any) => {
          this.imageUrl = [];
          console.log(res);
          this.successToast('About Updated Successfully');
          this.getTours();
          this.spinner.hide();

          this.updateTourCloseModal?.nativeElement.click();
          this.selectedTour = '';
        })
        .catch((err) => {
          console.log(err);
          this.errorToast(err.code);
          this.getTours();
          this.selectedTour = '';

          this.spinner.hide();
        });
    } else {
      this.errorToast('About does not exist!');
    }
  }
}
