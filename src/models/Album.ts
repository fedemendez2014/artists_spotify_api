import { AlbumImage } from "./AlbumImage";

export class Album {
    constructor(
        public id: String,
        public name: String,
        public popularity: Number,
        public releaseDate: Date,
        public images: AlbumImage[]
    ) { }

    static createFromArray = (album: any) => {
        let images: AlbumImage[] = [];
        if (album.images.length > 0) {
            album.images.forEach((album: any) => {
                images.push(new AlbumImage(album.url));
            });
        }
        return new Album(
            album.id,
            album.name,
            album.popularity ? album.popularity : 1,
            new Date(album.release_date),
            images
        );
    }
}