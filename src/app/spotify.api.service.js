export class SpotifyApiService {
    static search( search, type ) {
        if(SpotifyApiService.validTypes.indexOf( type ) < 0) throw new Error( 'Invalid type' );

        return fetch( `https://api.spotify.com/v1/search?query=*${search}*&offset=0&limit=20&market=US&type=${type}` );
    }

    static getArtist( id ) {
        return fetch(`https://api.spotify.com/v1/artists/${id}`).then(response => response.json());
    }

    static getAlbums( id ) {
        return fetch(`https://api.spotify.com/v1/artists/${id}/albums?album_type=album&market=US`).then(response => response.json());
    }

    static getAlbum( id ) {
        return fetch(`https://api.spotify.com/v1/albums/${id}`).then(response => response.json());
    }
}

SpotifyApiService.validTypes = ["artist", "album"];