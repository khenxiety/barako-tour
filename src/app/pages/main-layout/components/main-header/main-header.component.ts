import { Component, OnInit, HostListener } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  navScroll: boolean = false;

  mobileView: boolean = false;
  collapse: boolean = false;

  public contents:any[]=[]
  constructor(private firestore:Firestore) {}

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 10) {
      this.navScroll = true;
    } else {
      this.navScroll = false;
    }
  }
  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   if (event.target.innerWidth <= 765) {
  //     this.mobileView = true;
  //   } else {
  //     this.mobileView = false;
  //   }
  // }

  ngOnInit(): void {
    this.getContents()

  }

  toCollapse() {
    this.collapse = this.collapse ? false : true;
  }

  async getContents(){

    const contentInstance = collection(this.firestore,'contents')
    try {
      const contentData = await getDocs(contentInstance)
      this.contents = [
        ...contentData.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      console.log(this.contents)

    } catch (error) {
      throw error
    }
  }
}
