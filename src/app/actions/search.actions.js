import * as types from '../action.types';
import { SpotifyApiService } from '../spotify.api.service';

import { Artist } from '../models/artist';
import { Album } from '../models/album';


export function searchChanged( search ) {
    return { type: types.SEARCH_CHANGE, search};
}

export function loadSearchResult( search, type ) {
    return function(dispatch) {
        return SpotifyApiService.search(search, type).then(response => {
            response.json().then(result => {
                result = result[`${type}s`].items;

                if(type == 'artist') {
                    result = result.map(item => new Artist( item ));
                    dispatch(artistsSearchResultSuccess(result));
                } else {
                    result = result.map(item => new Album( item ));
                    dispatch(albumsSearchResultSuccess(result));
                }
            });
        }).catch(error => {
            throw(error);
        });
    };
}

export function artistsSearchResultSuccess( items ) {
    return { type: types.ARTIST_SEARCH_SUCCESS, items };
}

export function albumsSearchResultSuccess( items ) {
    return { type: types.ALBUM_SEARCH_SUCCESS, items };
}
