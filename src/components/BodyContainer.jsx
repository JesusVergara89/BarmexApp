import React, { useState } from 'react'
import '../styles/BodyContainer.css'
import ManuallyData from './ManuallyData'
import Instructions from './Instructions'

const BodyContainer = () => {

  return (
    <article className="body-container">
      <div className="calculator">
        <ManuallyData />
      </div>
      <div className="information">
        <Instructions />
      </div>
    </article>
  )
}

export default BodyContainer