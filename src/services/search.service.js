import axios from "axios"
import { storageService } from "./async-storage.service"
import { syncStorageService } from "./sync-storage.service"
import { utilService } from "./util.service"



// const API_KEY = 'AIzaSyDCjCb3C7AmF1P3HRbRvinplz_XGb5YHXM' //yotam api
// const API_KEY = 'AIzaSyAgaDXhqHTgc9W3M_8UuXF5xBqz9Vos7OE' //ido api
const API_KEY = 'AIzaSyAgbonpnjurKCZkbWk_ImjPrwZR0yJztME' //ido 2nd api

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key='

export const searchService = {
    search,
}

window.se = searchService

async function search(params) {
    const localSearch = syncStorageService.loadFromStorage(params)
    if(!localSearch){
        try {
            const url = BASE_URL + API_KEY + `&q=${params}&maxResults=5`
            let search = await axios.get(url)
            search = search.data.items
            const ids = search.map((res) => res.id.videoId)
            let durations = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${ids.join(',')}&part=contentDetails&key=AIzaSyDCjCb3C7AmF1P3HRbRvinplz_XGb5YHXM`)
            durations = durations.data.items
            const songs = search.map((res, idx) => ({ id: res.id.videoId, title: res.snippet.title, imgUrl: res.snippet.thumbnails.high.url,
                 duration: utilService.formatISODate(durations[idx].contentDetails.duration) }))
            syncStorageService.saveToStorage(params, songs)
            return songs

        }catch(err){
            console.log(err)
        }
    }
    return localSearch   
}



