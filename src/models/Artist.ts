import { ArtistImage } from "./ArtistImage";

export class Artist {
    constructor(
        public id: string,
        public name: string,
        public images: ArtistImage[]
    ) { }
}