import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTestngrxts from './testngrxts';
import * as fromRoot from '../../index';

export interface TestngrxtsState {
    testngrxts: fromTestngrxts.State;
}

export interface State extends fromRoot.State {
    'testngrxts': TestngrxtsState;
}

export const reducers = {
    testngrxts: fromTestngrxts.reducer,
};

export const getTestngrxtsState = createFeatureSelector<TestngrxtsState>('testngrxts');

export const getTestngrxtEntitiesState = createSelector(
    getTestngrxtsState,
    (state) => state.testngrxts
);

export const {
    selectIds: getTestngrxtIds,
    selectEntities: getTestngrxtEntities,
    selectAll: getAllTestngrxts,
    selectTotal: getTotalTestngrxts,
  } = fromTestngrxts.adapter.getSelectors(getTestngrxtEntitiesState);

export const getLoading = createSelector(
    getTestngrxtEntitiesState,
    fromTestngrxts.getLoading
);
