import { useState } from 'react'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import './QuestionModal.css'

const QuestionModal = ({ handleSaveQuestion, isOpen, onClose }) => {

    const [questionType, setQuestionType] = useState('multiple');

    const toggleQuestionType = (e) => {
        setQuestionType(e.target.value);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Question Details">
            <header className='modal-header'>
                <h2>Question Details</h2>
            </header>
            <main className='modal-main'>
                <form className='modal-form' onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const question = Object.fromEntries(formData);
                    handleSaveQuestion(question);
                }}>
                    <Input
                        type="text"
                        id="question"
                        name="question"
                        label="Question"
                    />
                    <fieldset className='modal-radio-group'>
                        <legend>Question Type</legend>
                        <Input
                            type="radio"
                            id="type-multiple"
                            name="type"
                            label="Multiple Choice"
                            radioValue="multiple"
                            value={questionType}
                            onChange={toggleQuestionType}
                        />
                        <Input
                            className='modal-radio'
                            type="radio"
                            id="type-boolean"
                            name="type"
                            label="True-False"
                            radioValue="boolean"
                            value={questionType}
                            onChange={toggleQuestionType}
                        />
                    </fieldset>
                    {questionType === 'multiple' ? (
                        <div className='modal-multiple-choice'>
                            <div className='modal-multiple-choice-option'>
                                <Input
                                    type="text"
                                    id="option1"
                                    name="option1"
                                    label="Option 1"
                                />
                                <Input
                                    className='modal-radio'
                                    type="radio"
                                    id="correct1"
                                    name="correct"
                                    label="Correct"
                                />
                            </div>
                            <div className='modal-multiple-choice-option'>
                                <Input
                                    type="text"
                                    id="option2"
                                    name="option2"
                                    label="Option 2"
                                />
                                <Input
                                    type="radio"
                                    id="correct2"
                                    name="correct"
                                    label="Correct"
                                />
                            </div>
                            <div className='modal-multiple-choice-option'>
                                <Input
                                    type="text"
                                    id="option3"
                                    name="option3"
                                    label="Option 3"
                                />
                                <Input
                                    type="radio"
                                    id="correct3"
                                    name="correct"
                                    label="Correct"
                                />
                            </div>
                            <div className='modal-multiple-choice-option'>
                                <Input
                                    type="text"
                                    id="option4"
                                    name="option4"
                                    label="Option 4"
                                />
                                <Input
                                    type="radio"
                                    id="correct4"
                                    name="correct"
                                    label="Correct"
                                />
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
