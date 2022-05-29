import { BsPlayFill } from 'react-icons/bs'
import { utilService } from '../services/util.service'

export const SongPreview = ({ song, playlistId, AddSong, onAddFromPlaylist, onSetMiniPlaylist}) => {

    const getTime = () => {
        const datecurr = new Date()
        const songDate = new Date(song.addedAt * 1000)
        const oneDay = 1000 * 60 * 60 * 24
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        if ((datecurr - songDate) / oneDay > 1) return <h4 className="date flex">{months[songDate.getMonth()]} {songDate.getDate()}</h4>
        else return <span className="date flex">{utilService.convertMsToTime(datecurr - (songDate / 1000)) } hours ago</span>
    }

    return <section className="song-preview flex">
        <div className="song-container flex">
            <div className='play-container flex'>
            <h5>{song.idx + 1}</h5>
            <BsPlayFill className="play-btn hidden  " onClick={() => onSetMiniPlaylist(song.idx)} />
            </div>
            <img src={song.imgUrl} />
            <h4 className='song-title'>{song.title}</h4>
            {/* {getTime()}
            <span className='song-duration'>{song.duration.display}</span> */}
            {onAddFromPlaylist && <button className="add-button" onClick={() => onAddFromPlaylist(song)}>Add</button>}
        </div>
    </section>
}