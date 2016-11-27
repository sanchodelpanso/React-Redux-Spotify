export class Basic {

    constructor( data = { id: null, name: null, type: null, images: null } ) {
        Object.assign(this, data);

        this.images = Basic.setImages( this.images );
    }
    
    static setImages( images ) {
        let imagesUrl = {large: null, medium: null, small: null};

        if(!images || !images.length)
            return imagesUrl;

        let [small, medium, large] = images;


        large = large || (medium = medium || small);
        [imagesUrl.large, imagesUrl.medium, imagesUrl.small] = [small.url, medium.url, large.url];

        return imagesUrl;
    }
}
