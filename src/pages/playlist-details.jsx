import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState, useCallback, useRef } from 'react'
import { playlistService } from '../services/playlist.service'
import { SongPreview } from '../cmps/song-preview'
import { PlaylistFilter } from '../cmps/playlist-filter'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { HiOutlinePencil, HiOutlineClock } from 'react-icons/hi'
import { useForm } from '../hooks/useForm'
import { PlaylistEdit } from '../cmps/playlist-edit'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { SearchBar } from '../cmps/search-bar'
import { setMiniPlaylist, togglePlay } from "../store/actions/audio-player.action"
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import getAverageColor from 'get-average-color'
import { userService } from '../services/user.service'
import { useHeaderBGContext } from '../context/useBackgroundColor'
import { setUserMsg, toggleLike } from '../store/actions/user.actions'
import { OptionsMenu } from '../cmps/options-menu'
import { WhatsappShareButton, FacebookShareButton } from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoLogoFacebook, IoLogoWhatsapp, IoShareSocialSharp } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";
import { socketService } from '../services/socket.service'



export const PlaylistDetails = (props) => {
    const initialValueEdit = {
        name: 'My Playlist',
        description: '',
        imgUrl: null
    }


    const params = useParams()
    const history = useHistory()

    const playBtnRef = useRef()
    const headerElementRef = useRef()
    const observer = useRef()
    const dispatch = useDispatch()
    const [playlist, setPlaylist] = useState(null)
    const [isEditing, setisEditing] = useState(false)
    const [editData, handleChange, setEditData] = useForm(initialValueEdit)
    const [filterBy, setFilterBy] = useState({
        title: '',
        order: 'custom',
    })
    const { isPlaying, isShuffled, miniPlaylist } = useSelector((storeState) => storeState.audioPlayerModule)
    const { user } = useSelector((storeState) => storeState.userModule)
    const [isLiked, setIsLiked] = useState(false)
    const { updateColor, color } = useHeaderBGContext()





    useEffect(() => {
        loadPlaylist()
        setEditData(initialValueEdit)
        return () => {
            observer.current?.disconnect()
        }
    }, [params.playlistId, user.likedSongs, user.likedPlaylists])

    useEffectUpdate(() => {
        if (playlist) {
            setIsLiked(user.likedPlaylists.some((userPlaylist) => userPlaylist._id === playlist._id))
            setEditData(playlist)
            playlistService.onWatchPlaylist(playlist._id)
            if (!params.playlistId) history.push(`/playlist/${playlist._id}`)
        }
        else setEditData(initialValueEdit)
    }, [playlist, params.playlistId])

    useEffect(() => {
        playlist?.imgUrl && getAverageColor(playlist.imgUrl).then(rgb => { //convert to await
            const a = `rgb(${rgb.r},${rgb.g}, ${rgb.b})`
            updateColor(a)
        })
    }, [playlist?.imgUrl])

    useEffect(() => {
        if (playlist?.songs.length) {
            if (!observer.current) observer.current = new IntersectionObserver((entry) => {
                if ([...headerElementRef.current.classList].includes('hidden') && entry[0].isIntersecting) return
                headerElementRef.current.classList.toggle("hidden", entry.isIntersecting)
            }, {
                threshold: 1,
            })
            observer.current.observe(playBtnRef.current)
        }

    }, [playlist, params.playlistId])

    useEffect(() => {
        socketService.off('playlist-update', updatePlaylist)
        socketService.on('playlist-update', updatePlaylist)
    }, [])


    const loadPlaylist = async () => {
        if (params.playlistId === 'liked') setPlaylist(userService.getLikedSongsPlaylist())
        else if (!params.playlistId) setPlaylist(null)
        else setPlaylist(await playlistService.getById(params.playlistId))
    }

    const updatePlaylist = (playlist) => {
        if (params.playlistId !== 'liked') loadPlaylist(playlist)
    }

    const onChangeFilter = useCallback(async (filterBy) => {
        setFilterBy(filterBy)
    }, [])

    const getFilteredSongs = () => {
        if (playlist) {
            let filteredSongs = playlist.songs.filter(song => {
                return song.title.toLowerCase().includes(filterBy.title.toLowerCase())
            })
            if (filterBy.order !== 'custom')
                filteredSongs = filteredSongs.sort((a, b) => a[filterBy.order] !== b[filterBy.order] ? a[filterBy.order] < b[filterBy.order] ? -1 : 1 : 0)
            return filteredSongs
        }
        return playlist.songs
    }

    const removeSong = async (song) => {
        if (params.playlistId === 'liked') dispatch(toggleLike(song))
        else {
            const newPlaylist = await playlistService.removeSong(song, playlist)
            socketService.emit('playlist-update', newPlaylist)
            setPlaylist(newPlaylist)}
    }

    const removePlaylist = async () => {
        try{
            await playlistService.removePlaylist(playlist._id)
            dispatch(setUserMsg('Playlist deleted successfully', 'success'))
            history.push('/')
        }catch(err){
            dispatch(setUserMsg('Could not delete playlist', 'err'))
        }
    }

    const onLikePlaylist = () => {
        dispatch(toggleLike(playlist, 'likedPlaylists'))
    }

    const onUploaded = (imgUrl) => {
        setEditData({ ...editData, imgUrl });
        getAvgColor(imgUrl)
    }

    const toggleEdit = () => {
        if (params.playlistId !== 'liked') setisEditing(!isEditing) //add to description
    }

    const onSaveEdit = async (ev) => {
        ev.preventDefault()
        if (playlist) {
            const newPlaylist = await playlistService.save({ ...editData, _id: playlist._id })
            socketService.emit('playlist-update', newPlaylist)
            setPlaylist(newPlaylist)

        }
        else setPlaylist(await playlistService.save(editData, user))
        toggleEdit()
    }

    const onAddFromPlaylist = async (ev, song) => {
        ev.stopPropagation()
        let newPlaylist
        if (playlist) {
            newPlaylist = await playlistService.addSong(song, playlist, user)

        } else newPlaylist = await playlistService.save({ ...editData, songs: [song] }, user)
        socketService.emit('playlist-update', newPlaylist)
        setPlaylist(newPlaylist)
    }

    const onSetMiniPlaylist = (songIdx) => {
        const songs = getFilteredSongs()
        dispatch(setMiniPlaylist(playlist._id, songIdx, songs, playlist.name))
    }

    const onTogglePlay = (ev) => {
        ev.preventDefault()
        if (miniPlaylist.playlistId === playlist._id) {
            dispatch(togglePlay())
            return
        }
        if (playlist.songs.length) dispatch(setMiniPlaylist(playlist._id, 0, playlist.songs, playlist.name))
    }

    const handleOnDragEnd = async (result) => {
        if (!result.destination || filterBy.order !== 'custom') return
        const songsCpy = playlist.songs.slice()
        const reorderedSong = songsCpy.splice(result.source.index, 1)
        songsCpy.splice(result.destination.index, 0, reorderedSong[0])
        const newPlaylist = { ...playlist, songs: songsCpy }
        playlistService.save(newPlaylist) //for backend
        socketService.emit('playlist-update', newPlaylist)
        setPlaylist(newPlaylist)
    }

    const getAvgColor = async (url) => {
        const rgb = getAverageColor(url)
        updateColor(`rgb(${rgb.r},${rgb.g}, ${rgb.b})`)
    }


    const getPlaylistLength = () => {
        if (playlist && playlist.songs.length) {
            const totalDuration = playlist.songs.reduce((prevSong, currSong) => prevSong + currSong.duration.total, 0)
            const hours = (totalDuration / 3600)
            const rhours = Math.floor(hours)
            const minutes = Math.floor((hours - rhours) * 60)
            return <span className='playlist-length'>{rhours > 0 && `${rhours} hr`} {minutes} min</span>
        }
    }




    const bigPlayButton = <button ref={playBtnRef} className="play-all-btn" onClick={onTogglePlay}>
        {(!isPlaying || isPlaying && playlist?._id !== miniPlaylist?.playlistId) && <svg role="img" height="16" width="16" className='play-svg' viewBox="0 0 16 16" ><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>}
        {isPlaying && (playlist?._id === miniPlaylist?.playlistId) && <svg role="img" height="16" width="16" className='pause-svg' viewBox="0 0 16 16" ><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>}
    </button>



    const songSection = (playlist && playlist.songs.length) ? <div className='relative'>
        <PlaylistFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
        <div ref={headerElementRef} className="header-element flex">
            {bigPlayButton}
            {<h2>{playlist.name}</h2>}
        </div>
        <div className="playlist-controls flex">
            {bigPlayButton}
            {isLiked && params.playlistId !== 'liked' && <svg role="img" onClick={onLikePlaylist} className="like" height="16" width="16" viewBox="0 0 16 16" fill="#1ed760" ><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg> ||
                params.playlistId !== 'liked' && <svg role="img" onClick={onLikePlaylist} height="16" width="16" viewBox="0 0 16 16" className="like" fill="#c2bfbe"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path></svg>}
            {params.playlistId !== 'liked' && <OptionsMenu removePlaylist={removePlaylist} />}
        </div>
        <div className="sorting-table flex">
            <span className="idx-label">#</span>
            <span className="title-label">TITLE</span>
            <span className="date-label">DATE ADDED</span>
            <HiOutlineClock className="duration-label" />
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="songs">
                {(provided) => (
                    <div className="song-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {playlist.songs && getFilteredSongs().map((song, idx) => {
                            return (<Draggable key={idx} draggableId={song.id + idx} index={idx}>
                                {(provided) => (<SongPreview song={({ ...song, idx })} playerId={playlist._id} onSetMiniPlaylist={onSetMiniPlaylist}
                                    removeSong={removeSong} provided={provided} />
                                )}
                            </Draggable>)
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div> : ''

    if (!playlist && params.playlistId) return <h2></h2>

    return <section className="playlist-details main-layout">
        <div className="playlist-header flex full" style={{ backgroundColor: color }} >
            <div onClick={toggleEdit} className="img-container flex">
                {(playlist && playlist.imgUrl && <img src={playlist.imgUrl} />) || <BsMusicNoteBeamed className="new-playlist-icon" />}
            </div>
            <div className="flex-col">
                <h5>playlist</h5>
                <h1 onClick={toggleEdit}>{(playlist && playlist.name) || 'My Playlist'}</h1>
                {playlist && playlist.description && <p>{playlist.description}</p>}
                <h5>{(playlist && playlist.createdBy.fullname) || 'username'} • {(playlist && `${playlist.songs.length} songs`) || ''}{getPlaylistLength()}</h5>
            </div>
        </div>


        {playlist && songSection}
        {isEditing && <PlaylistEdit handleChange={handleChange} onUploaded={onUploaded} editData={editData} toggleEdit={toggleEdit} onSaveEdit={onSaveEdit} />}
        {params.playlistId !== 'liked' && <div className="search-container">
            <h3>Let's find something for your playlist</h3>
            <SearchBar onAddFromPlaylist={onAddFromPlaylist} />
        </div>}
    </section>
}