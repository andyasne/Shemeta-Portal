import { Action } from '@ngrx/store';
import { Testngrxt } from '../models/testngrxt';
// tslint:disable:max-classes-per-file

export const LOAD = '[Testngrxt] Load';
export const LOAD_SUCCESS = '[Testngrxt] Load Success';
export const LOAD_FAIL = '[Testngrxt] Load Fail';

export class Load implements Action {
    public readonly type = LOAD;
}

export class LoadSuccess implements Action {
    public readonly type = LOAD_SUCCESS;

    constructor(public payload: Testngrxt[]) { }
}

export class LoadFail implements Action {
    public readonly type = LOAD_FAIL;

    constructor(public payload: any) { }
}

export type Actions = Load
    | LoadSuccess
    | LoadFail;
