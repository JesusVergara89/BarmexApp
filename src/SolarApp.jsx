import React from 'react'
import Header from './components/Header'
import Presentation from './components/Presentation'
import BodyContainer from './components/BodyContainer'
import Footer from './components/Footer'

function SolarApp() {
  return (
    <div className="SolarApp">
      <Header />
      <Presentation />
      <BodyContainer/>
      <Footer/>
    </div>
  )
}

export default SolarApp