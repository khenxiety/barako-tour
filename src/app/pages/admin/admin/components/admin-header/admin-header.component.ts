import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  @Output() collapse = new EventEmitter<any>();

  isCollapsed: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  collapsed() {
    this.isCollapsed = this.isCollapsed ? false : true;
    this.collapse.emit(this.isCollapsed);
  }

  signOut() {
    localStorage.clear();
    window.location.href = '/';
  }
}
