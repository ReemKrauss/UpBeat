import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import routes from '../routes'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/actions/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

export const AppHeader = () => {

    const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()

    const onOnLogin = (credentials) => {
        console.log(credentials, "hi")
        dispatch(onLogin(credentials))
    }


    return (
        <header className="header">
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={() => { dispatch(onLogout()) }}>Logout</button>
                    </span>
                }

                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onOnLogin} onSignup={() => { dispatch(onSignup()) }} />
                    </section>
                }

            </nav>

        </header>
    )
}