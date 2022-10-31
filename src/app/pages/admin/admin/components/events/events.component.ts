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

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class EventsComponent implements OnInit {
  @ViewChild('addFestivalCloseModal') addFestivalCloseModal:
    | ElementRef
    | undefined;
  @ViewChild('updateFestivalCloseModal') updateFestivalCloseModal:
    | ElementRef
    | undefined;
  festivals: Array<any> = [];
  public formBuild: FormGroup = new FormGroup({});
  public updateForm: FormGroup = new FormGroup({});

  imageUrl: Array<any> = [];
  rangeDates: Date | undefined;
  searchValue: any;
  municipalities: Array<any> = [];
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
    this.getMunicipalities();
  }

  getTours() {
    const tourQuery = collection(this.firestore, 'festivals');

    getDocs(tourQuery).then((res: any) => {
      this.festivals = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.spinner.hide();
    });
  }
  getMunicipalities() {
    const tourQuery = collection(this.firestore, 'history');

    getDocs(tourQuery).then((res: any) => {
      this.municipalities = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
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

      festivalTitle: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      originated: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      originatedId: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      festivalDate: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
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

      festivalTitle: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      originated: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      originatedId: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      festivalDate: new FormControl(
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

    this.festivals = this.festivals.filter(
      (res: any) =>
        res.festivalTitle.toLowerCase().includes(filterValue.toLowerCase()) ||
        res.originated.toLowerCase().includes(filterValue.toLowerCase())
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

      festivalTitle: new FormControl(
        { value: data.municipality || '', disabled: false },
        Validators.required
      ),
      originated: new FormControl(
        { value: data.originated || '', disabled: false },
        Validators.required
      ),
      originatedId: new FormControl(
        { value: data.originatedId || '', disabled: false },
        Validators.required
      ),
      festivalDate: new FormControl(
        { value: data.festivalDate || '', disabled: false },
        Validators.required
      ),
    });
  }

  addTourist() {
    if (this.formBuild.valid) {
      this.spinner.show();

      let data = {
        ...this.formBuild.value,
        imageGallery: this.imageUrl,
      };
      const tourInstance = collection(this.firestore, 'festivals');

      addDoc(tourInstance, data).then((res) => {
        this.spinner.hide();
        this.imageUrl = [];
        this.addFestivalCloseModal?.nativeElement.click();
        this.successToast('Data Added Successfully');
        this.getTours();
      });
    } else {
      this.formBuild.markAllAsTouched();
      console.log('not valid');

      console.log(this.formBuild);
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
    const deleteTourInstance = doc(this.firestore, 'festivals/' + id);

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
        'festivals/' + this.selectedTour.id
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
          this.successToast('Data Updated Successfully');
          this.getTours();
          this.spinner.hide();
          this.imageUrl = [];
          this.updateFestivalCloseModal?.nativeElement.click();
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
      this.errorToast('Data does not exist!');
    }
  }

  public toDate(data: any) {
    console.log(data[0].seconds);

    const date1 = new Date(data[0]?.seconds);
    const date2 = new Date(data[1]?.seconds);

    console.log(date1);

    return date1.toLocaleDateString() + ' - ' + date2.toLocaleDateString();
  }
}
