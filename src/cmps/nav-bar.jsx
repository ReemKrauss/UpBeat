import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import Logo from "../assets/img/upbeatinvertedsquare.svg"
import { MdHomeFilled } from "react-icons/md";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { BsFillPlusSquareFill } from "react-icons/bs";


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
                {/* <li>
                    <NavLink to="/library" activeClassName="chosen" >

                        <div className="text library">Your Library</div>

                    </NavLink>
                </li> */}
                <li>
                    <NavLink to="/playlist" activeClassName="chosen" >

                        <div className="text create">
                        <BsFillPlusSquareFill></BsFillPlusSquareFill>
                            Create Playlist</div>

                    </NavLink>
                </li>
                {/* <li>
                    <NavLink exact to="/liked" activeClassName="chosen">

                        <div className="text">liked songs</div>

                    </NavLink>
                </li> */}

            </ul>
        </nav>
    )
}