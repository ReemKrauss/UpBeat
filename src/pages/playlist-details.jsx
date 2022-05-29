import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { playlistService } from '../services/playlist.service'
import { SongPreview } from '../cmps/song-preview'
import { PlayListFilter } from '../cmps/playlist-filter'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { HiOutlinePencil, HiOutlineClock } from 'react-icons/hi'
import { useForm } from '../hooks/useForm'
import { PlaylistEdit } from '../cmps/playlist-edit'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { SearchBar } from '../cmps/search-bar'
import { setMiniPlaylist } from "../store/actions/audio-player.action"
import { useDispatch } from "react-redux"


export const PlaylistDetails = (props) => {
    const initialValueEdit = {
        name: 'My Playlist',
        description: '',
        imgUrl: null
    }

    const params = useParams()
    const dispatch = useDispatch()
    const [playlist, setPlaylist] = useState(null)
    const [isEditing, setisEditing] = useState(false)
    const [editData, handleChange, setEditData] = useForm(initialValueEdit)
    const [filterBy, setFilterBy] = useState({
        title: '',
        order: 'date'
    })

    useEffect(() => {
        loadPlaylist()
        setEditData(initialValueEdit)
    }, [params.playlistId])

    useEffectUpdate(() => {
        if (playlist) setEditData(playlist)

    }, [playlist])

   
    const loadPlaylist = async () => {
        setPlaylist(await playlistService.getById(params.playlistId))
    }

    const onChangeFilter = useCallback(async (filterBy) => {
        setFilterBy(filterBy)
    }, [])

    const getFilteredSongs = () => {
        if (playlist){
            let filteredSongs = playlist.songs.filter(song => {
                return song.title.toLowerCase().includes(filterBy.title.toLowerCase())
            })
            filteredSongs = filteredSongs.sort((a, b) => a[filterBy.order] !== b[filterBy.order] ? a[filterBy.order] < b[filterBy.order] ? -1 : 1 : 0);
            return filteredSongs
        }
        return playlist.songs
    }

    const onUploaded = (imgUrl) => {
        setEditData({ ...editData, imgUrl });
    }

    const toggleEdit = () => {
        setisEditing(!isEditing)
    }

    const onSaveEdit = async (ev) => {
        ev.preventDefault()
        if (playlist) {
            const newPlaylist = await playlistService.save({ ...editData, _id: playlist._id })
            setPlaylist(newPlaylist)

        }
        else setPlaylist(await playlistService.save(editData))
        toggleEdit()
    }

    const onAddFromPlaylist = async (song) => {
        let newPlaylist
        if (playlist) {
            newPlaylist = await playlistService.addSong(song, playlist)

        } else newPlaylist = await playlistService.save({ ...editData, songs: [song] })
        setPlaylist(newPlaylist)
    }

    const onSetMiniPlaylist = (songIdx) => {
        const songs =  getFilteredSongs()
        dispatch(setMiniPlaylist(playlist._id, songIdx, songs))
    }

    const songSection = (playlist) ? <div>
        <PlayListFilter onChangeFilter={onChangeFilter} filterBy = {filterBy} />
        <div className='sorting-table flex'>
            <span>#</span>
            <span>TITLE</span>
            <span>DATE ADDED</span>
            <HiOutlineClock />
        </div>
        {playlist.songs && getFilteredSongs().map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} playlistId={playlist._id} onSetMiniPlaylist = {onSetMiniPlaylist} />)}
    </div> : ''

    if (!playlist && params.playlistId) return <h2>loading...</h2>

    console.log(playlist)
    return <section className="playlist-details main-layout">
        <div className="playlist-header flex full">
            <div onClick={toggleEdit} className="img-container flex">
                {(playlist && playlist.imgUrl && <img src={playlist.imgUrl} />) || <BsMusicNoteBeamed className='new-playlist-icon' />}
            </div>
            <div className="flex-col">
                <h5>playlist</h5>
                <h1 onClick={toggleEdit}>{(playlist && playlist.name) || 'My Playlist'}</h1>
                <h5>{(playlist && playlist.createdBy.fullname) || 'username'} • {(playlist && `${playlist.songs.length} songs`) || ''}</h5>
            </div>
        </div>

        {playlist && songSection}
        {isEditing && <PlaylistEdit handleChange={handleChange} onUploaded={onUploaded} editData={editData} toggleEdit={toggleEdit} onSaveEdit={onSaveEdit} />}
        <div className='search-container'>
            <h3>Let's find something for your playlist</h3>
            <SearchBar onAddFromPlaylist={onAddFromPlaylist} />
        </div>

    </section>
}