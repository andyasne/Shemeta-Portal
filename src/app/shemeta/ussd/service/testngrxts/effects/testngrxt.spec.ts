import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { TestngrxtEffects, LOAD_SCHEDULER, LOAD_DEBOUNCE } from './testngrxt';
import { TestngrxtService } from '../services/testngrxt';
import { Observable } from 'rxjs/Observable';
import { Load, LoadSuccess, LoadFail } from '../actions/testngrxt';
import { Testngrxt, generateMockTestngrxt } from '../models/testngrxt';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('TestngrxtEffects', () => {
    let effects: TestngrxtEffects;
    let testngrxtService: any;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TestngrxtEffects,
                {
                    provide: TestngrxtService,
                    useValue: jasmine.createSpyObj('testngrxtService', ['load']),
                },
                { provide: Actions, useFactory: getActions },
                { provide: LOAD_SCHEDULER, useFactory: getTestScheduler },
                { provide: LOAD_DEBOUNCE, useValue: 30 },
            ],
        });

        effects = TestBed.get(TestngrxtEffects);
        testngrxtService = TestBed.get(TestngrxtService);
        actions$ = TestBed.get(Actions);
    });

    describe('load$', () => {
        it('should load successful', () => {
            const testngrxt1 = generateMockTestngrxt();
            const testngrxt2 = { ...testngrxt1, id: '222' };
            const testngrxts = [testngrxt2, testngrxt2];

            const action = new Load();
            const completion = new LoadSuccess(testngrxts);

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: testngrxts });
            const expected = cold('-----b', { b: completion });
            testngrxtService.load = () => response;
            expect(effects.load$).toBeObservable(expected);
        });

        it('should load fail', () => {
            const action = new Load();
            const completion = new LoadFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('-----b', { b: completion });
            testngrxtService.load = () => response;

            expect(effects.load$).toBeObservable(expected);
        });
    });
});
