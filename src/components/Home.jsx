import React from 'react'
import Presentation from './Presentation'
import BodyContainer from './BodyContainer'
import Footer from './Footer'
import '../styles/Home.css'

const Home = () => {
    return (
        <article className="Home">
            <Presentation />
            <BodyContainer />
            <Footer />
        </article>
    )
}

export default Home