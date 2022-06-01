import { searchService } from "../services/search.service"
import { useState, useEffect, useRef } from 'react'
import { SongPreview } from "../cmps/song-preview"

import tailSpin from "../assets/img/tail-spin.svg"





export const SearchBar = ({ onAddFromPlaylist, children }) => {
    const [params, setParams] = useState('')
    const [songs, setSongs] = useState(null)
    let topSong
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
            }, 400)

        } //switch to debounce hook
    }

    const onHandleChange = ({ target }) => {
        setParams(target.value)
    }
    if (songs) topSong = songs[0]
    return <section className="search-bar">
        <input type="text" value={params} placeholder="Search for songs" onChange={onHandleChange} />
        {!songs && params && <img className="tailspin" src={tailSpin} alt='cant load' />}
        {songs && children && <div className="top-result">
            <h2>Top result</h2>
            <SongPreview song={({ ...topSong, idx: 0 })} onAddFromPlaylist={onAddFromPlaylist || ''} />
        </div>}
        <div className="songs">
        {songs && children}
        {songs && songs.map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} onAddFromPlaylist={onAddFromPlaylist || ''} />)}
        </div>

    </section>
}