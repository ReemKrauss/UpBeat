import { useEffect, useState } from 'react'
import { PlaylistList } from '../cmps/playlist-list'
import { playlistService } from "../services/playlist.service"


export const Home = (props) => {
    const [tags, setTags] = useState([])

    useEffect(() => {
        loadTags()
    }, [])


    const loadTags = async () => {
        const tags = await playlistService.getTags()
        tags.forEach(async (tag,idx) => {
            tag.playlists = await playlistService.query({ tags: tag.title })
            // only set tags after fetching all playlists
            if(idx===tags.length-1)setTags(tags)
        })
        
    }



    if (!tags.length) return null;
    return <section className="home main-layout">
        {tags.map((tag) => {
            if (!tag.playlists.length) return null;
            return (
                <div key={tag.title} className='playlists-container'>
                    <h2>{tag.title}</h2>
                    <PlaylistList playlists={tag.playlists} />
                </div>
            )
        })}
    </section>
}