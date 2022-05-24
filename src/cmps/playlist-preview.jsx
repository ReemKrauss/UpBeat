import { Link } from "react-router-dom"

export function PlaylistPreview({playlist}) {
    return <Link to={`/playlist/${playlist._id}`} className={`playlist-preview flex-col`}>
        <img src={playlist.imgUrl} />
        <h3 className="playlist-name">{playlist.name}</h3>
        <p className="playlist-by">{playlist.createdBy.fullname}</p>
    </Link>
}