import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min"
import Logo from "../assets/img/upbeatinvertedsquare.svg"
import { MdHomeFilled } from "react-icons/md";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { playlistService } from "../services/playlist.service";
import { NavBarPlayLists } from '../cmps/navbar-playlists.jsx';
import useWindowDimensions from "../hooks/useWindowDimentions";


export const NavBar = (props) => {



    return (
        <nav className="nav-bar">
            <div className="logo-container">
                <img src={Logo} alt="" />
                <h1>UpBeat</h1>
            </div>

            <ul className="nav-list">
                <li>
                    <NavLink exact to="/" activeClassName="chosen">

                        <div className="text">
                            <MdHomeFilled></MdHomeFilled>
                            Home</div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/search" activeClassName="chosen" >

                        <div className="text">
                            <RiSearchLine></RiSearchLine>
                            Search</div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/library" activeClassName="chosen" >

                        <div className="text library-nav">
                        <svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path></svg>
                            Your Library</div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/playlist" activeClassName="chosen" >

                        <div className="text create">
                            <BsFillPlusSquareFill></BsFillPlusSquareFill>
                            Create Playlist</div>

                    </NavLink>
                </li>
                <li className="liked-li">
                    <NavLink exact to="/playlist/liked" activeClassName="chosen">
                        <div className="text liked">
                            <div className="svg-container flex">
                                <svg role="img" className="like" height="16" width="16" viewBox="0 0 16 16" fill="#fff" ><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
                            </div>
                            Liked Songs</div>

                    </NavLink>
                </li>

            </ul>
            <NavBarPlayLists />
        </nav>
    )
}