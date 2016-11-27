import * as types from '../action.types';
import { browserHistory } from 'react-router';

import { SpotifyApiService } from '../spotify.api.service';

import { Artist } from '../models/artist';

export function loadArtist( id ) {
    return function(dispatch) {
        return SpotifyApiService.getArtist( id ).then(response => {
            if(response.error && response.error.status == 400) return browserHistory.push('/');

            let artist = new Artist(response);

            SpotifyApiService.getAlbums( id ).then( response => {
                artist.setAlbums( response.items ); 
                dispatch(loadArtistSuccess( artist ));
            });
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadArtistSuccess( artist ) {
    return { type: types.ARTIST_LOAD_SUCCESS, artist };
}