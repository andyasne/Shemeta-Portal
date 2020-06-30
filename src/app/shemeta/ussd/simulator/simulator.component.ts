import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { UssdAppService } from '../../../shemeta';
// Angular
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// RxJS
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { DataTableItemModel, DataTableService } from '../../../core/_base/layout';
import { FormControl, FormGroup, FormBuilder, NgModel } from '@angular/forms';

import { MenuModel } from '../../models/menu.model'
import { MenuElementModel } from '../../models/menuElement.model'
@Component({
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit,AfterViewInit {
  constructor(private ussdAppService: UssdAppService) { }
  ngOnInit(): void {
  }
  menuElements: any = [];
  input:any;
  phone='911223344';
  myControl: FormControl = new FormControl();
  ngAfterViewInit(): void {}

  getNextMenu() {
    if(this.input===undefined|| this.input ===null)
    {
      this.input="1";
    }

    this.ussdAppService.getMenu(this.input,this.phone).pipe(
      tap(res => {
        //  menu:res;
        if (res) {
          if (res.menuElements) {
            this.menuElements = [];
            res.menuElements.forEach(mi => {
              this.menuElements.push(mi);
            });
          }
        }
      this.input="";
      }),
      catchError(err => of(
        // new QueryResultsModel([], err)
        // console.log(err);
      )),
      finalize(
        () => { }
      )
    ).subscribe();
  }
}