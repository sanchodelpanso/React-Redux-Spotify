import {Basic} from './basic';

export class Album extends Basic {
    
    constructor( data = { id: null, name: null, type: null, images: null, tracks: { items: [] } } ) {
        super( data );
    }
}
