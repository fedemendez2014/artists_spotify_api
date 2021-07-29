import { ArtistImage } from "./ArtistImage";

export class Artist {
    constructor(
        public id: string,
        public name: string,
        public images: ArtistImage[]
    ) { }

    static createFromObject(artist: any) {
        let images: ArtistImage[] = [];
        if (artist.images.length > 0) {
            artist.images.forEach((item: any) => {
                images.push(new ArtistImage(item.url));
            });
        }
        return new Artist(
            artist.id,
            artist.name,
            images
        );
    }
}