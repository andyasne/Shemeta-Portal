import { PortletModule } from './../views/partials/content/general/portlet/portlet.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ShemetaRoutingModule } from './shemeta-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShemetaComponent } from './shemeta.component';
import { BuilderComponent } from './ussd/builder/builder.component';
import { SimulatorComponent } from './ussd/simulator/simulator.component';
import { UserDataComponent } from './ussd/user-data/user-data.component';
import { UssdConfigComponent } from './ussd/ussd-config/ussd-config.component';
import { USSDMenuDirective } from './directives/ussd-menu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AlertComponent } from '../views/partials/content/crud/alert/alert.component';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbProgressbarModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/menu/menu.component';
import { NgbdModalContentComponent } from "./components/menu/NgbdModalContentComponent";
import { AddPhoneNumberComponent } from './components/add-phone-number/add-phone-number.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';

const routes: Routes = [
	{
		path: '',
		component: ShemetaComponent,

		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				component: DashboardComponent
			},
			{
				path: 'builder',
				component: BuilderComponent
			}
			,
			{
				path: 'simulator',
				component: SimulatorComponent
			}
			,
			{
				path: 'user-data',
				component: UserDataComponent
			}
			,
			{
				path: 'ussd-config',
				component: UssdConfigComponent
			}


		]
	}
];

@NgModule({
  declarations: [DashboardComponent,MenuComponent, NgbdModalContentComponent,ShemetaComponent, BuilderComponent, SimulatorComponent, UserDataComponent, UssdConfigComponent, USSDMenuDirective, AddPhoneNumberComponent, AddMenuComponent],
  imports: [
	CommonModule,FormsModule,HttpClientModule,
	MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatRadioModule,
		PortletModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		NgbProgressbarModule,MatDialogModule,
	 RouterModule.forChild(routes)
  ],	entryComponents: [
	NgbdModalContentComponent,
	AddPhoneNumberComponent
]
})
export class ShemetaModule { }
