import { MessageType } from './../../../core/_base/crud/utils/layout-utils.service';
import { AddPhoneNumberComponent } from './../../components/add-phone-number/add-phone-number.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UssdAppService } from '../../../shemeta';
// Angular
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// RxJS
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { DataTableItemModel, DataTableService } from '../../../core/_base/layout';
import { FormControl, FormGroup, FormBuilder, NgModel } from '@angular/forms';
import { LayoutUtilsService } from '../../../core/_base/crud';

import { MenuModel } from '../../models/menu.model'
import { MenuElementModel } from '../../models/menuElement.model'
@Component({
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SimulatorComponent implements OnInit {

  constructor(private ussdAppService: UssdAppService, public dialog: MatDialog, private layoutUtilsSercvice: LayoutUtilsService,) { }
  menuElements: any = [];
  ussdUsers: any = [];
  input: any;
  sessionId: any;
  selectedUser: any;
  phone = '911223344';
  myControl: FormControl = new FormControl();
  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.PopulateUsers();
    let randomSessionId = Math.floor(Math.random() * 1000);
    this.sessionId= randomSessionId.toString();
  }


  private PopulateUsers() {
    this.ussdAppService.getAllUssdUsers().pipe(
      tap(res => {
        //  menu:res;
        if (res) {
          this.ussdUsers = res.results;
          // res..forEach(mi => {
          //   this.ussdUsers.push(mi);
          // });
        }

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
  startNewSession() {
    if ( this.selectedUser === undefined) {
      this.layoutUtilsSercvice.showActionNotification
        ('Please Enter select a user.', MessageType.Create, 10000, true, false, 0, 'top');
      return;

    }
    this.input ='0';
    this.getNextMenu();
  }

  getNextMenu() {
    if (this.input === undefined || this.input === null || this.selectedUser === undefined) {
      this.layoutUtilsSercvice.showActionNotification
        ('Please Enter an Unput and select a user.', MessageType.Create, 10000, true, false, 0, 'top');
      return;

    }

    this.ussdAppService.getMenu(this.input, this.selectedUser.phoneNumber,this.sessionId).pipe(
      tap(res => {
        if (res) {
          if (res.menuElements) {
            this.menuElements = [];
            res.menuElements.forEach(mi => {
              this.menuElements.push(mi);
            });
          }
        }
        this.input = "";
      }),
      catchError(err => of(
      )),
      finalize(
        () => { }
      )
    ).subscribe();



  }
  addPhone() {
    // let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
    // saveMessageTranslateParam += customer.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
    // const _saveMessage = this.translate.instant(saveMessageTranslateParam);
    // const _messageType = customer.id > 0 ? MessageType.Update : MessageType.Create;
    const dialogRef = this.dialog.open(AddPhoneNumberComponent, { data: {} },);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.PopulateUsers();
      this.layoutUtilsSercvice.showActionNotification('Added a New User');
    });
  }

  reset() {
    this.input = "";
    this.selectedUser = undefined;
    this.menuElements = [];

  }

}