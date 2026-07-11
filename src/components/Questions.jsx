import {decode} from 'html-entities';

const Question = ({ id, questionId, option, answer, selectedOption, onChange, quizzical }) => {
    let styles;
    if (quizzical) {
        if (option === answer){
            styles = {
                backgroundColor: "#94D7A2",
                color: "black",
                opacity: "1",
                borderColor: "#94D7A2"
            }
        }
        if (option !== answer && option === selectedOption){
            styles = {
                backgroundColor: "#F8BCBC",
                borderColor: "#F8BCBC"
            }
        }
        if (option === answer && option !== selectedOption){
            styles = {
                backgroundColor: "#94D7A2",
                borderColor: "#94D7A2"
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
            disabled={quizzical}
            />
            <label
                htmlFor={id}
                className='option'
                style={styles}
            >
            { decode(option) }
            </label>
        </div>
    )
}

const Questions = ({ questions, onChange, quizzical }) => {

    const questionFace = questions.map(question => {
        return (
            <li key={question.id} id={question.id} className='query'>
                <h3 className='question-face'>
                { decode(question.question) }
                </h3>
                <form className='options'>
                    {question.options.map((option, index) => {
                        return (
                            <Question
                                key={`${question.id}-${index}`}
                                id={`${question.id}-${index}`}
                                questionId={question.id}
                                option={option}
                                answer={question.answer}
                                selectedOption={question.selectedOption}
                                onChange={onChange}
                                quizzical={quizzical}
                            />
                        )
                    })}
                </form>
            </li>
        )
    });

    return (
        <>
            <ul>
                {questionFace}
            </ul>
        </>
    )
}

export default Questions;