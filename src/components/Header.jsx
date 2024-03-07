import React from 'react'
import '../styles/Header.css'

const Header = () => {
  return (
    <header>
        <h1>BARMEX CALCULATOR</h1>
        <div className="header-social">
        <i className='bx bxl-instagram'></i>
        <i className='bx bxl-facebook' ></i>
        <i className='bx bxl-twitter' ></i>
        </div>
    </header>
  )
}

export default Header