import { PlaylistPreview } from "./playlist-preview"

export const PlaylistList = ({ playlists, inLineStyle={} }) => {
    console.log(inLineStyle);
    return <section style={{...inLineStyle}} className="playlist-list">
        {playlists.map((playlist) => <PlaylistPreview key={playlist._id} playlist={playlist} />)}
    </section>
}

