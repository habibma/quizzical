import Button from '../../../components/ui/Button/Button';
import EditIcon from '../../../assets/icons/EditIcon';
import DeleteIcon from '../../../assets/icons/DeleteIcon';

const CustomQuestionsTable = ({ customQuestions, onEdit, onDelete, selectedIds, onSelect }) => {
  const allSelected = customQuestions.length > 0 && customQuestions.every((question) => selectedIds.includes(String(question.id)));

  return (
    <table className='questions-table'>
      <thead>
        <tr>
          <th className="question-select-column">
            <input
              type="checkbox"
              aria-label="Select all custom questions"
              checked={allSelected}
              onChange={(event) => onSelect(customQuestions.map((question) => String(question.id)), event.target.checked)}
            />
          </th>
          <th>Custom Question</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customQuestions.length === 0 ? (
          <tr>
            <td colSpan="4"><div className="question-state question-state--empty"><p>No custom questions available.</p></div></td>
          </tr>
        ) : (
          customQuestions.map((question) => (
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
                <Button className='btn-secondary action-btn' text={<EditIcon />} onClick={() => onEdit(question)} title="Edit question" aria-label="Edit question" />
                <Button className='btn-danger action-btn' text={<DeleteIcon />} onClick={() => onDelete(question)} title="Delete question" aria-label="Delete question" />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CustomQuestionsTable;
