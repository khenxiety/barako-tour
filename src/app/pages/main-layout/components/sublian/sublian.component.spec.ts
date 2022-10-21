import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublianComponent } from './sublian.component';

describe('SublianComponent', () => {
  let component: SublianComponent;
  let fixture: ComponentFixture<SublianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SublianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
