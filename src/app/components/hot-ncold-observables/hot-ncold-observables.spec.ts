import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotNcoldObservables } from './hot-ncold-observables';

describe('HotNcoldObservables', () => {
  let component: HotNcoldObservables;
  let fixture: ComponentFixture<HotNcoldObservables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotNcoldObservables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotNcoldObservables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
