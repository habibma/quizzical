import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/Public/QuizContext.jsx';
import Button from "../../components/Button";
import "./Result.css"

const Result = () => {

    const { score, questions, resetQuiz } = useQuiz();

    const navigate = useNavigate();

    const backHome = () => {
        resetQuiz();
        navigate('/');
    }

    const playAgain = () => {
        resetQuiz();
        navigate('/');
    }

    return (
        <section className='result-page'>
            <h2>Quiz Results</h2>
            <p>You scored {score}/{questions.length} correct answers</p>
            <Button onClick={playAgain} text="Play again" />
            <Button onClick={backHome} text="Back to Home" />
        </section>
    )
}

export default Result
