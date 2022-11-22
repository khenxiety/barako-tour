import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import {
  deleteObject,
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

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class HistoryComponent implements OnInit {
  @ViewChild('addTourCloseModal') addTourCloseModal: ElementRef | undefined;
  @ViewChild('updateTourCloseModal') updateTourCloseModal:
    | ElementRef
    | undefined;
  tours: Array<any> = [];
  public formBuild: FormGroup = new FormGroup({});
  public updateForm: FormGroup = new FormGroup({});

  imageUrl: Array<any> = [];

  searchValue: any;

  selectedTour: any = [];
  constructor(
    private firestore: Firestore,
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buildForm();

    this.getTours();
  }

  getTours() {
    const tourQuery = collection(this.firestore, 'history');

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.tours.sort((a, b) => {
        if (a.municipality < b.municipality) return -1;
        if (a.municipality > b.municipality) return 1;

        return 0;
      });
      this.spinner.hide();
    });
  }

  buildForm() {
    this.formBuild = new FormGroup({
      descriptionSummary: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),

      descriptionOutro: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),

      municipality: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      locationUrl: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      contact: new FormControl({ value: '', disabled: false }),
      email: new FormControl({ value: '', disabled: false }),

      mayor: new FormControl({ value: '', disabled: false }),
    });
    this.updateForm = new FormGroup({
      descriptionSummary: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),

      descriptionOutro: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),

      municipality: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      locationUrl: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      contact: new FormControl({ value: '', disabled: false }),
      email: new FormControl({ value: '', disabled: false }),

      mayor: new FormControl({ value: '', disabled: false }),
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

  async myUploader(event: any) {
    const uploadingTask = await new Promise((resolve, reject) => {
      this.spinner.show();

      event.files.forEach(async (element: any) => {
        const storageRef = await ref(
          this.storage,
          `images/${this.formBuild.value.tourTitle}/${element.name}`
        );
        const upload = uploadBytesResumable(storageRef, element);

        upload.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);

            if (progress === 100) {
              setTimeout(() => {
                getDownloadURL(upload.snapshot.ref).then((url) => {
                  resolve('uploaded');

                  this.imageUrl.push({
                    previewImageSrc: url,
                    thumbnailImageSrc: url,
                    alt: upload.snapshot.metadata.name,
                    title: upload.snapshot.metadata.name,
                  });
                });
              }, 2000);
            }
          },
          () => {
            getDownloadURL(upload.snapshot.ref).then((url) => {
              console.log('dlurl', url);
            });
          }
        );
      });
    });

    this.spinner.hide();

    console.log(this.imageUrl);
    this.successToast('Images Uploaded');
  }

  searchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      this.getTours();
      return;
    }

    this.tours = this.tours.filter(
      (res: any) =>
        res.municipality.toLowerCase().includes(filterValue.toLowerCase()) ||
        res.mayor.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  selectedData(data: any) {
    this.selectedTour = data;
    this.updateForm = new FormGroup({
      descriptionSummary: new FormControl(
        { value: data.descriptionSummary || '', disabled: false },
        Validators.required
      ),

      descriptionOutro: new FormControl(
        { value: data.descriptionOutro || '', disabled: false },
        Validators.required
      ),

      municipality: new FormControl(
        { value: data.municipality || '', disabled: false },
        Validators.required
      ),
      locationUrl: new FormControl(
        { value: data.locationUrl || '', disabled: false },
        Validators.required
      ),
      contact: new FormControl({
        value: data.contact || '',
        disabled: false,
      }),
      email: new FormControl({ value: data.email || '', disabled: false }),

      mayor: new FormControl({
        value: data.mayor || '',
        disabled: false,
      }),
    });
  }

  addTourist() {
    if (this.formBuild.valid) {
      this.spinner.show();

      let data = {
        ...this.formBuild.value,
        imageGallery: this.imageUrl,
      };
      const tourInstance = collection(this.firestore, 'history');

      addDoc(tourInstance, data).then((res) => {
        this.spinner.hide();
        this.imageUrl = [];
        this.addTourCloseModal?.nativeElement.click();
        this.successToast('Data Added Successfully');
        this.getTours();
      });
    } else {
      this.formBuild.markAllAsTouched();
    }
  }

  confirm(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTour(id);
      },
      reject: () => {
        this.errorToast('Data not Deleted Successfully');
      },
    });
  }

  deleteTour(id: any) {
    const deleteTourInstance = doc(this.firestore, 'history/' + id);

    deleteDoc(deleteTourInstance)
      .then((res) => {
        this.successToast('Tour Deleted Successfully');
        this.getTours();
      })
      .catch((err) => {
        this.errorToast(err.code);
      });
  }

  updateTour() {
    if (this.selectedTour.id) {
      this.spinner.show();
      const updateInstance = doc(
        this.firestore,
        'history/' + this.selectedTour.id
      );

      let data;
      if (this.imageUrl.length === 0) {
        data = {
          ...this.updateForm.value,
        };
      } else {
        data = {
          ...this.updateForm.value,

          imageGallery: arrayUnion(...this.imageUrl),
        };
      }

      updateDoc(updateInstance, data)
        .then((res: any) => {
          this.successToast('Tour Updated Successfully');
          this.getTours();
          this.spinner.hide();
          this.imageUrl = [];
          this.updateTourCloseModal?.nativeElement.click();
          this.selectedTour = [];
        })
        .catch((err) => {
          console.log(err);
          this.errorToast(err.code);
          this.getTours();
          this.selectedTour = [];

          this.spinner.hide();
        });
    } else {
      this.errorToast('Tour does not exist!');
    }
  }

  deleteImage(image: any) {
    if (this.selectedTour.id) {
      this.spinner.show();
      const storageRef = ref(this.storage, `images/undefined/${image.name}`);

      deleteObject(storageRef).then(() => {
        console.log('deleted');
        const updateInstance = doc(
          this.firestore,
          'history/' + this.selectedTour.id
        );
        let data = {
          imageGallery: arrayRemove(image),
        };
        updateDoc(updateInstance, data)
          .then((res: any) => {
            this.imageUrl = [];
            console.log(res);
            this.successToast('Image Deleted Successfully');
            this.getTours();
            this.spinner.hide();
          })
          .catch((err) => {
            console.log(err);
            this.errorToast(err.code);
            this.getTours();
          });
      });
    } else {
      this.errorToast('Tour does not exist!');
    }
    return;
  }
}
