import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import routes from '../routes'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/actions/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { red } from '@material-ui/core/colors'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { entries } from 'lodash'
import { useHeaderBGContext } from '../context/useBackgroundColor'
import { useParams } from 'react-router-dom'


export const AppHeader = ({ opacity }) => {
    const { color, updateColor } = useHeaderBGContext()
    const dispatch = useDispatch()

    // console.log(color, "hello")

    const { user } = useSelector((storeState) => storeState.userModule)
    const [isInSignup, setIsInSignup] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const param = useParams()

    useEffectUpdate(() => {
        toggleIsInSignup(false)
    }, [user._id])

    useEffect(
        () => {
            if (!param.playlistId) { updateColor(null) }
        }, [param])




    useEffect(() => {
        if (userMenuOpen) {

            window.addEventListener('click', closeMenuListener)
        }
        return () => { window.removeEventListener('click', closeMenuListener) }
    }, [userMenuOpen])

    const closeMenuListener = (ev) => {
        if (!document.querySelector('.user-info').contains(ev.target)) {
            toggleUserMenu()
        }
    }

    const toggleIsInSignup = (val) => {
        setIsInSignup(val)
    }

    const onOnLogin = (credentials) => {
        console.log(credentials, "hi")
        dispatch(onLogin(credentials))

    }

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen)
    }





    return (

        <header className="header" >
            <div className='headerBG' style={{ backgroundColor: color, opacity: opacity }}></div>


            <div onClick={toggleUserMenu} className={`user-info ${userMenuOpen ? 'open' : ''}`}>
                {user.imgUrl && <img src={user.imgUrl} />}
                <div className='user-full-name'>{user.fullname}</div>
                <svg role="img" height="16" width="16" className={`menu-arrow ${userMenuOpen ? 'open' : ''}`} viewBox="0 0 16 16"><path d="M14 6l-6 6-6-6h12z"></path></svg>
                <div className={`user-menu ${userMenuOpen ? 'open' : ''}`}>
                    {user._id ? <div className='login-btn' onClick={() => { dispatch(onLogout()) }}>Log out</div> :
                        <div className='login-btn' onClick={() => toggleIsInSignup(true)}>Log in</div>}
                </div>
            </div>

            {isInSignup &&
                <LoginSignup toggleIsInSignup={toggleIsInSignup} onLogin={onOnLogin} onSignup={(credentials) => { dispatch(onSignup(credentials)) }} />

            }
        </header>
    )
}