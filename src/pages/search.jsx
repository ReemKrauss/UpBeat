import { searchService } from "../services/search.service"
import { useState, useEffect, useRef } from 'react'
import { SearchBar } from "../cmps/search-bar"
import { SongPreview } from "../cmps/song-preview"
import _ from 'lodash'




export const Search = (props) => {
    const [params, setParams] = useState('')
    const [songs, setSongs] = useState(null)

    useEffect(() => {
        loadSongs()
    }, [params])

    let timeOutId = useRef(null)


    const loadSongs = async () => {
        if (params) {
            if (timeOutId) clearTimeout(timeOutId.current)
            timeOutId.current = setTimeout(async () => {
                const results = await searchService.search(params)
                setSongs(results)
                timeOutId.current = null
            }, 250)

        } //switch to debounce hook
    }

    const onHandleChange = ({ target }) => {
        setParams(target.value)
    }

    console.log('songs', songs)
    return <section className="search">
        <SearchBar params={params} onHandleChange={onHandleChange} />
        {songs && songs.map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} />)}
    </section>
}