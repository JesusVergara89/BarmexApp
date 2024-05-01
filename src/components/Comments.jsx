import React, { useState } from 'react'
import '../styles/Comments.css'
import Login from './Login'
import Listcomments from './Listcomments'

const Comments = ({ setLogInLogOut }) => {

    const [loginSuccess, setLoginSuccess] = useState(false)

    const success = () => {
        setLoginSuccess(true)
        setLogInLogOut(false)
    }

    return (
        <article className="comments">

            {loginSuccess ?

                <Listcomments/>

                :

                <Login success={success} />

            }

        </article>
    )
}

export default Comments