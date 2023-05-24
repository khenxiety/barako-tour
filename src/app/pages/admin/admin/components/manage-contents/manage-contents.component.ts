import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, arrayRemove, collection, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-contents',
  templateUrl: './manage-contents.component.html',
  styleUrls: ['./manage-contents.component.scss'],
  providers: [MessageService, ConfirmationService],

})
export class ManageContentsComponent implements OnInit {

  imageUrl: Array<any> = [];

  public contents:any[] = []
  public contentFormGroup = new FormGroup({
    slogan:new FormControl(''),
    homepageContentHIstory:new FormControl('')
  })

  constructor(
    private storage: Storage,
    private firestore: Firestore,
    private spinner: NgxSpinnerService,
    private messageService:MessageService

    ) { }

  ngOnInit(): void {
    this.getContents()
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

  async getContents(){
    this.spinner.show()
    const contentInstance = collection(this.firestore,'contents')
    try {
      const contentData = await getDocs(contentInstance)
      this.contents = [
        ...contentData.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.contentFormGroup = new FormGroup({
        slogan:new FormControl(this.contents[0]?.slogan || ''),
        homepageContentHIstory:new FormControl(this.contents[0]?.homepageContentHIstory ||'')
      })
      this.spinner.hide()

    } catch (error) {
      this.spinner.hide()
      throw error
    }
  }

  async myUploader(event: any) {
    const uploadingTask = await new Promise((resolve, reject) => {
      this.spinner.show();

      event.files.forEach(async (element: any) => {
        const storageRef = await ref(
          this.storage,
          `images/contents/officialSeal/${element.name}`
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

    this.successToast('Images Uploaded');
  }

  async submit(){
    let data 
    if(this.imageUrl.length === 0){
      data = {
        slogan:this.contentFormGroup.get('slogan')?.value,
        homepageContentHIstory:this.contentFormGroup.get('homepageContentHIstory')?.value

      }
    }else{
      data = {
        officialSeal:this.imageUrl[0],
        slogan:this.contentFormGroup.get('slogan')?.value,
        homepageContentHIstory:this.contentFormGroup.get('homepageContentHIstory')?.value
      }
    }
    
    this.spinner.show();

    try {

      const tourInstance = doc(this.firestore, 'contents', this.contents[0].id);
      const submit = await updateDoc(tourInstance, data)
      this.imageUrl=[]
      this.getContents()
      this.successToast('Data submitted');

    } catch (error) {
      this.spinner.hide();

      throw error
    }

  }

  deleteImage(image: any) {
    if (this.contents[0].id) {
      this.spinner.show();
      const updateInstance = doc(
        this.firestore,
        'contents/' + this.contents[0].id
      );

      let data = {
        officialSeal: {},
      };

      updateDoc(updateInstance, data)
        .then((res: any) => {
          this.imageUrl = [];
          console.log(res);
          this.successToast('Image Deleted Successfully');
          // this.getTours();
          this.spinner.hide();
          this.getContents()

        })
        .catch((err) => {
          console.log(err);
          this.spinner.hide();

          this.errorToast(err.code);
        });
    } else {
      this.errorToast('Tour does not exist!');
    }
    return;
  }
}
