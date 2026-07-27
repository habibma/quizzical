// This context is used to manage question in Admin page

import { useState, useContext, createContext } from 'react';
import { getQuestions } from '../../services/triviaService';
import { getCategoryQuestionsCount } from '../../services/triviaService';


const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {

    const [questions, setQuestions] = useState([]);
    const [customQuestions, setCustomQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countByCategory, setCountByCategory] = useState({});

    const fetchQuestions = async (cate, type, diff) => {
        const options = {
            amount: 10, // fetch 10 questions at a time for now, can be changed later when pagination is implemented
            category: cate,
            difficulty: diff,
            type: type,
        };
        setLoading(true);
        setError(null);
        try {
            const fetchedQuestions = await getQuestions(options);
            setQuestions(fetchedQuestions);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestionsCountByCategory = async (categoryId) => {
        setError(null);
        if (countByCategory[categoryId]) {
            return countByCategory[categoryId];
        }
        try {
            const count = await getCategoryQuestionsCount(categoryId);
            setCountByCategory(prev => ({ ...prev, [categoryId]: count }));
            return count;
        } catch (err) {
            setError(err.message);
        }
    };

    const addQuestion = (question) => {
        setCustomQuestions(prevQuestions => [...prevQuestions, question]);
    };
    const deleteQuestion = (id) => {
        setCustomQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
    };
    const updateQuestion = (updatedQuestion) => {
        setCustomQuestions(prevQuestions => prevQuestions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    };

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
                fetchQuestionsCountByCategory,
                countByCategory,
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
