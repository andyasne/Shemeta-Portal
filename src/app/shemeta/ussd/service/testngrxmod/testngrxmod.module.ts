import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TestngrxmodComponent } from './testngrxmod.component';

// lazy loading
import { RouterModule } from '@angular/router';
import { routes } from './testngrxmod.routes';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '..//testngrxts/reducers';
import { TestngrxtEffects } from '..//testngrxts/effects/testngrxt';
import { TestngrxtService } from '..//testngrxts/services/testngrxt';

@NgModule({
  declarations: [
    TestngrxmodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('testngrxts', reducers),
    EffectsModule.forFeature([TestngrxtEffects])
  ],
  providers: [
    TestngrxtService
  ]
})
export class TestngrxmodModule {
}
