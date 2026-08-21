import Button from '../../../components/ui/Button';
import EditIcon from '../../../assets/icons/EditIcon';
import DeleteIcon from '../../../assets/icons/DeleteIcon';

const CustomQuestionsTable = ({ customQuestions, onEdit, deleteQuestion }) => {

  return (
    <table className='questions-table'>
      <thead>
        <tr>
          <th>Custom Question</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customQuestions.length === 0 ? (
          <tr>
            <td colSpan="2">No custom questions available.</td>
          </tr>
        ) : (
          customQuestions.map((question) => (
            <tr key={question.id}>
              <td>{question.question}</td>
              <td className='actions'>
                <Button className='btn-secondary action-btn' text={<EditIcon />} onClick={() => onEdit(question)} />
                <Button className='btn-danger action-btn' text={<DeleteIcon />} onClick={() => deleteQuestion(question.id)} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CustomQuestionsTable;
