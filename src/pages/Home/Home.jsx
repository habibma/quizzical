import React from 'react'
import Footer from '../../components/Footer'

const Home = ({ questions, questionPage, startPage }) => {
    return (
        <div className='container'>
            {questions.length > 0 ?
                questionPage
                :
                startPage
            }
        </div>
    )
}

export default Home