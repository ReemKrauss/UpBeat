import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { playlistService } from '../services/playlist.service'
import { SongPreview } from '../cmps/song-preview'


export const PlaylistDetails = (props) => {
    const params = useParams()
    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        loadPlaylist()
    }, [params.id])

    const loadPlaylist = async () => {
        const playlist = await playlistService.getById(params.playlistId)
        setPlaylist(playlist)
    }

    if(!playlist) return <h2>loading...</h2>

    return <section className="playlist-details">
        {playlist.songs.map((song,idx) => <SongPreview key={song.id} song={({...song, idx:idx + 1})}/>)}

    </section>
}