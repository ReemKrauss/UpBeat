import { map } from "lodash"
import { useEffect, useState } from "react"
import { SearchBar } from "../cmps/search-bar"
import { playlistService } from '../services/playlist.service'
import { Link } from "react-router-dom"






export const Search = () => {
    const [tags, setTags] = useState([])

    useEffect(() => {
        loadTags()
    }, [])
    const loadTags = async () => {
        setTags(await playlistService.getTags())
    }
    return <section className="search main-layout">
        <SearchBar>
            <h2>Songs</h2>
        </SearchBar>
        <h2>Browse all</h2>



        <div className="tag-container">
            {tags.map((tag, idx) => {
                const mystyle = { backgroundColor: tag.color }
                return (
                    <Link key={idx} to={`/genre/${tag.title}`}>
                        <div className="tag-preview" style={mystyle}>
                            <h1>{tag.title}</h1>
                            <img src={tag.imgUrl} />
                        </div>
                    </Link>
                )
            })}
        </div>


    </section>
}