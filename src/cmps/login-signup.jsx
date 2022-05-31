import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const user = await userService.getLoggedinUser()
        // catcherror
        if(!user) return
        setUsers(user)
    }


    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    const handleChange = ev => {
        const field = ev.target.name;
        const value = ev.target.value;
        console.log('handle',field,value)
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

        <div className="login-page">
            <div className='bg-blur'>
                {!isSignup && <form className="login-form" onSubmit={onLogin}>
                    <input
                        autoComplete="off"
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        // onChange={(e) => setUser(e.target.value)}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        // onChange={(e) => setPwd(e.target.value)}
                        onChange={handleChange}
                        required
                    />
                    <button>Login!</button>
                </form>

                }
                <p>
                    <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p>
                <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={onSignup}>
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
                        <ImgUploader onUploaded={onUploaded} />
                        <button >Signup!</button>
                    </form>}
                </div>
            </div>
        </div>
    )
}
