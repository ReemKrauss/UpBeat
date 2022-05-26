import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

export const NavBar=(props)=>{
        return (
           <nav className="nav-bar">
                <ul className="nav-list">

                    <NavLink exact to="/home" activeClassName="chosen">
                        <li>
                            <div className="text">Home</div>
                        </li>
                    </NavLink>

                    <NavLink to="/search" activeClassName="chosen" >
                        <li>
                            <div className="text">Search</div>
                        </li>
                    </NavLink>

                    <NavLink to="/library" activeClassName="chosen" >
                        <li>
                            <div className="text library">Library</div>
                        </li>
                    </NavLink>

                    <NavLink exact to="/playlist/liked" activeClassName="chosen">
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