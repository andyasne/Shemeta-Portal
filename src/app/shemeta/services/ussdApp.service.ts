// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { MenuModel } from '../models/menu.model';
import { MenuElementModel } from '../models/menuElement.model';

const API_DATATABLE_URL = 'http://localhost:3000/v1/menu/getNextMenu?sessionId=11&phoneNumber=9113211&selector=1';

@Injectable()
export class UssdAppService {

      constructor(private http: HttpClient) {
  }

  /**
   * Returns data from fake server
   */
  getAllItems(): Observable<MenuModel> {
    return this.http.get<MenuModel>(API_DATATABLE_URL);
  }
}
