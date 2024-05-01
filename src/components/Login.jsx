import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth1 } from '../FirebaseConfig'
import '../styles/Login.css'

const Login = ({ success }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth1, email, password)
      success(success)
    } catch (error) {
      toast(error.code, { type: "error" })
    }
  }
  const showPassword = () => setShow(!show)
  return (
    <article className="employee-login-main">
      <div className="employee-login-form">
        <h2 className="employee-login-register">Employee Login</h2>
        <input
          type="text"
          className='employee-login-email'
          placeholder='Enter your email'
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          type={show ? "text" : "password"}
          className='employee-login-password'
          placeholder='Password'
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <div onClick={showPassword} className="login-hiden">
          {show ? <i className='bx bx-hide'></i> : <i className='bx bx-show'></i>}
        </div>
        <button onClick={handleLogin} className="employee-login-btn">Login</button>
      </div>
    </article>
  )
}

export default Login