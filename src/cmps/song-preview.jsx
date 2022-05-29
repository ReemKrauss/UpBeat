import { BsPlayFill } from 'react-icons/bs'

export const SongPreview = ({ song, playlistId, AddSong, onAddFromPlaylist, onSetMiniPlaylist}) => {
    return <section className="song-preview flex">
        <div className="flex">
            <h5>{song.idx + 1}</h5>
            <BsPlayFill className="play-btn" onClick={() => onSetMiniPlaylist(song.idx)} />
            <img src={song.imgUrl} />
            <h4 className='song-title'>{song.title}</h4>
            {onAddFromPlaylist && <button className="add-button" onClick={() => onAddFromPlaylist(song)}>Add</button>}
        </div>
    </section>
}