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
import { MenuElementModel } from '../../models/menuElement.model';
import { _displayTexts } from '../../models/_displayTexts';
import { _menuItem } from '../../models/_menuItem';

// Services and Models
@Component({
	selector: 'kt-add-menu',
	templateUrl: './add-menu.component.html',
	styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
	ussdMenu: MenuElementModel;
	ussdMenuForm: FormGroup;
	hasFormErrors = false;
	viewLoading = false;
	parentCode=''
	// Private properties
	private componentSubscriptions: Subscription;
	code: any;

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
		@Inject(MAT_DIALOG_DATA) public data: any, private ussdAppService: UssdAppService,
		private fb: FormBuilder,
		private store: Store<AppState>,
		private typesUtilsService: TypesUtilsService) {
			this.parentCode=data.parentCode;
			this.code = data.code
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.ussdMenu = new MenuElementModel();
		this.ussdMenu.menuItem.parentCode= Number.parseInt( this.parentCode);
		this.ussdMenu.menuItem.code= Number.parseInt( this.code);
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
		this.ussdMenuForm = this.fb.group({
			code: [this.ussdMenu.menuItem.code, Validators.required],
			parentCode: [this.ussdMenu.menuItem.parentCode,{ value: this.parentCode, disabled: true }],
			displayText: [this.ussdMenu.displayTexts.amharic, Validators.required],
			selector: [this.ussdMenu.menuItem.selector, Validators.required],
			order: [this.ussdMenu.menuItem.order, Validators.required],
			menuType: [this.ussdMenu.menuItem.menuType],
			questionDataType: [this.ussdMenu.menuItem.questionDataType],
			exit: [this.ussdMenu.menuItem.exit],
			readOnly: [this.ussdMenu.menuItem.readOnly,{ value: false}],
			loadUserData: [this.ussdMenu.menuItem.loadUserData]
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		return 'New User';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.ussdMenuForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared ussdUser
	 */
	prepareussdMenu(): MenuElementModel {
		const controls = this.ussdMenuForm.controls;
		const _ussdMenu = new MenuElementModel();
		_ussdMenu.menuItem.code = controls.code.value;
		_ussdMenu.displayTexts.amharic = controls.displayText.value;
		_ussdMenu.displayTexts.english = controls.displayText.value;
		_ussdMenu.displayTexts.afanOromo = controls.displayText.value;
		_ussdMenu.displayTexts.tigrigna = controls.displayText.value;
		_ussdMenu.menuItem.exit =   Boolean(JSON.parse(controls.exit.value));
		_ussdMenu.menuItem.loadUserData = Boolean(JSON.parse(controls.loadUserData.value));
		_ussdMenu.menuItem.readOnly = Boolean(JSON.parse(controls.readOnly.value));
		_ussdMenu.menuItem.menuType = controls.menuType.value;
		_ussdMenu.menuItem.order = controls.order.value;
		_ussdMenu.menuItem.questionDataType = controls.questionDataType.value;
		_ussdMenu.menuItem.selector = controls.selector.value;
		_ussdMenu.menuItem.parentCode = controls.parentCode.value;
		return _ussdMenu;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.ussdMenuForm.controls;
		/** check form */
		if (this.ussdMenuForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}


		this.createUssdMenu(this.prepareussdMenu());

	}


	createUssdMenu(menuElementModel: MenuElementModel) {
		this.ussdAppService.saveMenu(menuElementModel).pipe(
			tap(res => {
			//	this.dialogRef.close();

			}),
			catchError(err => of(
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
