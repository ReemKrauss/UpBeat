import { BsPlayFill } from 'react-icons/bs'
import { utilService } from '../services/util.service'
import { useSelector, useDispatch } from 'react-redux'
import { togglePlay } from '../store/actions/audio-player.action'

import audioSvg from '../assets/img/audio.svg'


export const SongPreview = ({ song, onAddFromPlaylist, onSetMiniPlaylist, playerId, provided }) => {

    const { isPlaying, isShuffled, miniPlaylist } = useSelector((storeState) => storeState.audioPlayerModule)
    const dispatch = useDispatch()

    const getTime = () => {
        if(!song.addedAt)return''
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

    const draggable = provided? provided : {draggableProps: {}, dragHandleProps: {}, innerRef:() => {}}
    
    
    return (<section className="song-preview flex" {...draggable.draggableProps} {...draggable.dragHandleProps} ref={draggable.innerRef} >
                    <div className='play-container flex'>
                        {!isCurrPlaying && <h5>{song.idx + 1}</h5>}
                        {isCurrPlaying && !isPlaying && <h5 className="green">{song.idx + 1}</h5>}
                        {isCurrPlaying && isPlaying && <img className="audio-svg" src={audioSvg} alt="err" /> }
                        {!isCurrPlaying && <BsPlayFill className="play-btn hidden" onClick={onClickPlay} />}
                        {isCurrPlaying && !isPlaying && <BsPlayFill className="play-btn hidden" onClick={onClickPlay} />}
                        {isCurrPlaying && isPlaying && <svg role="img" height="16" width="14" className='play-btn hidden' onClick={onClickPlay} viewBox="0 0 16 16" fill="#fff"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>}
                    </div>
                    <img src={song.imgUrl} />
                    <h4 className={`song-title ${isCurrPlaying && 'green'}`}>{song.title}</h4>
                    {getTime()}
                    <span className='song-duration'>{song.duration.display}</span>
                    {onAddFromPlaylist && <button className="add-button" onClick={() => onAddFromPlaylist(song)}>Add</button>}
            </section>)
    

}