import { useEffect, useState } from 'react'
import Modal from '../../../components/ui/Modal'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button/Button'

import './QuestionModal.css'

const INITIAL_QUESTION_DATA = {
    id: null,
    question: '',
    type: 'multiple',
    options: ['', '', '', ''],
    correctOption: null,
};

const QuestionModal = ({ handleSaveQuestion, isOpen, onClose, isEditing, question }) => {

    const [questionData, setQuestionData] = useState(INITIAL_QUESTION_DATA);
    const [validationError, setValidationError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...questionData.options];
        newOptions[index] = value;
        setQuestionData(prevData => ({
            ...prevData,
            options: newOptions
        }));
    };

    const handleCorrectOptionChange = (index) => {
        setQuestionData(prevData => ({
            ...prevData,
            correctOption: index
        }));
    }

    const toggleQuestionType = (e) => {
        setQuestionData(prevData => ({
            ...prevData,
            type: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const questionText = questionData.question.trim();
        const options = questionData.options.map((option) => option.trim());

        if (!questionText) {
            setValidationError('Enter the question text.');
            return;
        }

        if (questionData.type === 'multiple' && (options.some((option) => !option) || questionData.correctOption === null)) {
            setValidationError('Complete every answer option and select the correct answer.');
            return;
        }

        setValidationError('');
        handleSaveQuestion({ ...questionData, question: questionText, options });
        setQuestionData(INITIAL_QUESTION_DATA);
        onClose();
    }

    const handleClose = () => {
        setQuestionData(INITIAL_QUESTION_DATA);
        setValidationError('');
        onClose();
    }

    useEffect(() => {
        if (isEditing && question) {
            setQuestionData(question);
        }
        else {
            setQuestionData(INITIAL_QUESTION_DATA);
        }
    }, [isEditing, question]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            customClass="question-modal"
            title={isEditing ? 'Edit Question' : 'Add Question'}
        >
            <main className='question-modal-main'>
                <form className='question-modal-form' onSubmit={handleSubmit}>
                    <fieldset className='question-modal-fieldset'>
                        <legend>Question Details</legend>
                        <Input
                            type="text"
                            id="question"
                            name="question"
                            label="Question"
                            value={questionData.question}
                            onChange={handleInputChange}
                        />
                    </fieldset>
                    <fieldset className='question-modal-radio-group'>
                        <legend>Question Type</legend>
                        <Input
                            type="radio"
                            id="type-multiple"
                            name="type"
                            label="Multiple Choice"
                            radioValue="multiple"
                            value={questionData.type}
                            onChange={toggleQuestionType}
                        />
                        <Input
                            type="radio"
                            id="type-boolean"
                            name="type"
                            label="True-False"
                            radioValue="boolean"
                            value={questionData.type}
                            onChange={toggleQuestionType}
                        />
                    </fieldset>
                    {questionData.type === 'multiple' ? (
                    <fieldset className='question-modal-fieldset'>
                        <legend>Answer Options</legend>
                        <div className='question-modal-multiple-choice'>
                            <div className='question-modal-options'>
                                {questionData.options.map((option, index) => (
                                    <div key={index} className='question-modal-option'>
                                        <Input
                                            type="text"
                                            id={`option-${index}`}
                                            name={`option-${index}`}
                                            label={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                        />
                                        <Input
                                            type="radio"
                                            id={`correct-option-${index}`}
                                            name="correctOption"
                                            label="Correct answer"
                                            radioValue={index}
                                            value={questionData.correctOption}
                                            onChange={() => handleCorrectOptionChange(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </fieldset>
                    ) : (
                        <p className="question-modal-help">True-False questions use the standard True and False answers.</p>
                    )}
                    {validationError && <p className="question-validation-error" role="alert">{validationError}</p>}
                    <div className="question-modal-actions">
                        <Button className='btn-secondary' type="button" text="Cancel" onClick={handleClose} />
                    <Button
                        className='question-modal-submit'
                        type="submit"
                        text={isEditing ? 'Update Question' : 'Add Question'}
                    />
                    </div>
                </form>
            </main>
        </Modal>
    )
};

export default QuestionModal;
