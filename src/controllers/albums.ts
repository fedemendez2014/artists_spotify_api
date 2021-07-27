import { RequestHandler } from 'express';
import { Album } from '../models/Album';
import { Artist } from '../models/Artist';

const artists: Artist[] = [
    new Artist(Math.random().toString(), 'Wanda Jackson', []),
    new Artist(Math.random().toString(), 'Charlie Te Marama', [])
];

const albums: Album[] = [
    new Album('1', artists[0], 'album1', 10, new Date('2021-05-28'), []),
    new Album('2', artists[1], 'album2', 15, new Date('2021-03-15'), [])
];

/**
 * Dado un nombre de un artista devuelve los albums relacionados 
 */
export const getAlbums: RequestHandler<{ artistName: string }> = (req, res, next) => {
    const artistName = req.params.artistName;
    const index = artists.findIndex(item => item.name === artistName);
    if (index < 0) {
        throw new Error('No se encontró ningun artista con el nombre indicado');
    }
    const artist = artists[index];
    let _albums: Album[] = [];
    albums.forEach(item => {
        if (item.artist === artist) {
            _albums.push(item);
        }
    });
    res.status(200).json({ albums: _albums });
};