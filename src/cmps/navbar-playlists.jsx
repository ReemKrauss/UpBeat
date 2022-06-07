import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { playlistService } from "../services/playlist.service";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"



export const NavBarPlayLists = (props) => {
    const [playlists, setPlaylists] = useState([])
    const { user } = useSelector((storeState) => storeState.userModule)
    useEffect(() => {
        loadPlaylists()
    }, [user])


    const loadPlaylists = () => {
        if (!user.likedPlaylists?.length) return
        setPlaylists([...user.likedPlaylists])
    }



    return (
        <nav className="navbar-playlists">

            <ul className="nav-list">
                {playlists.map((playlist, idx) => {
                    if (idx > 4) {
                        return null
                    }
                    return <li key={idx}>
                        <NavLink exact to={`/playlist/${playlist._id}`} activeClassName="chosen">

                            <div className="text">
                                {playlist.name}</div>

                        </NavLink>
                    </li>

                })}

            </ul>
        </nav>
    )
}