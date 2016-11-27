import * as types from '../action.types';
import initialState from '../initial.state';

export default function (state = initialState.artist, action) {
    switch (action.type) {
        case types.ARTIST_LOAD_SUCCESS:
            return action.artist;

        default:
            return state;
    }
}
