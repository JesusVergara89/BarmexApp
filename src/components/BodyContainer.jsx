import React, { useState } from 'react'
import '../styles/BodyContainer.css'
import ManuallyData from './ManuallyData'

const BodyContainer = () => {

  return (
    <article className="body-container">
        <div className="calculator">
            <ManuallyData/>
        </div>
        <div className="information">

        </div>
    </article>
  )
}

export default BodyContainer