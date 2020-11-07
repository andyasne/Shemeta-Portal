import { SMSLabelModel, SMSTemplateModel } from './../../models/smsTemplate';
import { UssdAppService } from './../../services/ussdApp.service';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../core/_base/crud';
import { isBoolean } from 'lodash';
import { SmsServiceService } from '../../services/sms-service.service';
// Services and Models


@Component({
  selector: 'kt-add-sms-template',
  templateUrl: './add-sms-template.component.html',
  styleUrls: ['./add-sms-template.component.scss']
})
export class AddSmsTemplateComponent implements OnInit, OnDestroy {

  // Public properties
  smsTemplate: SMSTemplateModel;
  smsTemplateForm: FormGroup;
  hasFormErrors = false;
  viewLoading = false;
  // Private properties
  private componentSubscriptions: Subscription;
  dialog: any;
  layoutUtilsSercvice: any;

  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<smsTemplateEditDialogComponent>
   * @param data: any
   * @param fb: FormBuilder
   * @param store: Store<AppState>
   * @param typesUtilsService: TypesUtilsService
   */
  constructor(public dialogRef: MatDialogRef<AddSmsTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private smsServiceService: SmsServiceService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private typesUtilsService: TypesUtilsService) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    // this.store.pipe(select(selectsmsTemplatesActionLoading)).subscribe(res => this.viewLoading = res);

    this.smsTemplate = new SMSTemplateModel();
    this.smsTemplate.smsLabel = new SMSLabelModel();
    this.createForm();
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    if (this.componentSubscriptions) {
      this.componentSubscriptions.unsubscribe();
    }
  }

  createForm() {
    this.smsTemplateForm = this.fb.group({
      smsLabelAm: [this.smsTemplate.smsLabel.am,Validators.required],
      smsLabelEn: [this.smsTemplate.smsLabel.en],
      smsLabelOro: [this.smsTemplate.smsLabel.oro],
      smsLabelTig: [this.smsTemplate.smsLabel.tig],
      additionalAttributes: [this.smsTemplate.additionalAttributes],

    });
  }

  /**
   * Returns page title
   */
  getTitle(): string {
    return 'New SMS Template';
  }



  /**
   * Check control is invalid
   * @param controlName: string
   */
  isControlInvalid(controlName: string): boolean {
    const control = this.smsTemplateForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  /** ACTIONS */

  /**
   * Returns prepared smsTemplate
   */
  preparesmsTemplate(): SMSTemplateModel {
    const controls = this.smsTemplateForm.controls;
    const _smsTemplate = new SMSTemplateModel();
    _smsTemplate.smsLabel = new SMSLabelModel();
     _smsTemplate.additionalAttributes = controls.additionalAttributes.value;
    _smsTemplate.smsLabel.am = controls.smsLabelAm.value;
    _smsTemplate.smsLabel.en = controls.smsLabelEn.value;
    _smsTemplate.smsLabel.oro = controls.smsLabelOro.value;
    _smsTemplate.smsLabel.tig = controls.smsLabelTig.value;
    return _smsTemplate;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.smsTemplateForm.controls;
    /** check form */
    if (this.smsTemplateForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }

    const editedsmsTemplate = this.preparesmsTemplate();
   this.createsmsTemplate(editedsmsTemplate);
  }



  /**
   * Create smsTemplate
   *
   * @param _smsTemplate: smsTemplateModel
   */
  createsmsTemplate(_smsTemplate: SMSTemplateModel) {
    this.smsServiceService.createSMSTemplate(_smsTemplate).pipe(
      tap(res => {
        this.dialogRef.close({ _smsTemplate, isEdit: false });

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

  /** Alect Close event */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }
}

