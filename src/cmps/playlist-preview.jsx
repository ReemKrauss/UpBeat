import { Link } from "react-router-dom"
import { BsMusicNoteBeamed } from 'react-icons/bs'

export function PlaylistPreview({ playlist }) {
    return <Link to={`/playlist/${playlist._id}`} className={`playlist-preview flex-col`}>
        <div className="img-container flex">
            {(playlist && playlist.imgUrl && <img src={playlist.imgUrl} />) || <BsMusicNoteBeamed className='new-playlist-icon' />}
        </div>
        <h3 className="playlist-name">{playlist.name}</h3>
        <p className="playlist-by">{playlist.createdBy.fullname}</p>
    </Link>
}