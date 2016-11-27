import * as types from '../action.types';
import initialState from '../initial.state';

export default function (state = initialState.albums, action) {
    switch (action.type) {
        case types.ALBUM_SEARCH_SUCCESS:
            return action.items;

        default:
            return state;
    }
}
