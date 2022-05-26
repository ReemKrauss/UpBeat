import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { playlistService } from '../services/playlist.service'
import { SongPreview } from '../cmps/song-preview'
import { PlayListFilter } from '../cmps/playlist-filter'


export const PlaylistDetails = (props) => {
    const params = useParams()
    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        loadPlaylist()
    }, [params.id])

    const loadPlaylist = async (filterBy) => {
        const playlist = await playlistService.getById(params.playlistId, filterBy)
        setPlaylist(playlist)
    }

    const onChangeFilter = useCallback(async (filterBy) => {
        loadPlaylist(filterBy)
    }, [])

    if (!playlist) return <h2>loading...</h2>

    return <section className="playlist-details">
        <div className="playlist-header flex">
            <img src={playlist.imgUrl} />
            <div className="flex-col">
                <h5>playlist</h5>
                <h1>{playlist.name}</h1>
                <h5>{playlist.createdBy.fullname} • {playlist.songs.length} songs</h5>
            </div>
        </div>
        <PlayListFilter onChangeFilter={onChangeFilter} />
        {playlist.songs.map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} playlistId={playlist._id} />)}

    </section>
}