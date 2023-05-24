import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContentsComponent } from './manage-contents.component';

describe('ManageContentsComponent', () => {
  let component: ManageContentsComponent;
  let fixture: ComponentFixture<ManageContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
