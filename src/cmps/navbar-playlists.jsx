import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { playlistService } from "../services/playlist.service";

export const NavBarPlayLists = (props) => {


    
    return (
        <nav className="navbar-playlists">

            <ul className="nav-list">
            <li>
                    <NavLink to="/playlist/6294fb042758800fcddddc4e" activeClassName="chosen" >

                        <div className="text">
                        Disney hits Spectacle!
                            </div>

                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/playlist/6294fb042758800fcddddc54" activeClassName="chosen">

                        <div className="text">
                            Justice - Justin Bieber
                            </div>

                    </NavLink>
                </li>

                <li>
                    <NavLink to="/playlist/6294fb042758800fcddddc4f" activeClassName="chosen" >

                        <div className="text">
                            00's Rock Anthems
                            </div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/playlist/6294fb042758800fcddddc60" activeClassName="chosen" >

                        <div className="text">
                         שירי מרפסת - רועי כפרי
                            </div>

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/playlist/629d1299be45016c04d6048d" activeClassName="chosen" >

                        <div className="text">
                        90's workout
                            </div>

                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}