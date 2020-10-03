import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

// ngrx
import { Store } from '@ngrx/store';
import * as fromTestngrxts from '..//testngrxts/reducers';
import * as testngrxt from '..//testngrxts/actions/testngrxt';
import { Testngrxt } from '..//testngrxts/models/testngrxt';

@Component({
  selector: 'app-testngrxmod',
  styleUrls: ['./testngrxmod.component.scss'],
  templateUrl: './testngrxmod.component.html'
})
export class TestngrxmodComponent implements OnInit {
  public testngrxts$: Observable<Testngrxt[]>;

  constructor(
    private store: Store<fromTestngrxts.State>
  ) {
    this.testngrxts$ = store.select(fromTestngrxts.getAllTestngrxts);
  }

  public ngOnInit(): void {
    this.store.dispatch(new testngrxt.Load());
  }
}
