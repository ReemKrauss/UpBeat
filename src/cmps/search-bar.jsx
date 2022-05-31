import { searchService } from "../services/search.service"
import { useState, useEffect, useRef } from 'react'
import { SongPreview } from "../cmps/song-preview"
import { BrowseDisplay } from "./browse-display"




export const SearchBar = ({onAddFromPlaylist}) => {
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
            }, 300)

        } //switch to debounce hook
    }

    const onHandleChange = ({ target }) => {
        setParams(target.value)
    }

    return <section className="search-bar">
        <input type="text" value={params} placeholder="Search for songs" onChange={onHandleChange} />
        {songs && songs.map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} onAddFromPlaylist = {onAddFromPlaylist || ''} />)}

    </section>
}