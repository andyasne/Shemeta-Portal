import { HttpUtilsService } from './../../core/_base/crud/utils/http-utils.service';
import { UssdUserModel } from './../models/ussdUser.model';
// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { MenuModel } from '../models/menu.model';
import { MenuElementModel } from '../models/menuElement.model';

const API_DATATABLE_URL = 'http://localhost:3000/v1/menu/getNextMenu?sessionId=11&phoneNumber=${phone}&selector=${selector}';

@Injectable()
export class UssdAppService {

      constructor(private http: HttpClient,private httpUtils: HttpUtilsService,) {
  }

  getMenu(selector:string,phone:string,sessionId:string): Observable<MenuModel> {
    return this.http.get<MenuModel>(`http://localhost:3000/v1/menu/getNextMenu?sessionId=${sessionId}&phoneNumber=${phone}&selector=${selector}`);
  }

  getAllUssdUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/v1/ussdUser');
  }

  createUssdUser(ussdUserModel:UssdUserModel): Observable<UssdUserModel> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.post<UssdUserModel>('http://localhost:3000/v1/ussdUser',ussdUserModel,{headers: httpHeaders});
  }

  getUserData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/v1/menu/getUserData');
  }
}
