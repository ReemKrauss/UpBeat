import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";

const STORAGE_KEY = 'playlistDB'




export const playlistService = {
    query,
    getById,
    save,
    makeDummy,
    addSong
}

window.ps = playlistService

async function query(filterBy = null) {
    // const playlists = await storageService.query(STORAGE_KEY, 50, filterBy)
    // return playlists
    return httpService.get(`playlist/?tags=${filterBy.tags}`)
}

async function getById(playlistId, filterBy) {
    // return await storageService.get(STORAGE_KEY, playlistId, filterBy)
    return httpService.get(`playlist/${playlistId}`)
}


async function save(playlist) {
    console.log(playlist)
    if (playlist._id) return await httpService.put(`playlist/${playlist._id}`, playlist)
    playlist = { ...playlist, tags: [], createdBy: { _id: 'u100', fullname: 'UpBeat' }, songs: playlist.songs || [] } //when swapping to frontend only, add "createdAt: Date.now()"
    return await httpService.post(`playlist/`, playlist)
}

async function addSong(song, playlist) {
    playlist.songs.push({ ...song, addedAt: Date.now(), addedBy: 'Guest' }) //needs user service to know who added, set as guest for now
    return await httpService.put(`playlist/${playlist._id}`, playlist)
}

async function getTags() {
    return ['Rock', 'New Releases', 'israeli', 'Jazz', 'Decades', 'Musical']
}



function makeDummy() {
    storageService.saveDummy()
}


