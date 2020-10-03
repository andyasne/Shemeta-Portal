import { reducer } from './testngrxts';
import * as fromTestngrxts from './testngrxts';
import { Load, LoadFail, LoadSuccess } from '../actions/testngrxt';
import { Testngrxt, generateMockTestngrxt } from '../models/testngrxt';

describe('TestngrxtsReducer', () => {
    const testngrxt1 = generateMockTestngrxt();
    const testngrxt2 = { ...testngrxt1, id: '222' };
    const testngrxt3 = { ...testngrxt1, id: '333' };
    const initialState: fromTestngrxts.State = {
        ids: [],
        entities: {},
        loading: false,
    };

    describe('undefined action', () => {
        it('should return the default state', () => {
            const result = reducer(undefined, {} as any);

            expect(result).toEqual(initialState);
        });
    });

    describe('LOAD', () => {
        const expectedResult = {
            ...initialState,
            loading: true,
        };

        it('should change loading to true', () => {
            const action = new Load();

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_SUCCESS', () => {
        const expectedResult = {
            ids: [testngrxt2.id, testngrxt3.id],
            entities: {
                [testngrxt2.id]: testngrxt2,
                [testngrxt3.id]: testngrxt3
            },
            loading: false
        };

        it('should load testngrxts', () => {
            const action = new LoadSuccess([testngrxt2, testngrxt3]);

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_FAIL', () => {
        const expectedResult = {
            ids: [],
            entities: {},
            loading: false
        };

        it('return empty array of testngrxts when load fail', () => {
            const action = new LoadFail('Error Message');

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('selectors', () => {
        const expectedResult = initialState;

        it('should return correct selector', () => {
            const loading = expectedResult.loading;

            expect(fromTestngrxts.getLoading(expectedResult)).toEqual(loading);
        });
    });
});
