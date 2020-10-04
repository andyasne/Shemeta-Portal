import { UssdAppService } from './../../services/ussdApp.service';
import { UssdUserModel } from './../../models/ussdUser.model';
import { USSDMenuModel } from './../../models/uSSDMenu.model';
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
// Services and Models
@Component({
  selector: 'kt-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  ussdUser: USSDMenuModel;
	ussdUserForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<ussdUserEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
	constructor(public dialogRef: MatDialogRef<AddMenuComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,private ussdAppService: UssdAppService,
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
    // this.store.pipe(select(selectussdUsersActionLoading)).subscribe(res => this.viewLoading = res);

		this.ussdUser = new USSDMenuModel();
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
		this.ussdUserForm = this.fb.group({
			code: [this.ussdUser.code, Validators.required],
			parentCode: [this.ussdUser.parentCode,{ value: '', disabled: true }],
			displayText: [this.ussdUser.displayText, Validators.required],
			selector: [this.ussdUser.selector, Validators.required],
			order: [this.ussdUser.order, Validators.required],
			menuType: [this.ussdUser.menuType],
			questionDataType: [this.ussdUser.questionDataType],
			exit: [this.ussdUser.exit],
			readOnly: [this.ussdUser.readOnly],
			loadUserData: [this.ussdUser.loadUserData]
	 	});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		// if (this.ussdUser.id > 0) {
		// 	return `Edit ussdUser '${this.ussdUser.firstName} ${
		// 		this.ussdUser.lastName
		// 		}'`;
		// }
		return 'New User';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.ussdUserForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared ussdUser
	 */
	prepareussdUser(): UssdUserModel {
		const controls = this.ussdUserForm.controls;
		const _ussdUser = new UssdUserModel();

		const registrationDate = controls.registrationDate.value;
		if (registrationDate) {
			_ussdUser.registrationDate = this.typesUtilsService.dateFormat(registrationDate);
		} else {
			_ussdUser.registrationDate = '';
		}
		_ussdUser.phoneNumber = controls.phoneNumber.value;
		_ussdUser.fullName = controls.fullName.value;
		_ussdUser.defaultLanguage = controls.defaultLanguage.value;
		 _ussdUser.isActive = Boolean(controls.isActive.value);
		return _ussdUser;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.ussdUserForm.controls;
		/** check form */
		if (this.ussdUserForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedussdUser = this.prepareussdUser();
		if (editedussdUser.id===undefined) {
			this.createussdUser(editedussdUser);

		} else {
			this.updateussdUser(editedussdUser);

		}
	}

	/**
	 * Update ussdUser
	 *
	 * @param _ussdUser: UssdUserModel
	 */
	updateussdUser(_ussdUser: UssdUserModel) {
		const updateussdUser: Update<UssdUserModel> = {
			id: _ussdUser.id,
			changes: _ussdUser
		};
		// this.store.dispatch(new ussdUserUpdated({
		// 	partialussdUser: updateussdUser,
		// 	ussdUser: _ussdUser
		// }));

		// Remove this line
		of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _ussdUser, isEdit: true }));
		// Uncomment this line
		// this.dialogRef.close({ _ussdUser, isEdit: true }
	}

	/**
	 * Create ussdUser
	 *
	 * @param _ussdUser: UssdUserModel
	 */
	createussdUser(_ussdUser: UssdUserModel) {
		this.ussdAppService.createUssdUser(_ussdUser).pipe(
			tap(res => {
				this.dialogRef.close({ _ussdUser, isEdit: false });

			}) ,
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
