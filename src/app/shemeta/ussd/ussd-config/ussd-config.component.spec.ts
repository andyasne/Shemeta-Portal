import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdConfigComponent } from './ussd-config.component';

describe('UssdConfigComponent', () => {
  let component: UssdConfigComponent;
  let fixture: ComponentFixture<UssdConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UssdConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
