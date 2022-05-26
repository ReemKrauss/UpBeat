import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setMiniPlaylist } from "../store/actions/audio-player.action"
import { BsPlayFill } from 'react-icons/bs'



export const SongPreview = ({ song, playlistId, isFromPlayer, playlistName }) => {
    const dispatch = useDispatch()

    const onSetMiniPlaylist = () => {
        dispatch(setMiniPlaylist(playlistId, song.idx))
    }


    return <section className="song-preview flex">
        <div className="flex">
            {!isFromPlayer && <h5>{song.idx + 1}</h5>}
            <img src={song.imgUrl} />
            <h4 className='song-title'>{song.title}</h4>
            {isFromPlayer && <Link to={`/playlist/${playlistId}`}>{playlistName}</Link>}
            {!isFromPlayer && <BsPlayFill className="play-btn" onClick={onSetMiniPlaylist} />}
        </div>
    </section>
}