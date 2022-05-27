import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setMiniPlaylist } from "../store/actions/audio-player.action"
import { BsPlayFill } from 'react-icons/bs'



export const SongPreview = ({ song, playlistId}) => {
    const dispatch = useDispatch()

    const onSetMiniPlaylist = () => {
        dispatch(setMiniPlaylist(playlistId, song.idx))
    }


    return <section className="song-preview flex">
        <div className="flex">
            <h5>{song.idx + 1}</h5>
            <BsPlayFill className="play-btn" onClick={onSetMiniPlaylist} />
            <img src={song.imgUrl} />
            <h4 className='song-title'>{song.title}</h4>
        </div>
    </section>
}