import React from 'react'
import { useCategories } from '../../context/CategoryContext.jsx'
import Input from '../../components/Input'
import Button from "../../components/Button"
import Footer from '../../components/Footer'

const Home = ({ questions, questionPage, category, loading, startQuiz, handleCategoryChange }) => {
    const { categories } = useCategories();
    
    // Filter to only enabled categories
    const enabledCategories = categories.filter(cat => cat.enabled);
    
    // Build category options dynamically from enabled categories
    const categoryOptions = enabledCategories.map(cat => (
        <Input
            className='subject'
            key={cat.id}
            type="radio"
            label={cat.name}
            name="category"
            id={cat.id}
            radioValue={String(cat.id)}
            value={category}
            onChange={handleCategoryChange}
        />
    ));
    
    const startPage = (
        <section className='start-page'>
            <p>Select a subject and click "Start Quiz"</p>
            <fieldset className='subjects'>
                <legend>Subjects</legend>
                {categoryOptions.length > 0 ? categoryOptions : <p className='info'>Loading subjects...</p>}
            </fieldset>
            {category === "" && <p className='error'>Please select a subject to start the quiz!</p>}
            <Button disabled={category === ""} onClick={startQuiz} text={loading ? "Loading..." : "Start Quiz"} />
        </section>
    );

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