import React, { useState } from 'react'
import './RegisterAuth.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'

const RegisterAuth = ({ auth, createOrSignIn }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [show, setShow] = useState(false)

    const handleSingUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, { displayName: name })
            
        } catch (error) {
            toast(error.code, { type: "error" })
        }
    }

    const showPassword = () => setShow(!show)
    return (
        <article className="form-register-main">
            <div className="form-register-form">
                <h2 className="form-register-register">Register</h2>
                <input
                    type="text"
                    className='form-register-name'
                    placeholder='Enter your name'
                    onChange={(e) => { setName(e.target.value) }}
                />
                <input
                    type="text"
                    className='form-register-email'
                    placeholder='Enter your email'
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type={show ? "text" : "password"}
                    className='form-register-password'
                    placeholder='Password'
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <div onClick={showPassword} className="login-hiden">
                    {show ? <i className='bx bx-hide'></i> : <i className='bx bx-show'></i>}
                </div>
                <button onClick={handleSingUp} className="form-register-btn">Register</button>
            </div>
            <h3>Si tienes una cuenta accede</h3>
            <button onClick={createOrSignIn} className="form-register-btn">Sing in</button>
        </article>
    )
}

export default RegisterAuth