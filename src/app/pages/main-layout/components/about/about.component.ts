import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  aboutContent: Array<any> = [];
  cmsContent: Array<any> = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });

    this.getAbout();
    this.getContents();

  }

  getAbout(): void {
    const aboutInstance = collection(this.firestore, 'about');

    getDocs(aboutInstance).then((res) => {
      this.aboutContent = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

    });
  }

  async getContents(){
    const contentInstance = collection(this.firestore, 'contents');
   
    try {
      const content = await getDocs(contentInstance)
      this.cmsContent = [
        ...content.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

    } catch (error) {
      throw error
    }

  }
}
