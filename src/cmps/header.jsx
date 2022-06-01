import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import routes from '../routes'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/actions/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { red } from '@material-ui/core/colors'
import { useEffectUpdate } from '../hooks/useEffectUpdate'

export const AppHeader = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((storeState) => storeState.userModule)
    const [isInSignup, setIsInSignup] = useState(false)

    useEffectUpdate(()=>{
        toggleIsInSignup(false)
    },[user._id])

    const toggleIsInSignup = (val) => {
        setIsInSignup(val)
    }
    const onOnLogin =(credentials) => {
        console.log(credentials, "hi")
          dispatch(onLogin(credentials))
       
    }

    return (
        <header className="header">


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
                    <div className='open-login-btn' onClick={()=>toggleIsInSignup(true)}>Log in</div>
                </div>
            }
            {isInSignup&&
                <LoginSignup toggleIsInSignup={toggleIsInSignup} onLogin={onOnLogin} onSignup={() => { dispatch(onSignup()) }} />

            }

        </header>
    )
}