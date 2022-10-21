import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodtripsComponent } from './foodtrips.component';

describe('FoodtripsComponent', () => {
  let component: FoodtripsComponent;
  let fixture: ComponentFixture<FoodtripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodtripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
