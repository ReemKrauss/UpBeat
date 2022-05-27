import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import Logo from "../assets/img/upbeatinvertedsquare.svg"
import { MdHomeFilled } from "react-icons/md";

export const NavBar=(props)=>{
        return (
           <nav className="nav-bar">
               <div className="logo-container">
               <img src={Logo} alt="" />
               <h1>UpBeat</h1>               
               </div>

                <ul className="nav-list">
                <li>
                    <NavLink exact to="/home" activeClassName="chosen">
                        
                            <div className="text">
                                <MdHomeFilled></MdHomeFilled>
                                 Home</div>
                        
                    </NavLink>
                </li>
                    <NavLink to="/search" activeClassName="chosen" >
                        <li>
                            <div className="text">Search</div>
                        </li>
                    </NavLink>

                    <NavLink to="/library" activeClassName="chosen" >
                        <li>
                            <div className="text library">Your Library</div>
                        </li>
                    </NavLink>

                    <NavLink to="/playlist" activeClassName="chosen" >
                        <li>
                            <div className="text create">Create Playlist</div>
                        </li>
                    </NavLink>

                    <NavLink exact to="/liked" activeClassName="chosen">
                        <li>
                            <div className="text">liked songs</div>
                        </li>
                    </NavLink>


                </ul>
            </nav>
        )
}



// function mapStateToProps(state) {
//     return {
//         unRead: state.activityLogModule.unRead,
//     }
// }
// const mapDispatchToProps = {
// }


// export const NavBar = connect(mapStateToProps, mapDispatchToProps)(_NavBar)


 // <nav className="nav-bar">
            //     <ul className="nav-list">

            //         <NavLink exact to="/" activeClassName="chosen">
            //             <li>
            //                 <div className="text">Home</div>
            //             </li>
            //         </NavLink>

            //         <NavLink to="/search" activeClassName="chosen" >
            //             <li>
            //                 <div className="text">Search</div>
            //             </li>
            //         </NavLink>

            //         <NavLink to="/library" activeClassName="chosen" >
            //             <li>
            //                 <div className="text library">Library</div>
            //             </li>
            //         </NavLink>

            //     </ul>
            // </nav>