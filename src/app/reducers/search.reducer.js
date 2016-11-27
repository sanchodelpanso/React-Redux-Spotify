import * as types from '../action.types';
import initialState from '../initial.state';

export default function (state = initialState.search, action) {
    switch (action.type) {
        case types.SEARCH_CHANGE:
            return action.search;

        default:
            return state;
    }
}
