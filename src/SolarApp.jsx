import React, { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Comments from './components/Comments'
import Home from './components/Home'

function SolarApp() {
  const [logInLogOut, setLogInLogOut] = useState(true)
  return (
    <div className="SolarApp">
      Hola soy jesus en mac
      <Header logInLogOut={logInLogOut} setLogInLogOut={setLogInLogOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comments" element={<Comments setLogInLogOut={setLogInLogOut} />} />
      </Routes>
    </div>
  )
}

export default SolarApp