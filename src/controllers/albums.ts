import { RequestHandler } from 'express';
import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { getArtists, getArtistAlbums, getAllAlbums } from '../services/Spotify';

/**
 * Dado un nombre de un artista devuelve los albums relacionados 
 */
export const getAlbums: RequestHandler<{ artistName: string }> = async (req, res, next) => {
    try {
        const { artistName } = req.params;

        // Obtengo los artistas que coinciden con el nombre dado
        const artists = await getArtists(artistName);
        if (artists.length === 0) {
            throw new Error('No se encontró ningun artista con el nombre indicado');
        }
        const artist = Artist.createFromObject(artists[0]);

        // Me quedo con el primer artista de la lista y busco los albums relacionados al mismo
        let albums = await getArtistAlbums(artist.id);
        let albumsIds: any[] = [];
        for (let item of albums) {
            albumsIds.push(item.id);
        }

        // Como el listado anterior no devuelve la popularidad, junto los ids y hago una nueva busqueda 
        // al endpoint de albums
        albums = await getAllAlbums(albumsIds.toString());
        let albumsResult: Album[] = [];
        for (let item of albums) {
            albumsResult.push(Album.createFromArray(item));
        }

        // Ordeno popularidad de forma desc
        albumsResult.sort((a, b) => {
            if (a.popularity > b.popularity) {
                return -1;
            }
            if (a.popularity < b.popularity) {
                return 1;
            }
            return 0;
        });

        res.status(200).json({
            albums: albumsResult,
            artist: artist
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }
};
