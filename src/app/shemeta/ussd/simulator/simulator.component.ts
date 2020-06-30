import { Component, OnInit } from '@angular/core';
import { UssdAppService } from '../../../shemeta';
// Angular
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// RxJS
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { DataTableItemModel, DataTableService } from '../../../core/_base/layout';
import { MenuModel } from '../../models/menu.model'
import { MenuElementModel } from '../../models/menuElement.model'
@Component({
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {
  constructor(private ussdAppService: UssdAppService) { }
  menuElements: any = [];
  ngOnInit(): void {
  }
  getNextMenu() {
    this.ussdAppService.getAllItems().pipe(
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
        //  menu = res;
        // const result = this.baseFilter(res, queryParams);
        // this.entitySubject.next(result.items);
        // this.paginatorTotalSubject.next(result.totalCount);
        console.log(this.menuElements);
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