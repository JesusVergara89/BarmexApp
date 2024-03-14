import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom'

const Header = ({ logInLogOut, setLogInLogOut }) => {

  const funtionLogout = () => {
    setLogInLogOut(true)
  }

  return (
    <header>
      <h1>BARMEX CALCULATOR</h1>
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