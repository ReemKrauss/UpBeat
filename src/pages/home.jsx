import { playlistService } from "../services/playlist.service" //for dev purposes, adding service to window

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlaylistList } from '../cmps/playlist-list'
import { loadPlaylists } from '../store/actions/playlist.action'


export const Home = (props) => {
    const { playlists } = useSelector((storeState) => storeState.playlistModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPlaylists())
    }, [])

    return <section className="search">
        <h1>Good Morning</h1>
        {playlists && <PlaylistList playlists={playlists}/>}
    </section>
}