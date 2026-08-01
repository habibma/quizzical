import { decode } from 'html-entities';

import './Quiz.css';

const Options = ({ id, questionId, option, selectedOption, answer, onChange, isQuizFinished }) => {

    let styles;
    if (isQuizFinished) {
        if (option === answer) {
            styles = {
                backgroundColor: "#94D7A2",
                color: "#20349b",
                opacity: "1",
                borderColor: "#94D7A2"
            }
        }
        if (option !== answer && option === selectedOption) {
            styles = {
                backgroundColor: "#F8BCBC",
                color: "#20349b",
                borderColor: "#F8BCBC"
            }
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
                className='option'
                style={styles}
            >
                {decode(option)}
            </label>
        </div>
    )
}

const Questionnaire = ({ questions, onChange, isQuizFinished, answers }) => {

    const questionnaire = questions.map(question => {

        const answerMap = Object.fromEntries(answers.map(answer => [answer.questionId, answer.answer]));
        const selectedOption = answerMap[question.id];
        return (
            <li key={question.id} id={question.id} className='question-item'>
                <h3 className='question-text'>
                    {decode(question.question)}
                </h3>
                <fieldset className='options'>
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
        <ul>
            {questionnaire}
        </ul>)
}

export default Questionnaire;