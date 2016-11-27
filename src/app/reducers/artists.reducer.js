import * as types from '../action.types';
import initialState from '../initial.state';

export default function (state = initialState.artists, action) {
    switch (action.type) {
        case types.ARTIST_SEARCH_SUCCESS:
            return action.items;

        default:
            return state;
    }
}
