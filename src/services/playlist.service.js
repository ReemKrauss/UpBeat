import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";

const STORAGE_KEY = 'playlistDB'




export const playlistService = {
    query,
    getById,
    save,
    makeDummy,
    addSong,
    getTags
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
    return [{title:'Rock',color:'#80433b',imgUrl:'https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730'}, {title:'New Releases',color:'#1bd57f',imgUrl:'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112'}, {title:'israeli',color:'#779dc3',imgUrl:'https://mosaic.scdn.co/300/ab67616d00001e0201f29cb95808086322951517ab67616d00001e023dcb38a80ce06d4f188d9868ab67616d00001e0243e92a45bb479211b796bf82ab67616d00001e02508b835b5dd68662ec44646a'}, {title:'Jazz',color:'#8d67ab',imgUrl:'https://i.scdn.co/image/ab67706f00000002d72ef75e14ca6f60ea2364c2'}, {title:'Decades',color:'#e8115b',imgUrl:'https://t.scdn.co/images/b611cf5145764c64b80e91ccd5f357c8'}, {title:'Musical',color:'#eec1c9',imgUrl:'https://mosaic.scdn.co/300/ab67616d00001e02170e79548d280867ef12742bab67616d00001e027546d458746cb21b825055ecab67616d00001e02d72fb5571087bca0a2fed008ab67616d00001e02ddc54feece71dda4290d0579'}]
}



function makeDummy() {
    storageService.saveDummy()
}


