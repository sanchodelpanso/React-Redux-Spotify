import * as types from '../action.types';
import { browserHistory } from 'react-router';

import { SpotifyApiService } from '../spotify.api.service';

import { Album } from '../models/album';

export function loadAlbum( id ) {
    return function(dispatch) {
        return SpotifyApiService.getAlbum( id ).then(response => {
            if(response.error && response.error.status == 400) return browserHistory.push('/');

            dispatch(loadAlbumSuccess( new Album(response) ));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadAlbumSuccess( album ) {
    return { type: types.ALBUM_LOAD_SUCCESS, album };
}