import {Basic} from './basic';
import {Album} from './album';

export class Artist extends Basic {

    constructor( data = { id: null, name: null, type: null, images: null, albums: [] } ) {
        super( data );
    }

    setAlbums( data ) {
        this.albums = data.map(item => new Album( item ));
    }
}
