import axios from "axios";
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'playlistDB'

export const playlistService = {
    query,
    getById,
    getMiniPlaylist,
    save,
    makeDummy,

}

window.ps = playlistService

async function query(filterBy) {
    const playlists = await storageService.query(STORAGE_KEY)
    return playlists
}

async function getById(playlistId, filterBy) {
    return await storageService.get(STORAGE_KEY, playlistId, filterBy)
}

async function getMiniPlaylist(playlistId, songIdx) {
    const playlist = await getById(playlistId)
    return { songs: playlist.songs, currSongIdx: songIdx, playlistName: playlist.name, playlistId: playlist._id }
}

async function save(playlist) {
    console.log(playlist)
    if (playlist._id) return await storageService.put(STORAGE_KEY, playlist)
    playlist = { ...playlist, tags: [], createdAt: Date.now(),createdBy: {_id: 'u100', fullname: 'UpBeat'}, songs:[]}
    return await storageService.post(STORAGE_KEY, playlist)
}

function makeDummy() {
    storageService.saveDummy()
}


