import { useEffect, useState } from 'react'
import { PlaylistList } from '../cmps/playlist-list'
import { playlistService } from "../services/playlist.service"


export const Home = (props) => {
    const [playlists, setPlaylists] = useState(null)

    useEffect(() => {
        loadPlaylists()
    }, [])

    const loadPlaylists = async () => {
        const playlists = await playlistService.query()
        setPlaylists(playlists)
    }

    return <section className="search">
        <h1>Good Morning</h1>
        {playlists && <PlaylistList playlists={playlists} />}
    </section>
}