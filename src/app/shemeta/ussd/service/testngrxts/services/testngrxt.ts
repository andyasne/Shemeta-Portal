import { Observable } from 'rxjs/Observable';
import { Testngrxt } from '../models/testngrxt';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TestngrxtService {
  constructor(private http: Http) { }

  public load(): Observable<Testngrxt[]> {
    return this.http
      .get(`https://api.myapi.com`, this.jwt())
      .map((res) => {
        return res.json();
      });
  }

  private jwt() {
    const jwtHeaders = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: jwtHeaders });
  }
}
