import React, { useState } from 'react'
import '../styles/BodyContainer.css'
import CameraComponent from './CameraComponent'
import ManuallyData from './ManuallyData'

const BodyContainer = () => {

  const [manually, setManually] = useState(false)

  const manuallyFunction = () => {
    setManually(!manually)
  }
  return (
    <article className="body-container">
        <div className="calculator">
          <button onClick={manuallyFunction}>change</button>
           {manually ?
            <CameraComponent/>
            :
            <ManuallyData/>}
        </div>
        <div className="information">

        </div>
    </article>
  )
}

export default BodyContainer