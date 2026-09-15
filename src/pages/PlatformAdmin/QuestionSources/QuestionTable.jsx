import VisibleIcon from '../../../assets/icons/VisibleIcon'
import InvisibleIcon from '../../../assets/icons/InvisibleIcon';
import Button from '../../../components/ui/Button';
import QuestionState from './QuestionState';

const ApiQuestionsTable = ({ questions, onToggleVisibility, isVisible, loading, error, selectedIds, onSelect, onRetry }) => {
    const allSelected = questions.length > 0 && questions.every((question) => selectedIds.includes(String(question.id)));

    return (
        <table className='questions-table'>
            <thead>
                <tr>
                    <th className="question-select-column">
                        <input
                            type="checkbox"
                            aria-label="Select all API questions"
                            checked={allSelected}
                            onChange={(event) => onSelect(questions.map((question) => String(question.id)), event.target.checked)}
                        />
                    </th>
                    <th>Question</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="4"><QuestionState type="loading" message="Loading questions..." /></td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="4"><QuestionState type="error" message={error} onRetry={onRetry} /></td>
                    </tr>
                ) : questions.length === 0 ? (
                    <tr>
                        <td colSpan="4"><QuestionState type="empty" message="No questions match the current search or filters." /></td>
                    </tr>
                ) :
                    (
                        questions.map((question) => (
                            <tr key={question.id}>
                                <td className="question-select-column">
                                    <input
                                        type="checkbox"
                                        aria-label={`Select ${question.question}`}
                                        checked={selectedIds.includes(String(question.id))}
                                        onChange={(event) => onSelect([String(question.id)], event.target.checked)}
                                    />
                                </td>
                                <td className="question-text" title={question.question}>{question.question}</td>
                                <td>{question.type === 'boolean' ? 'True / False' : 'Multiple Choice'}</td>
                                <td className='actions'>
                                    {isVisible(question.id) ? (
                                        <Button
                                            className='action-btn'
                                            text={<VisibleIcon />}
                                            onClick={() => onToggleVisibility(question.id)}
                                            title="Hide question"
                                            aria-label="Hide question"
                                        />
                                    ) : (
                                        <Button
                                            className='action-btn'
                                            text={<InvisibleIcon />}
                                            onClick={() => onToggleVisibility(question.id)}
                                            title="Show question"
                                            aria-label="Show question"
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