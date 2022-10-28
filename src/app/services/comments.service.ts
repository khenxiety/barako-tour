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
import { from, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private firestore: Firestore) {}

  getComments(): Observable<any> {
    const dbInstance = collection(this.firestore, 'comments');
    const q = query(dbInstance, limit(3), orderBy('commentDate', 'desc'));

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
