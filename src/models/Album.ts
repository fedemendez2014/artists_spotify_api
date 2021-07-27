import { AlbumImage } from "./AlbumImage";
import { Artist } from "./Artist";

export class Album {
    constructor(
        public id: String,
        public artist: Artist,
        public name: String,
        public popularity: Number,
        public releaseDate: Date,
        public images: AlbumImage[]
    ) { }
}