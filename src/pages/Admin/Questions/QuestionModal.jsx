import { useEffect, useState } from 'react'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import './QuestionModal.css'

const QuestionModal = ({ handleSaveQuestion, isOpen, onClose }) => {

    const initialQuestionData = {
        id: null,
        question: '',
        type: 'multiple',
        options: ['', '', '', ''],
        correctOption: null,
    };
    const [questionData, setQuestionData] = useState(initialQuestionData);

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
        handleSaveQuestion(questionData);
        setQuestionData(initialQuestionData);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Question Details">
            <header className='modal-header'>
                <h2>Question Details</h2>
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
                    <Button className='modal-btn' type="submit" text="Save Question" />
                </form>
            </main>
        </Modal>
    )
};

export default QuestionModal;
