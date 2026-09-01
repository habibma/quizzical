import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../context/Admin/CategoryContext";
import { useQuiz } from "../../../context/Public/QuizContext";
import { useSettings } from "../../../context/Admin/SettingsContext";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import "./CustomQuiz.css";

const CustomQuiz = () => {
    const { categoriesByRepository } = useCategories();
    const { loading, fetchQuestions } = useQuiz();
    const { settings } = useSettings();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [quizSettings, setQuizSettings] = useState({
        numberOfQuestions: settings.numQuestions,
        difficulty: settings.difficulty,
        questionType: settings.questionType,
    });

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

    const handleSettingChange = (e) => {
        const { name, value } = e.target;

        setQuizSettings(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const startQuiz = () => {
        if (!selectedCategory) return;

        fetchQuestions({
            repoId: selectedCategory.repositoryId,
            amount: Number(quizSettings.numberOfQuestions),
            category: selectedCategory.id,
            difficulty: quizSettings.difficulty,
            type: quizSettings.questionType,
        });

        navigate('/quiz');
    };

    return (
        <div className="container">
            <section className="custom-quiz">

                <div className="quiz-builder">

                    {/* STEP 1 */}
                    <div className="quiz-section">
                        <div className="section-title">
                            <span className="number">1</span>
                            <div>
                                <h2>Choose a Subject</h2>
                                <p>Select what you want to be tested on.</p>
                            </div>
                        </div>

                        <div className="subjects">
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
                        </div>
                    </div>


                    {/* STEP 2 */}
                    <div className="quiz-section">
                        <div className="section-title">
                            <span className="number">2</span>
                            <div>
                                <h2>Quiz Settings</h2>
                                <p>Customize your challenge.</p>
                            </div>
                        </div>

                        <div className="quiz-settings">

                            <Input
                                type="number"
                                label="Number of Questions"
                                name="numberOfQuestions"
                                value={quizSettings.numberOfQuestions}
                                onChange={handleSettingChange}
                                min={1}
                                max={100}
                            />

                            <Input
                                as="select"
                                label="Difficulty"
                                name="difficulty"
                                value={quizSettings.difficulty}
                                onChange={handleSettingChange}
                                options={[
                                    { value: "any", label: "Any Difficulty" },
                                    { value: "easy", label: "Easy" },
                                    { value: "medium", label: "Medium" },
                                    { value: "hard", label: "Hard" },
                                ]}
                            />

                            <Input
                                as="select"
                                label="Question Type"
                                name="questionType"
                                value={quizSettings.questionType}
                                onChange={handleSettingChange}
                                options={[
                                    { value: "any", label: "Any Type" },
                                    { value: "multiple", label: "Multiple Choice" },
                                    { value: "boolean", label: "True / False" },
                                ]}
                            />

                        </div>
                    </div>


                    {/* ACTION */}
                    <div className="quiz-action">
                        {!selectedCategory && (
                            <p className="error">
                                Select a subject to start your quiz.
                            </p>
                        )}

                        <Button
                            disabled={!selectedCategory || loading}
                            onClick={startQuiz}
                            text={loading ? "Loading Quiz..." : "Start Quiz →"}
                        />
                    </div>

                </div>
            </section>
        </div>
    );
};

export default CustomQuiz;