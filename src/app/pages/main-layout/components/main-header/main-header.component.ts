import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  navScroll: boolean = false;

  mobileView: boolean = false;
  collapse: boolean = false;
  constructor() {}

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

  ngOnInit(): void {}

  toCollapse() {
    this.collapse = this.collapse ? false : true;
  }
}
