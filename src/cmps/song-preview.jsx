import { useDispatch } from "react-redux"
import { setMiniPlaylist } from "../store/actions/audio-player.action"
import { BsPlayFill } from 'react-icons/bs' 



export const SongPreview = ({song}) => {
    const dispatch = useDispatch()
    const {playlistId,idx} = song

    const onSetMiniPlaylist = () => {
        dispatch(setMiniPlaylist(playlistId, idx))
    }

    return <section className="song-preview flex">
        <div className="flex">
            <h5>{idx +1}</h5>
            <img src={song.imgUrl} />
            <h4 className = 'song-title'>{song.title}</h4>
            <BsPlayFill className="play-btn" onClick = {onSetMiniPlaylist} />
        </div>
    </section>
}