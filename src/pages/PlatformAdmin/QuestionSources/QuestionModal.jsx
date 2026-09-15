import { useEffect, useState } from 'react'
import Modal from '../../../components/ui/Modal'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'

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
        <Modal isOpen={isOpen} onClose={handleClose} title="Question Details">
            <header className='modal-header'>
                <h2>{isEditing ? 'Edit Question' : 'Add Question'}</h2>
            </header>
            <main className='modal-main'>
                <form className='modal-form' onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        id="question"
                        name="question"
                        label="Question"
                        value={questionData.question}
                        onChange={handleInputChange}
                    />
                    <fieldset className='modal-radio-group'>
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
                            className='modal-radio'
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
                        <div className='modal-multiple-choice'>
                            <div className='modal-multiple-choice-option'>
                                {questionData.options.map((option, index) => (
                                    <div key={index} className='modal-option'>
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
                                            label="Correct"
                                            radioValue={index}
                                            value={questionData.correctOption}
                                            onChange={() => handleCorrectOptionChange(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {validationError && <p className="question-validation-error" role="alert">{validationError}</p>}
                    <div className="modal-actions">
                        <Button className='btn-secondary' type="button" text="Cancel" onClick={handleClose} />
                    <Button
                        className='modal-btn'
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
