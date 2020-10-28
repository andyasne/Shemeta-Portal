import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { User, Role } from 'src/app/core/auth';
import { QueryParamsModel } from 'src/app/core/_base/crud';
import { SMSTemplateModel } from '../../models/smsTemplate';
import { SmsServiceService } from '../../services/sms-service.service';

@Component({
  selector: 'kt-msg-template',
  templateUrl: './msg-template.component.html',
  styleUrls: ['./msg-template.component.scss']
})
export class MsgTemplateComponent implements OnInit {
	dataSource: MatTableDataSource<SMSTemplateModel> ;;
	displayedColumns = ['_id','additionalAttributes' ,'AmharicLabel'];
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild('sort1', {static: true}) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
	lastQuery: QueryParamsModel;
	// Selection
	selection = new SelectionModel<User>(true, []);
	usersResult: User[] = [];
	allRoles: Role[] = [];

	// Subscriptions
	private subscriptions: Subscription[] = [];
  constructor(private smsServiceService: SmsServiceService,) { }

  ngOnInit(): void {

        this.smsServiceService.getTemplate()   .pipe(
          tap(res => {
            this.dataSource = new MatTableDataSource<SMSTemplateModel>(res);
          }) ,
          catchError(err => of(
            // new QueryResultsModel([], err)
            // console.log(err)
            )),
          finalize(
            () => { }
          )

          ).subscribe();
  }
  fetchUsers():void{

  }

  masterToggle(){

  }
  isAllSelected(){

  }
  deleteUser(user){

  }


}
