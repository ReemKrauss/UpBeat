import axios from "axios";
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'playlistDB'

export const playlistService = {
    query,
    makeDummy
}

window.ps = playlistService

async function query(filterBy){
    const playlists = await storageService.query(STORAGE_KEY)
    return playlists
}

function makeDummy(){
    storageService.saveDummy()
}

