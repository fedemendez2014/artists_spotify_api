import axios from 'axios';
import querystring from 'querystring';
import { Constants } from '../Constants';

/**
 * @param artistName 
 */
export const getArtists = async (artistName: String): Promise<any[]> => {
    let artists: any[] = [];
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getCurrentSession()?.access_token}`
            }
        };
        const resp = await axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, config);
        artists = resp.data.artists.items;
    } catch (err: any) {
        if (err.response?.status === 401) {
            return getArtists(artistName);
        }
        throw err;
    }
    return artists;
};

/**
 * @param artistId 
 */
export const getArtistAlbums = async (artistId: String): Promise<any[]> => {
    let albums: any[] = [];
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getCurrentSession()?.access_token}`
            }
        };
        const resp = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, config);
        albums = resp.data.items;
    } catch (err: any) {
        if (err.response?.status === 401) {
            return getArtistAlbums(artistId);
        }
        throw err;
    }
    return albums;
}

/**
 * @param albumId 
 */
export const getAllAlbums = async (albumsId: String): Promise<any[]> => {
    let albums: any[] = [];
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getCurrentSession()?.access_token}`
            }
        };
        const resp = await axios.get(`https://api.spotify.com/v1/albums?ids=${albumsId}`, config);
        albums = resp.data.albums;
    } catch (err: any) {
        if (err.response?.status === 401) {
            return getAllAlbums(albumsId);
        }
        throw err;
    }
    return albums;
}

/**
 * 
 */
export const getToken = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': 'Basic ' + Buffer.from(Constants.SPOTIFY_API_CLIENT_ID + ':' + Constants.SPOTIFY_API_CLIENT_SECRET, 'utf-8').toString('base64')
            }
        };
        const data = querystring.stringify({
            grant_type: 'client_credentials'
        });
        const resp = await axios.post('https://accounts.spotify.com/api/token', data, config);
        setCurrentSession(resp.data);
    } catch (err) {
        throw err;
    }
}

/**
 * 
 */
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./spotifySession');

const setCurrentSession = (session: any) => {
    localStorage.setItem(Constants.SPOTIFY_SESSION_NAME_FILE, JSON.stringify(session));
}

const getCurrentSession = () => {
    let session = null;
    try {
        session = localStorage.getItem(Constants.SPOTIFY_SESSION_NAME_FILE);
    } catch (error) {
        session = null;
    }
    if (session === null) {
        getToken();
        session = localStorage.getItem(Constants.SPOTIFY_SESSION_NAME_FILE);
    }
    return JSON.parse(session);
}
