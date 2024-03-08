import React from 'react'
import '../styles/BodyContainer.css'
import CameraComponent from './CameraComponent'

const BodyContainer = () => {
  return (
    <article className="body-container">
        <div className="calculator">
            <CameraComponent/>

        </div>
        <div className="information">

        </div>
    </article>
  )
}

export default BodyContainer