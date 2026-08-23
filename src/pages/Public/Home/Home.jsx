import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCategories } from '../../../context/Admin/CategoryContext.jsx';
import { useQuiz } from '../../../context/Public/QuizContext.jsx';
import { useSettings } from '../../../context/Admin/SettingsContext.jsx';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import './Home.css';


const Home = () => {

    const { categoriesByRepository } = useCategories();

    const { loading, fetchQuestions } = useQuiz();

    const { settings } = useSettings();

    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(null);


    const allEnabledCategories = Object.entries(categoriesByRepository)
        .flatMap(([repositoryId, categories]) =>
            categories
                .filter(category => category.enabled)
                .map(category => ({
                    ...category,
                    repositoryId,
                }))
        );


    const handleCategoryChange = (e) => {

        const selected = allEnabledCategories.find(
            category => String(category.id) === e.target.value
        );

        setSelectedCategory(selected ?? null);
    };


    const startQuiz = () => {

        if (!selectedCategory) return;

        fetchQuestions({
            repoId: selectedCategory.repositoryId,
            amount: settings.numQuestions,
            category: selectedCategory.id,
            difficulty: settings.difficulty,
            type: settings.questionType,
        });

        navigate('/quiz');
    };


    return (
        <div className="container">

            <section className="start-page">

                <p>Select a subject and click "Start Quiz"</p>

                <fieldset className="subjects">

                    <legend>Subjects</legend>

                    {allEnabledCategories.length > 0 ? (
                        allEnabledCategories.map(category => (
                            <Input
                                className="subject"
                                key={`${category.repositoryId}-${category.id}`}
                                type="radio"
                                label={category.displayName}
                                name="category"
                                id={`${category.repositoryId}-${category.id}`}
                                radioValue={String(category.id)}
                                value={selectedCategory?.id ?? ""}
                                onChange={handleCategoryChange}
                            />
                        ))
                    ) : (
                        <p className="info">
                            No categories available.
                        </p>
                    )}

                </fieldset>

                {!selectedCategory && (
                    <p className="error">
                        Please select a subject to start the quiz!
                    </p>
                )}

                <Button
                    disabled={!selectedCategory || loading}
                    onClick={startQuiz}
                    text={loading ? "Loading..." : "Start Quiz"}
                />

            </section>

        </div>
    );
};

export default Home;