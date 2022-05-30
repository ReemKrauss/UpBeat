import { useEffect, useState } from 'react'
import { PlaylistList } from '../cmps/playlist-list'
import { playlistService } from "../services/playlist.service"


export const Home = (props) => {
    const [playlists, setPlaylists] = useState(null) //temporary hard coded values

    useEffect(() => {
        loadPlaylists()
    }, [])

    const loadPlaylists = async () => {
        const rock = await playlistService.query({ tags: 'Rock' })
        const jazz = await playlistService.query({ tags: 'Jazz' })
        const musical = await playlistService.query({ tags: 'Musical' })
        const newReleases = await playlistService.query({ tags: 'New Releases' })
        const israeli = await playlistService.query({ tags: 'Israeli' })
        const decades = await playlistService.query({ tags: 'decades' })
        setPlaylists({ rock, jazz, musical, newReleases, israeli, decades })
    }

    

    return <section className="home main-layout">
        {/* <h1>Good Morning</h1> */}
        {playlists && <div className='playlists-container'>
            <h2>New Releases</h2>
            <PlaylistList playlists={playlists.newReleases} />
        </div>}
        {playlists && <div className='playlists-container'>
            <h2>Rock</h2>
            <PlaylistList playlists={playlists.rock} />
        </div>}
        {playlists && <div className='playlists-container'>
            <h2>Jazz</h2>
            <PlaylistList playlists={playlists.jazz} />
        </div>}
        {playlists && <div className='playlists-container'>
            <h2>Israeli</h2>
            <PlaylistList playlists={playlists.israeli} />
        </div>}
        {playlists && <div className='playlists-container'>
            <h2>Decades</h2>
            <PlaylistList playlists={playlists.decades} />
        </div>}
        {playlists && <div className='playlists-container'>
            <h2>Musicals</h2>
            <PlaylistList playlists={playlists.musical} />
        </div>}
    </section>
}