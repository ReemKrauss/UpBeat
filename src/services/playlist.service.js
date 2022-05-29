import axios from "axios";
import { storageService } from "./async-storage.service";

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
    const playlists = await storageService.query(STORAGE_KEY, 1200, filterBy)
    return playlists
}

async function getById(playlistId, filterBy) {
    return await storageService.get(STORAGE_KEY, playlistId, filterBy)
}


async function save(playlist) {
    console.log(playlist)
    if (playlist._id) return await storageService.put(STORAGE_KEY, playlist)
    playlist = { ...playlist, tags: [], createdAt: Date.now(), createdBy: { _id: 'u100', fullname: 'UpBeat' }, songs: playlist.songs || [] } //needs user service to know who created, set as upbeat
    return await storageService.post(STORAGE_KEY, playlist)
}

async function addSong(song, playlist) {
    playlist.songs.push({ ...song, addedAt: Date.now(), addedBy: 'Guest' }) //needs user service to know who added, set as guest for now
    return await storageService.put(STORAGE_KEY, playlist)
}



function makeDummy() {
    storageService.saveDummy()
}


