import { decode } from 'html-entities';

import './Quiz.css';

const Options = ({ id, questionId, option, selectedOption, answer, onChange, isQuizFinished }) => {

    let answerClass = '';
    if (isQuizFinished) {
        if (option === answer) {
            answerClass = 'option--correct';
        }
        if (option !== answer && option === selectedOption) {
            answerClass = 'option--incorrect';
        }
    }

    return (
        <div>
            <input
                type='radio'
                name={`option-${questionId}`}
                id={id}
                value={option}
                onChange={onChange}
                checked={selectedOption === option}
                disabled={isQuizFinished}
            />
            <label
                htmlFor={id}
                className={`option ${answerClass}`}
            >
                {decode(option)}
            </label>
        </div>
    )
}

const Questionnaire = ({ questions, onChange, isQuizFinished, answers }) => {

    const questionnaire = questions.map((question, index) => {

        const answerMap = Object.fromEntries(answers.map(answer => [answer.questionId, answer.answer]));
        const selectedOption = answerMap[question.id];
        return (
            <li key={question.id} id={question.id} className='question-item'>
                <h3 className='question-text' id={`question-${question.id}`}>
                    <span className='question-number'>Question {index + 1}</span>
                    {decode(question.question)}
                </h3>
                <fieldset className='options' aria-labelledby={`question-${question.id}`}>
                    <legend className='sr-only'>Answer options</legend>
                    {question.options.map((option, index) => {
                        return (
                            <Options
                                key={`${question.id}-${index}`}
                                id={`${question.id}-${index}`}
                                questionId={question.id}
                                option={option}
                                answer={question.answer}
                                selectedOption={selectedOption}
                                onChange={() => onChange(question.id, option)}
                                isQuizFinished={isQuizFinished}
                            />
                        )
                    })}
                </fieldset>
            </li>
        )
    });

    return (
        <ul className='questionnaire'>
            {questionnaire}
        </ul>)
}

export default Questionnaire;