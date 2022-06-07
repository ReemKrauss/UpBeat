import { useEffect, useState } from 'react'
import { PlaylistList } from '../cmps/playlist-list'
import { playlistService } from "../services/playlist.service"
import { Link } from "react-router-dom"



export const Home = (props) => {
    const [tags, setTags] = useState([])
    const [cols, setCols] = useState((window.innerWidth < 680)?0:~~((window.innerWidth - 240) / 210))

    useEffect(() => {
        loadTags()
    }, [])

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth < 680) {
                setCols(0)
            }else setCols(~~((window.innerWidth - 240) / 210))
        }
        window.addEventListener('resize', resizeHandler)
        return () => { window.removeEventListener('resize', resizeHandler) }
    }, [])


    const loadTags = async () => {
        const tags = await playlistService.getTags()
        tags.forEach(async (tag, idx) => {
            tag.playlists = await playlistService.query({ tags: tag.title })
            // only set tags after fetching all playlists
            if (idx === tags.length - 1) setTags(tags)
        })

    }
    const getListStyle = () => {
        if (window.innerWidth < 680) return
        return { gridTemplateColumns: `repeat(${cols},1fr)` }
    }



    if (!tags.length) return null;
    return <section className="home main-layout">
        {tags.map((tag) => {
            if (!tag.playlists?.length) return null;
            return (
                <div key={tag.title} className='playlists-container'>
                    <div className='title-container'>
                        <h2 className='tag-title'>{tag.title}</h2>
                        {cols<tag.playlists.length&&<Link className='see-all' to={`/genre/${tag.title}`}>SEE ALL</Link>}
                    </div>
                    <PlaylistList playlists={(!cols) ? tag.playlists : tag.playlists.slice(0, cols)} inLineStyle={getListStyle()} />
                </div>
            )
        })}
    </section>
}