import { PlaylistPreview } from "./playlist-preview"

export const PlaylistList = ({playlists}) => {
    return <section className="playlist-list">
        {playlists.map((playlist) => <PlaylistPreview key={playlist._id} playlist={playlist}/>)}
    </section>
}

