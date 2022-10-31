import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodtripDetailsComponent } from './foodtrip-details.component';

describe('FoodtripDetailsComponent', () => {
  let component: FoodtripDetailsComponent;
  let fixture: ComponentFixture<FoodtripDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodtripDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodtripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
