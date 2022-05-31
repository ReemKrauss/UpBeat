import { Draggable } from 'react-beautiful-dnd'
import { BsPlayFill } from 'react-icons/bs'
import { utilService } from '../services/util.service'
import { useSelector, useDispatch } from 'react-redux'
import { togglePlay } from '../store/actions/audio-player.action'
const audioSVG = require('../assets/img/audio.svg')


export const SongPreview = ({ song, onAddFromPlaylist, onSetMiniPlaylist, playerId, provided }) => {

    const { isPlaying, isShuffled, miniPlaylist } = useSelector((storeState) => storeState.audioPlayerModule)
    const dispatch = useDispatch()

    const getTime = () => {
        const datecurr = new Date()
        const songDate = new Date(song.addedAt * 1000)
        const oneDay = 1000 * 60 * 60 * 24
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        if ((datecurr - songDate) / oneDay > 1) return <h4 className="date flex">{months[songDate.getMonth()]} {songDate.getDate()}</h4>
        else return <span className="date flex">{utilService.convertMsToTime(datecurr - (songDate / 1000))} hours ago</span>
    }

    const getCurrPlaying = () => {
        if (!miniPlaylist.songs.length) return
        console.log(miniPlaylist.currSongIdx)
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
                <div className="song-container flex">
                    <div className='play-container flex'>
                        {!isCurrPlaying && <h5>{song.idx + 1}</h5>}
                        {isCurrPlaying && !isPlaying && <h5 className="green">{song.idx + 1}</h5>}
                        {isCurrPlaying && isPlaying && <svg width="55" height="80" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg" fill="#FFF"><g transform="matrix(1 0 0 -1 0 80)"><rect width="10" height="20" rx="3"><animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite" /></rect><rect x="15" width="10" height="80" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite" /></rect><rect x="30" width="10" height="50" rx="3"><animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite" /></rect><rect x="45" width="10" height="30" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite" /></rect></g></svg>}
                        {!isCurrPlaying && <BsPlayFill className="play-btn hidden" onClick={onClickPlay} />}
                        {isCurrPlaying && !isPlaying && <BsPlayFill className="play-btn hidden" onClick={onClickPlay} />}
                        {isCurrPlaying && isPlaying && <svg role="img" height="16" width="16" className='play-btn hidden' onClick={onClickPlay} viewBox="0 0 16 16" ><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>}
                    </div>
                    <img src={song.imgUrl} />
                    <h4 className={`song-title ${isCurrPlaying && 'green'}`}>{song.title}</h4>
                    {getTime()}
                    <span className='song-duration'>{song.duration.display}</span>
                    {onAddFromPlaylist && <button className="add-button" onClick={() => onAddFromPlaylist(song)}>Add</button>}
                </div>
            </section>)
    

}