import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxJsOperators } from './rx-js-operators';

describe('RxJsOperators', () => {
  let component: RxJsOperators;
  let fixture: ComponentFixture<RxJsOperators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxJsOperators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxJsOperators);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
