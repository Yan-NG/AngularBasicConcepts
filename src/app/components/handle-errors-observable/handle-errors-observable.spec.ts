import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleErrorsObservable } from './handle-errors-observable';

describe('HandleErrorsObservable', () => {
  let component: HandleErrorsObservable;
  let fixture: ComponentFixture<HandleErrorsObservable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleErrorsObservable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleErrorsObservable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
