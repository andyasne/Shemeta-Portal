import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhoneNumberComponent } from './add-phone-number.component';

describe('AddPhoneNumberComponent', () => {
  let component: AddPhoneNumberComponent;
  let fixture: ComponentFixture<AddPhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
