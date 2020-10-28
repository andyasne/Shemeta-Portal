import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtilsService } from 'src/app/core/_base/crud';

import { SMSTemplateModel } from '../models/smsTemplate';


const url ="http://localhost:3000/v1/sms/template";

@Injectable({
  providedIn: 'root'
})
export class SmsServiceService {

  constructor(private http: HttpClient,private httpUtils: HttpUtilsService) {}

  getTemplate(): Observable<any> {
    return this.http.get<any>(url);
  }


}
