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
    const header = document.getElementsByClassName("header")

    // console.log(color, "hello")

    const { user } = useSelector((storeState) => storeState.userModule)
    const [isInSignup, setIsInSignup] = useState(false)
    const param = useParams()

    useEffectUpdate(() => {
        toggleIsInSignup(false)
    }, [user._id])

    const toggleIsInSignup = (val) => {
        setIsInSignup(val)
    }
    const onOnLogin = (credentials) => {
        console.log(credentials, "hi")
        dispatch(onLogin(credentials))

    }

    // console.log('dekel vakninnn', useParams())

    useEffect(() => { if (!param.playlistId) { updateColor(null) } }
        , [param])

    return (

        <header className="header" >
            <div className='headerBG' style={{ backgroundColor: color, opacity: opacity }}></div>

            {user._id &&
                <div className="user-info">
                    {user.imgUrl && <img src={user.imgUrl} />}
                    <div className='user-full-name'>{user.fullname}</div>
                    <button onClick={() => { dispatch(onLogout()) }}>Logout</button>
                </div>
            }

            {!user._id &&
                <div className="user-info">
                    {user.imgUrl && <img src={user.imgUrl} />}
                    <div className='user-full-name'>{user.fullname}</div>
                    <div className='open-login-btn' onClick={() => toggleIsInSignup(true)}>Log in</div>
                </div>
            }
            {isInSignup &&
                <LoginSignup toggleIsInSignup={toggleIsInSignup} onLogin={onOnLogin} onSignup={() => { dispatch(onSignup()) }} />

            }
        </header>
    )
}