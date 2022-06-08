import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


import { playlistService } from "../services/playlist.service"

import { PlaylistPreview } from "../cmps/playlist-preview"


export const Library = (props) => {
    const [playlists, setPlaylists] = useState([])
    const { user } = useSelector((storeState) => storeState.userModule)
    const likedSongsCount = user.likedSongs.length

    useEffect(() => {
        loadPlaylists()
    }, [user])


    const loadPlaylists = () => {
        if (!user.likedPlaylists?.length) return
        const likedPlaylists = [...user.likedPlaylists]
        likedPlaylists.forEach(async (currPlaylist, idx) => {
            currPlaylist = await playlistService.getById(currPlaylist._id)
            // only set tags after fetching all playlists
            if (idx === likedPlaylists.length - 1) setPlaylists(likedPlaylists)
        })

    }

    return (
        <div className="library">

            <Link className="liked-songs" to="/playlist/liked">
                <div className="songs-titles">
                    {likedSongsCount > 0 && <span>{user.likedSongs[0].title}</span>}
                    {likedSongsCount > 1 && <span>{user.likedSongs[1].title}</span>}
                    {likedSongsCount > 2 && <span>{user.likedSongs[2].title}</span>}
                </div>
                <div className="songs-count">
                    <h1>Liked songs</h1>
                    <h6>{likedSongsCount} liked songs</h6>
                </div>
            </Link>

            {playlists.map((playlist) => {
                return (
                    <PlaylistPreview key={playlist._id} playlist={playlist} />
                )
            })}
        </div>
    )

}