import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableVsPromises } from './observable-vs-promises';

describe('ObservableVsPromises', () => {
  let component: ObservableVsPromises;
  let fixture: ComponentFixture<ObservableVsPromises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableVsPromises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableVsPromises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
