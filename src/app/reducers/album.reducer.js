import * as types from '../action.types';
import initialState from '../initial.state';

export default function (state = initialState.album, action) {
    switch (action.type) {
        case types.ALBUM_LOAD_SUCCESS:
            return action.album;

        default:
            return state;
    }
}
