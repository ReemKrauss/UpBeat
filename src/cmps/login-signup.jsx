import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { GrClose } from 'react-icons/gr'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)

    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    const handleChange = ev => {
        const field = ev.target.name;
        const value = ev.target.value;
        console.log('handle', field, value)
        setCredentials({ ...credentials, [field]: value });
    }

    const onLogin = (ev = null) => {
        console.log(credentials)
        if (ev) ev.preventDefault();
        if (!credentials.username) return;
        console.log(props.onLogin)
        props.onLogin(credentials);
        clearState()
    }

    const onSignup = (ev = null) => {
        if (ev) ev.preventDefault();
        if (!credentials.username || !credentials.password || !credentials.fullname) return;
        props.onSignup(credentials);
        clearState()
    }

    const toggleSignup = () => {
        setIsSignup(!isSignup)
    }
    const onUploaded = (imgUrl) => {
        setCredentials({ ...credentials, imgUrl });
    }



    return (

        <div className="login-signup">
        <GrClose className='close-btn' onClick={()=>props.toggleIsInSignup(false)}/>
            {!isSignup && <form className="login-form" onSubmit={onLogin}>
                <h1>Log In to continue</h1>
                <input
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button>Log in</button>
            </form>
            }
            {isSignup && <form className="signup-form" onSubmit={onSignup}>
            <h1>Sign up to UpBeat</h1>

                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Fullname"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                {credentials.imgUrl&&<img src={credentials.imgUrl}></img>}
                <ImgUploader display={'Upload profile picture'} onUploaded={onUploaded} />
                <button >Sign up</button>
            </form>
            }
            <p className='splitter'>OR</p>
            <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Sign up' : 'Log in'}</button>
        </div >
    )
}
