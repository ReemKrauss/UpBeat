import axios from "axios";
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'playlistDB'

export const playlistService = {
    query,
    getById,
    getMiniPlaylist,
    makeDummy,

}

window.ps = playlistService

async function query(filterBy) {
    const playlists = await storageService.query(STORAGE_KEY)
    return playlists
}

async function getById(playlistId, filterBy) {
    console.log(filterBy)
    return await storageService.get(STORAGE_KEY, playlistId, filterBy)

}

async function getMiniPlaylist(playlistId, songIdx) {
    const playlist = await getById(playlistId)
    return { songs: playlist.songs, currSongIdx: songIdx, playlistName: playlist.name, playlistId: playlist._id }
}

function makeDummy() {
    storageService.saveDummy()
}


