import React from 'react'
import '../styles/Header.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ logInLogOut, setLogInLogOut }) => {

  const funtionLogout = () => {
    setLogInLogOut(true)
  }

  const navigate = useNavigate()

  const ToHome = () => navigate("/")

  return (
    <header>
      <h1 onClick={ToHome}>BARMEX CALCULATOR</h1>
      <div className="header-login">
        {logInLogOut ?
          <Link className='To-Comments' to='/comments'>{logInLogOut ? "Login" : "Logout"}</Link>
          :
          <Link onClick={funtionLogout} className='To-Comments' to='/'>{logInLogOut ? "Login" : "Logout"}</Link>
        }
      </div>
    </header>
  )
}

export default Header