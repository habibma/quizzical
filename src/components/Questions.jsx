import {decode} from 'html-entities';

const Question = (props) => {
    let styles;
    if (props.quizzical) {
        if (props.option === props.answer){
            styles = {
                backgroundColor: "#94D7A2",
                color: "black",
                opacity: "1",
                borderColor: "#94D7A2"
            }
        }
        if (props.option !== props.answer && props.option === props.selectedOption){
            styles = {
                backgroundColor: "#F8BCBC",
                borderColor: "#F8BCBC"
            }
        }
        if (props.option === props.answer && props.option !== props.selectedOption){
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
            name={`option-${props.questionId}`}
            id={props.id}
            value={props.option}
            onChange={props.onChange}
            checked={props.selectedOption === props.option}
            disabled={props.quizzical}
            />
            <label
                htmlFor={props.id}
                className='option'
                style={styles}
            >
            { decode(props.option) }
            </label>
        </div>
    )
}

const Questions = (props) => {

    const questionFace = props.questions.map(question => {
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
                                onChange={props.onChange}
                                quizzical={props.quizzical}
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