import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../../../context/Admin/CategoryContext.jsx'
import { useQuiz } from '../../../context/Public/QuizContext.jsx'
import { useSettings } from '../../../context/Admin/SettingsContext.jsx'
import Input from '../../../components/Input'
import Button from "../../../components/Button"
import Footer from '../../../components/Footer'

import Quiz from '../Quiz/Quiz.jsx'

import './Home.css'

const Home = () => {

    const { categoriesByRepository } = useCategories();
    const { questions, answers, score, loading, error, fetchQuestions, selectAnswer, checkAnswers, resetQuiz } = useQuiz();
    const { settings } = useSettings();
    const navigate = useNavigate();

    const [category, setCategory] = useState("");

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }
    // Filter to only enabled categories
    const allEnabledCategories = Object.values(categoriesByRepository).flat().filter(category => category.enabled);
    // Build category options dynamically from enabled categories
    const categoryOptions = allEnabledCategories.map(cat => (
        <Input
            className='subject'
            key={cat.id}
            type="radio"
            label={cat.displayName}
            name="category"
            id={cat.id}
            radioValue={String(cat.id)}
            value={category}
            onChange={handleCategoryChange}
        />
    ));

    const startQuiz = () => {
        fetchQuestions({ amount: settings.numQuestions, category, difficulty: settings.difficulty, type: settings.questionType });
        navigate('/quiz');
    }

    return (
        <div className='container'>
            <section className='start-page'>
                <p>Select a subject and click "Start Quiz"</p>
                <fieldset className='subjects'>
                    <legend>Subjects</legend>
                    {categoryOptions.length > 0 ? categoryOptions : <p className='info'>Loading subjects...</p>}
                </fieldset>
                {category === "" && <p className='error'>Please select a subject to start the quiz!</p>}
                <Button disabled={category === ""} onClick={startQuiz} text={loading ? "Loading..." : "Start Quiz"} />
            </section>
        </div>
    )
}

export default Home