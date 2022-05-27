import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { playlistService } from '../services/playlist.service'
import { SongPreview } from '../cmps/song-preview'
import { PlayListFilter } from '../cmps/playlist-filter'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { HiOutlinePencil } from 'react-icons/hi'
import { useForm } from '../hooks/useForm'
import { PlaylistEdit } from '../cmps/playlist-edit'
import { useEffectUpdate } from '../hooks/useEffectUpdate'


export const PlaylistDetails = (props) => {
    const initialValueEdit = {
        name: 'My Playlist',
        description: '',
        imgUrl: null
    }

    const params = useParams()
    const [playlist, setPlaylist] = useState(null)
    const [isEditing, setisEditing] = useState(false)
    const [editData, handleChange, setEditData] = useForm(initialValueEdit)


    useEffect(() => {
        loadPlaylist()
        setEditData(initialValueEdit)
    }, [params.playlistId])

    useEffectUpdate(() => {
        if (playlist) setEditData(playlist)

    }, [playlist])

    const loadPlaylist = async (filterBy) => {
        setPlaylist(await playlistService.getById(params.playlistId, filterBy))
    }

    const onChangeFilter = useCallback(async (filterBy) => {
        loadPlaylist(filterBy)
    }, [])

    const onUploaded = (imgUrl) => {
        setEditData({ ...editData, imgUrl });
    }

    const toggleEdit = () => {
        setisEditing(!isEditing)
    }

    const onSaveEdit = async (ev) => {
        ev.preventDefault()
        if (playlist) {
            const res = await playlistService.save({ ...editData, _id: playlist._id })
            setPlaylist(res)

        }
        else setPlaylist(await playlistService.save(editData))
        toggleEdit()
    }

    const songSection = (playlist) ? <div>
        <PlayListFilter onChangeFilter={onChangeFilter} />
        {playlist.songs && playlist.songs.map((song, idx) => <SongPreview key={idx} song={({ ...song, idx })} playlistId={playlist._id} />)}
    </div> : ''

    if (!playlist && params.playlistId) return <h2>loading...</h2>



    return <section className="playlist-details">
        <div className="playlist-header flex">
            <div onClick={toggleEdit} className="img-container flex">
                {(playlist && <img src={playlist.imgUrl} />) || <BsMusicNoteBeamed className='new-playlist-icon' />}
            </div>
            <div className="flex-col">
                <h5>playlist</h5>
                <h1 onClick={toggleEdit}>{(playlist && playlist.name) || 'My Playlist'}</h1>
                <h5>{(playlist && playlist.createdBy.fullname) || 'username'} • {(playlist && `${playlist.songs.length} songs`) || ''}</h5>
            </div>
        </div>

        {playlist && songSection}
        {isEditing && <PlaylistEdit handleChange={handleChange} onUploaded={onUploaded} editData={editData} toggleEdit={toggleEdit} onSaveEdit={onSaveEdit} />}

    </section>
}