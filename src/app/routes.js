import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import SearchComponent from './components/search.component';
import ArtistComponent from './components/artist.component';
import AlbumComponent from './components/album.component';

export default (
    <Router>
        <Redirect from="/" to="/search-type/artist" />
        <Route path="/search-type/:type" component={SearchComponent} />
        <Route path="/artist/:id" component={ArtistComponent} />
        <Route path="/album/:id" component={AlbumComponent} />
    </Router>
);
