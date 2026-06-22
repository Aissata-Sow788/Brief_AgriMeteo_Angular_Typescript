import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetails } from './weather-details';

describe('WeatherDetails', () => {
  let component: WeatherDetails;
  let fixture: ComponentFixture<WeatherDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
