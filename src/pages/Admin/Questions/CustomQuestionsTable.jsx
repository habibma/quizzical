import Button from '../../../components/Button';
import EditIcon from '../../../assets/icons/EditIcon';
import DeleteIcon from '../../../assets/icons/DeleteIcon';

const CustomQuestionsTable = ({ customQuestions, openModal, deleteQuestion }) => {

  return (
    <table className='questions-table'>
            <thead>
              <tr>
                <th>Custom Question</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customQuestions.map((question) => (
                <tr key={question.id}>
                  <td>{question.question}</td>
                  <td className='actions'>
                    <Button className='btn-secondary action-btn' text={<EditIcon />} onClick={() => openModal(question)} />
                    <Button className='btn-danger action-btn' text={<DeleteIcon />} onClick={() => deleteQuestion(question.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  );
};

export default CustomQuestionsTable;
