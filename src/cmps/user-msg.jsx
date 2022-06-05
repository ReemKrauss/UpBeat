import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setUserMsg } from '../store/actions/user.actions.js'

export const UserMsg = ({ userMsg }) => {
    const dispatch = useDispatch()

    let timeOutId = useRef(null)

    useEffect(() => {
        if (timeOutId.current) clearTimeout(timeOutId.current)
        timeOutId.current = setTimeout(onCloseMsg, 3000)
        return () => { if (timeOutId.current) clearTimeout(timeOutId.current) }
    }, [userMsg])


    const onCloseMsg = () => {
        clearTimeout(timeOutId.current)
        dispatch(setUserMsg(null, null))
    }



    if (!userMsg.msg) return null
    return (
        <div className={`user-msg ${userMsg.type}`}>
            <span>{userMsg.msg}</span>
        </div>
        )


}
