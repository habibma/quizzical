
export function adaptTriviaApiQuestions(data) {
    return data.map(question => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
        question: question.question.text,
        answer: question.correctAnswer,
        options: [
            ...question.incorrectAnswers,
            question.correctAnswer
        ]
    }));
}

export function adaptTriviaApiCategories(data) {
    return Object.entries(data).map(([key, value]) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
        name: key,
    }));
}