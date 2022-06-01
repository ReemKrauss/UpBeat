import { useEffect, useState } from 'react'
import { PlaylistList } from '../cmps/playlist-list'
import { playlistService } from "../services/playlist.service"
import { useParams } from 'react-router-dom'



export const GenrePage = (props) => {
    const [playlists, setPlaylists] = useState(null) //temporary hard coded values
    const params = useParams()
    const genreName = params.genreTag

    console.log(params.genreTag)

    useEffect(() => {
        loadPlaylists()
    }, [])

    const loadPlaylists = async () => {
        const a = params.genreTag

        const currGenre = await playlistService.query({ tags: a })
        setPlaylists({ currGenre })
    }

    

    return <section className="home main-layout">
        {/* <h1>Good Morning</h1> */}
        {playlists && <div className='playlists-container'>
            <h2>Browse {params.genreTag}</h2>
            <PlaylistList playlists={playlists.currGenre} />
        </div>}
    </section>
}