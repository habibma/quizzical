import {decode} from 'html-entities';

const Questions = (props) => {

    const questionFace = props.questions.map(question => {
        return (
            <li key={question.id} id={question.id} className='query'>
                <h3 className='question-face'>
                { decode(question.question) }
                </h3>
                <form className='options'>
                { question.options.map((obj, index) => {

                    let styles;
                    if (props.quizzical) {
                        if (obj.option === question.answer){
                            styles = {
                                backgroundColor: "#94D7A2",
                                color: "black",
                                opacity: "1",
                                borderColor: "#94D7A2"
                            }
                        }
                        if (obj.option !== question.answer && obj.option === question.selectedOption){
                            styles = {
                                backgroundColor: "#F8BCBC",
                                borderColor: "#F8BCBC"
                            }
                        }
                        if (obj.option === question.answer && obj.option !== question.selectedOption){
                            styles = {
                                backgroundColor: "#94D7A2",
                                borderColor: "#94D7A2"
                            }
                        }
                    }

                    return (
                        <div key={index}>
                            <input
                            type='radio'
                            name={`option-${question.id}`}
                            id={obj.id}
                            value={obj.option}
                            onChange={props.onChange}
                            checked={question.selectedOption === obj.option}
                            disabled={props.quizzical}
                            />
                            <label
                                htmlFor={obj.id}
                                className='option'
                                style={styles}
                            >
                            { decode(obj.option) }
                            </label>
                        </div>
                    )
                }) }
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