import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSentMessagesComponent } from './sms-sent-messages.component';

describe('SmsSentMessagesComponent', () => {
  let component: SmsSentMessagesComponent;
  let fixture: ComponentFixture<SmsSentMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSentMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSentMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
