import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionSnapshots,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import emailjs, { EmailJSResponseStatus, init } from '@emailjs/browser';

init('user_2OS84QxjMn43nqkQifnJH');
import { from, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private firestore: Firestore) {}

  getComments(): Observable<any> {
    const dbInstance = collection(this.firestore, 'comments');
    const q = query(dbInstance, limit(3), orderBy('commentDate', 'asc'));
    //momentjs

    return from(collectionSnapshots(q)).pipe(
      map((res) => {
        return res.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      })
    );
  }

  addComment(data: any) {
    const dbInstance = collection(this.firestore, 'comments');

    let email = {
      from_name: data.user,

      message: data.comment,

      email: data.email,
      commentAt: data.commentIn,
    };
    emailjs
      .send('service_qqa8bhn', 'template_u4t7nav', email, 'xhRrK14ZM1juEgWdu')
      .then((res: EmailJSResponseStatus) => {
        console.log(res.text);
      });

    return from(
      addDoc(dbInstance, data)
        .then((res) => {
          return { success: true, message: 'Data added Successfully' };
        })
        .catch((err) => {
          return { success: false, message: err.code };
        })
    );
  }
}
