import { searchService } from "../services/search.service"
import { useState, useEffect } from 'react'
import { SearchBar } from "../cmps/search-bar"
import { SongPreview } from "../cmps/song-preview"
import _ from 'lodash'



export const Search = (props) => {
    const [params, setParams] = useState('')
    const [songs, setSongs] = useState(null)

    useEffect(() => {
        loadSongs()
    }, [params])

    const loadSongs = async() => {
        if (params) {
            //need to add debounce
            const results = await searchService.search(params)
            setSongs(results)
        }
    }

    const onHandleChange = ({ target }) => {
        setParams(target.value)
    }

    console.log('songs',songs)
    return <section className="search">
        <SearchBar params={params} onHandleChange={onHandleChange} />
        {songs && songs.map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} />)}
    </section>
}