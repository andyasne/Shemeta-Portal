import { UssdAppService } from './../../services/ussdApp.service';
import { UssdUserModel } from './../../models/ussdUser.model';
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
  selector: 'kt-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AddPhoneNumberComponent implements OnInit, OnDestroy {
	// Public properties
	ussdUser: UssdUserModel;
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
	constructor(public dialogRef: MatDialogRef<AddPhoneNumberComponent>,
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

		this.ussdUser = new UssdUserModel();
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
			phoneNumber: [this.ussdUser.phoneNumber, Validators.required],
			fullName: [this.ussdUser.fullName, Validators.required],
			defaultLanguage: [this.ussdUser.defaultLanguage, Validators.required],
			registrationDate: [this.typesUtilsService.getDateFromString(this.ussdUser.registrationDate)],
			isActive: [this.ussdUser.isActive, Validators.compose([Validators.required])]
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
		_ussdUser.id = this.ussdUser.id;
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
