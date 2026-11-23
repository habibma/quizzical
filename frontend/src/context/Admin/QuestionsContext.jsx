import { useState, useContext, createContext, useEffect } from 'react';
import { getQuestions } from '../../services/questionService.js';
import { getCategories } from '../../services/categoryService.js';
import { useApi } from './ApiContext';

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {

    const [questions, setQuestions] = useState([]);
    const [customQuestions, setCustomQuestions] = useState(() => {
        try {
            const storedQuestions = localStorage.getItem('customQuestions');
            return storedQuestions ? JSON.parse(storedQuestions) : [];
        } catch {
            return [];
        }
    });
    const [visibilityMap, setVisibilityMap] = useState(() => {
        try {
            const storedVisibility = localStorage.getItem('questionVisibility');
            return storedVisibility ? JSON.parse(storedVisibility) : {};
        } catch {
            return {};
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countByCategory, setCountByCategory] = useState({});

    const fetchQuestions = async (repository, params) => {
        setLoading(true);
        setError(null);

        try {
            const fetchedQuestions = await getQuestions(repository, params);
            setQuestions(fetchedQuestions);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async (repository) => {
        setLoading(true);
        setError(null);

        try {
            const categories = await getCategories(repository);
            return categories;
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    /*
    const fetchQuestionsCountByCategory = async (categoryId) => {
        setError(null);
        if (countByCategory[categoryId]) {
            return countByCategory[categoryId];
        }
        try {
            const count = await getCategoryQuestionsCount(defaultApi, categoryId);
            setCountByCategory(prev => ({ ...prev, [categoryId]: count }));
            return count;
        } catch (err) {
            setError(err.message);
        }
    };
    */

    const addQuestion = (question) => {
        setCustomQuestions(prevQuestions => [...prevQuestions, { ...question, id: Date.now().toString() }]);
    };
    const deleteQuestion = (id) => {
        setCustomQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
    };
    const updateQuestion = (updatedQuestion) => {
        setCustomQuestions(prevQuestions => prevQuestions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    };

    const deleteQuestions = (ids) => {
        setCustomQuestions(prevQuestions => prevQuestions.filter(question => !ids.includes(question.id)));
    };

    const setQuestionVisibility = (ids, isVisible) => {
        setVisibilityMap(prevVisibility => ids.reduce((nextVisibility, id) => ({
            ...nextVisibility,
            [id]: isVisible,
        }), prevVisibility));
    };

    useEffect(() => {
        localStorage.setItem('customQuestions', JSON.stringify(customQuestions));
    }, [customQuestions]);

    useEffect(() => {
        localStorage.setItem('questionVisibility', JSON.stringify(visibilityMap));
    }, [visibilityMap]);

    return (
        <QuestionsContext.Provider
            value={{
                questions,
                loading,
                error,
                fetchQuestions,
                customQuestions,
                addQuestion,
                updateQuestion,
                deleteQuestion,
                deleteQuestions,
                visibilityMap,
                setQuestionVisibility,
                fetchCategories,
            }}
        >
            {children}
        </QuestionsContext.Provider>
    );
};

export function useQuestions() {
    const context = useContext(QuestionsContext);

    if (!context) {
        throw new Error('useQuestions must be used within a QuestionsProvider');
    }
    return context;
}
