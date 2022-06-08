import { Link } from "react-router-dom"
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { setMiniPlaylist, togglePlay } from "../store/actions/audio-player.action"

export function PlaylistPreview({ playlist }) {
    const { isPlaying, miniPlaylist } = useSelector((storeState) => storeState.audioPlayerModule)
    const dispatch = useDispatch()

    const onTogglePlay = (ev) => {
        ev.preventDefault()
        if (miniPlaylist.playlistId === playlist._id) {
            dispatch(togglePlay())
            return
        }
        if (playlist.songs.length) dispatch(setMiniPlaylist(playlist._id, 0, playlist.songs, playlist.name))
    }

    return <Link to={`/playlist/${playlist._id}`} className={`playlist-preview flex-col`}>
        <div className="img-container flex">
            {(playlist && playlist.imgUrl && <img src={playlist.imgUrl} />) || <BsMusicNoteBeamed className='new-playlist-icon' />}
            <button className="play-btn" onClick={onTogglePlay}>
                {(isPlaying && miniPlaylist.playlistId !== playlist._id) && <svg role="img" height="16" width="16" className='play-svg' viewBox="0 0 16 16" ><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>}
                {!isPlaying && <svg role="img" height="16" width="16" className='play-svg' viewBox="0 0 16 16" ><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>}
                {(isPlaying && miniPlaylist.playlistId === playlist._id) && <svg role="img" height="16" width="16" className='pause-svg' viewBox="0 0 16 16" ><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>}
            </button>
        </div>
        <h3 className="playlist-name">{playlist.name}</h3>
        {playlist.description && <p>{playlist.description}</p> || <p >{playlist.createdBy.fullname}</p>}

    </Link>
}