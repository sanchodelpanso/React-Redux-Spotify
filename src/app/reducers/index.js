import { combineReducers } from 'redux';
import search from './search.reducer';
import artists from './artists.reducer.js';
import albums from './albums.reducer.js';
import artist from './artist.reducer.js';
import album from './album.reducer.js';

const rootReducer = combineReducers({
    search,
    artists,
    albums,
    artist,
    album
});

export default rootReducer;