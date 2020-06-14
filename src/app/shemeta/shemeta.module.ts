import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShemetaRoutingModule } from './shemeta-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShemetaComponent } from './shemeta.component';
import { BuilderComponent } from './ussd/builder/builder.component';
import { SimulatorComponent } from './ussd/simulator/simulator.component';
import { UserDataComponent } from './ussd/user-data/user-data.component';
import { UssdConfigComponent } from './ussd/ussd-config/ussd-config.component';

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
  declarations: [DashboardComponent, ShemetaComponent, BuilderComponent, SimulatorComponent, UserDataComponent, UssdConfigComponent],
  imports: [
    CommonModule,
	 RouterModule.forChild(routes)
  ]
})
export class ShemetaModule { }
