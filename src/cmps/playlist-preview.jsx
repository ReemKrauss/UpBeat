import { Link } from "react-router-dom"
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export function PlaylistPreview({ playlist }) {
    const {isPlaying, miniPlaylist} = useSelector((storeState) => storeState.audioPlayerModule)

    return <Link to={`/playlist/${playlist._id}`} className={`playlist-preview flex-col`}>
        <div className="img-container flex">
            {(playlist && playlist.imgUrl && <img src={playlist.imgUrl} />) || <BsMusicNoteBeamed className='new-playlist-icon' />}
        </div>
        <h3 className="playlist-name">{playlist.name}</h3>
        {playlist.description && <p>{playlist.description}</p> || <p >{playlist.createdBy.fullname}</p>}
        
    </Link>
}