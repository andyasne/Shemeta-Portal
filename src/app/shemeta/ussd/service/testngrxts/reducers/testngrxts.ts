import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Testngrxt } from '../models/testngrxt';
import * as testngrxt from '../actions/testngrxt';

export interface State extends EntityState<Testngrxt> {
    loading: boolean;
}

export const adapter: EntityAdapter<Testngrxt> = createEntityAdapter<Testngrxt>({
    selectId: (obj: Testngrxt) => obj.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    loading: false,
});

export function reducer(
    state = initialState,
    action: testngrxt.Actions
): State {
    switch (action.type) {
        case testngrxt.LOAD: {
            return {
                ...state,
                loading: true,
            };
        }

        case testngrxt.LOAD_SUCCESS: {
            return {
                ...adapter.addAll(action.payload, state),
                loading: false,
            };
        }

        case testngrxt.LOAD_FAIL: {
            return {
                ...adapter.removeAll(state),
                loading: false,
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
