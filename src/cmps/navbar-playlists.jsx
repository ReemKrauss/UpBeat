import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { playlistService } from "../services/playlist.service";

export const NavBarPlayLists = (props) => {


    
    return (
        <nav className="navbar-playlists">

            <ul className="nav-list">
                <li>
                    <NavLink exact to="/playlist/pOecp" activeClassName="chosen">

                        <div className="text">
                            Heavenly music</div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/playlist/6EZB4" activeClassName="chosen" >

                        <div className="text">
                            Disney Spectacle
                            </div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/playlist/IHdSx" activeClassName="chosen" >

                        <div className="text">
                            00's Rock Anthems
                            </div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/playlist/OviSF" activeClassName="chosen" >

                        <div className="text">
                        Harry's House
                            </div>

                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}