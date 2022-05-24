import axios from "axios";
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'playlistDB'

export const playlistService = {
    query,
    getById,
    makeDummy
}

window.ps = playlistService

async function query(filterBy){
    const playlists = await storageService.query(STORAGE_KEY)
    return playlists
}

async function getById(playlistId){
    return await storageService.get(STORAGE_KEY, playlistId)
    
}

function makeDummy(){
    storageService.saveDummy()
}


