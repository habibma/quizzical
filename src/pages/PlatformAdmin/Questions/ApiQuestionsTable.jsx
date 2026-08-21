import VisibleIcon from '../../../assets/icons/VisibleIcon'
import InvisibleIcon from '../../../assets/icons/InvisibleIcon';
import Button from '../../../components/ui/Button';
import QuestionInsightBox from './QuestionInsight';

const ApiQuestionsTable = ({ questions, onToggleVisibility, isVisible, loading, error, questionInsightBox }) => {

    return (
        <table className='questions-table'>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="2">Loading...</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="2">Error: {error}</td>
                    </tr>
                ) : questions.length === 0 ? (
                    <tr>
                        <td colSpan="2">No questions found.</td>
                    </tr>
                ) :
                    (
                        questions.map((question) => (
                            <tr key={question.id}>
                                <td>{question.question}</td>
                                <td className='actions'>
                                    {isVisible(question.id) ? (
                                        <Button
                                            className='action-btn'
                                            text={<VisibleIcon />}
                                            onClick={() => onToggleVisibility(question.id)}
                                        />
                                    ) : (
                                        <Button
                                            className='action-btn'
                                            text={<InvisibleIcon />}
                                            onClick={() => onToggleVisibility(question.id)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
            </tbody>
        </table>
    );
}

export default ApiQuestionsTable;