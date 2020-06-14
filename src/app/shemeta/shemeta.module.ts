import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShemetaRoutingModule } from './shemeta-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShemetaComponent } from './shemeta.component';
import { BuilderComponent } from './ussd/builder/builder/builder.component';
import { SimulatorComponent } from './ussd/builder/simulator/simulator.component';
import { UserDataComponent } from './ussd/user-data/user-data.component';

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

		]
	}
];

@NgModule({
  declarations: [DashboardComponent, ShemetaComponent, BuilderComponent, SimulatorComponent, UserDataComponent],
  imports: [
    CommonModule,
		 RouterModule.forChild(routes)

    // ShemetaRoutingModule
  ]
})
export class ShemetaModule { }
