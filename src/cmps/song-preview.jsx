import { BsPlayFill } from 'react-icons/bs'
import { utilService } from '../services/util.service'
import { useSelector, useDispatch } from 'react-redux'
import { togglePlay } from '../store/actions/audio-player.action'
import { useState, useEffect } from 'react'
import audioSvg from '../assets/img/audio.svg'
import { toggleLike } from '../store/actions/user.actions'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'



export const SongPreview = ({ song, onAddFromPlaylist, onSetMiniPlaylist, playerId, provided }) => {

    const { isPlaying, isShuffled, miniPlaylist } = useSelector((storeState) => storeState.audioPlayerModule)
    const { user } = useSelector((storeState) => storeState.userModule)
    const [isLiked, setIsLiked] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        if( params.playlistId === 'liked') setIsLiked(true)
        if ( user.likedSongs.some((currsong) => currsong.id === song.id)) setIsLiked(true)
        else setIsLiked(false)
    }, [user.likedSongs])

    const getTime = () => {
        if (!song.addedAt) return ''
        const datecurr = new Date()
        const songDate = new Date(song.addedAt)
        const oneDay = 1000 * 60 * 60 * 24
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        if ((datecurr - songDate) / oneDay > 1) return <span className="date flex">{months[songDate.getMonth()]} {songDate.getDate()}, {songDate.getFullYear()}</span>
        else return <span className="date flex">{utilService.convertMsToTime(datecurr - (songDate))}</span>
    }

    const getCurrPlaying = () => {
        if (!miniPlaylist.songs.length) return
        if (playerId !== miniPlaylist.playlistId) return false
        if (!isShuffled && miniPlaylist.currSongIdx === song.idx && miniPlaylist.songs[miniPlaylist.currSongIdx].id === song.id) {
            return true
        }
        if (miniPlaylist.songs[miniPlaylist.currSongIdx].initIdx === song.idx) {
            return true
        }
        return false
    }
    const isCurrPlaying = getCurrPlaying()

    const onClickPlay = () => {
        if (!isCurrPlaying) onSetMiniPlaylist(song.idx)
        else dispatch(togglePlay())
    }

    const onToggleLike = () => {
        dispatch(toggleLike(song))
    }
    const draggable = provided ? provided : { draggableProps: {}, dragHandleProps: {}, innerRef: () => { } }

    console.log('rendered')
    return (<section className="song-preview flex" {...draggable.draggableProps} {...draggable.dragHandleProps} ref={draggable.innerRef} >
        <div className='play-container flex'>
            {!isCurrPlaying && <h5>{song.idx + 1}</h5>}
            {isCurrPlaying && !isPlaying && <h5 className="green">{song.idx + 1}</h5>}
            {isCurrPlaying && isPlaying && <img className="audio-svg" src={audioSvg} alt="err" />}
            {!isCurrPlaying && <BsPlayFill className="play-btn hidden" onClick={onClickPlay} />}
            {isCurrPlaying && !isPlaying && <BsPlayFill className="play-btn hidden" onClick={onClickPlay} />}
            {isCurrPlaying && isPlaying && <svg role="img" height="16" width="14" className='play-btn hidden' onClick={onClickPlay} viewBox="0 0 16 16" fill="#fff"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>}
        </div>
        <img src={song.imgUrl} />
        <h4 className={`song-title ${isCurrPlaying && 'green'}`}>{song.title}</h4>
        {getTime()}
        {isLiked && <svg role="img" onClick={onToggleLike} className="like" height="16" width="16" viewBox="0 0 16 16" fill="#1ed760" ><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg> ||
        <svg role="img" onClick={onToggleLike} height="16" width="16" viewBox="0 0 16 16" className="like" fill="#c2bfbe"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path></svg>}
        
        <span className='song-duration'>{song.duration.display}</span>
        {onAddFromPlaylist && <button className="add-button" onClick={() => onAddFromPlaylist(song)}>Add</button>}
    </section>)


}