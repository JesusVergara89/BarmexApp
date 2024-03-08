import React from 'react'
import Header from './components/Header'
import Presentation from './components/Presentation'
import BodyContainer from './components/BodyContainer'

function SolarApp() {
  return (
    <div className="SolarApp">
      <Header />
      <Presentation />
      <BodyContainer/>
    </div>
  )
}

export default SolarApp