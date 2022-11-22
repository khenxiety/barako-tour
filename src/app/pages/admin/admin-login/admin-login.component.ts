import { Component, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  providers: [MessageService],
})
export class AdminLoginComponent implements OnInit {
  public usersForm: FormGroup = new FormGroup({});

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
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
  buildForm() {
    this.usersForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async signUp() {
    const dbinstance = collection(this.firestore, 'users');

    const createUser = await createUserWithEmailAndPassword(
      this.auth,
      'admin.barakotour@gmail.com',
      'admin1234'
    );

    updateProfile(createUser.user, {
      displayName: 'admin',
    }).catch((err) => {
      console.log(err.code);
    });

    let data = {
      username: 'admin',
      email: 'admin.barakotour@gmail.com',
      password: 'admin1234',
    };

    addDoc(dbinstance, data)
      .then((res) => {
        // this.toastr.success('User added successfully');
        const date = new Date();

        // this.userModalClose?.nativeElement.click();
        // this.usersForm.reset();

        // this.ngAfterViewInit();
      })
      .catch((err) => {
        // this.toastr.error(err.message);
        // this.ngAfterViewInit();
        // this.spinner.hide();
        console.log(err.code);
      });
  }

  handlePassword(event: any) {
    event.type = event.type === 'password' ? 'text' : 'password';
  }

  signIn() {
    if (this.usersForm.valid) {
      signInWithEmailAndPassword(
        this.auth,
        this.usersForm.value.email,
        this.usersForm.value.password
      )
        .then((res) => {
          console.log(res);

          this.router.navigate(['/barako-admin']);
          this.successToast('Login Successfully');
        })
        .catch((err) => {
          console.log(err.code);
          this.errorToast(err.code);
        });
    } else {
      this.usersForm.markAllAsTouched();
      this.errorToast('Please fill up all the required fields');
    }
  }

  showPassword(password: any) {
    password.type = password.type === 'password' ? 'text' : 'password';
  }
}
