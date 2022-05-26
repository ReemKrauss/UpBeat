import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { playlistService } from '../services/playlist.service'
import { SongPreview } from '../cmps/song-preview'
import { PlayListFilter } from '../cmps/playlist-filter'
import { useHistory } from 'react-router-dom'
import { DecimationAlgorithm } from 'chart.js'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { HiOutlinePencil } from 'react-icons/hi'


export const PlaylistDetails = (props) => {
    const params = useParams()
    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        loadPlaylist()
    }, [params.playlistId])

    const loadPlaylist = async (filterBy) => {
        const playlist = await playlistService.getById(params.playlistId, filterBy)
        setPlaylist(playlist)
    }

    const onChangeFilter = useCallback(async (filterBy) => {
        loadPlaylist(filterBy)
    }, [])

    const songSection = (playlist)? <div>
        <PlayListFilter onChangeFilter={onChangeFilter} />
        {playlist.songs.map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} playlistId={playlist._id} />)}
    </div> : ''

    if (!playlist && params.playlistId) return <h2>loading...</h2>

     

    return <section className="playlist-details">
        <div className="playlist-header flex">
            <div className="img-container flex">
            {(playlist && <img src={playlist.imgUrl}/>) || <BsMusicNoteBeamed className='new-playlist-icon'/>}
            </div>
            <div className="flex-col">
                <h5>playlist</h5>
                <h1>{(playlist && playlist.name) || 'My Playlist'}</h1>
                <h5>{(playlist && playlist.createdBy.fullname) || 'username'} • {(playlist && `${playlist.songs.length} songs`) || ''}</h5>
            </div>
        </div>

        {playlist && songSection}

    </section>
}