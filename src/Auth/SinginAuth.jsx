import React, { useState } from 'react'
import './SinginAuth.css'
import RegisterAuth from './RegisterAuth'
import UsersinginAuth from './UsersinginAuth'
import { auth } from '../FirebaseConfig'
import Formpost from './Formpost'

const SinginAuth = () => {

    const [singinout, setSinginout] = useState(false)
    const [Enter, setEnter] = useState(true)

    const createOrSignIn = () => setSinginout(!singinout)

    const authFunction = () => setEnter(false)
    const authFunction1 = () => setEnter(true)

    return (
        <article className="singin">
            {Enter ? (
                singinout ? (
                    <RegisterAuth auth={auth} createOrSignIn={createOrSignIn} />
                ) : (
                    <UsersinginAuth auth={auth} authFunction={authFunction} createOrSignIn={createOrSignIn} />
                )
            ) : (
                <Formpost authFunction1={authFunction1} />
            )}
        </article>
    )
}

export default SinginAuth
