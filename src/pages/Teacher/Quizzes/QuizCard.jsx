import Button from '../../../components/ui/Button/Button';


const QuizCard = ({ quiz, onEdit, onDelete, onDuplicate, onPublish, onArchive, onPreview }) => {
	const status = quiz.access?.status ?? (quiz.isPublished ? 'published' : 'draft');
	const questionCount = quiz.content.questionCount || (quiz.content.questionIds ?? []).length;

	return (
		<article className='quiz-card'>
			<div className='quiz-card--header'>
				<h3>{quiz.general.title || 'Untitled quiz'}</h3>
				<span className={`quiz-card--status ${status}`}>{status}</span>
			</div>
			<section className='quiz-card--content'>
				<p className='quiz-card--description'>{quiz.general.description || 'No description provided.'}</p>
				<div className='quiz-card--facts'>
					<span>{questionCount} questions</span>
					<span>{quiz.rules.timeLimit || 'No'} min limit</span>
					<span>{quiz.rules.attempts || 'Unlimited'} attempts</span>
					<span>{quiz.access?.visibility || 'class'} visibility</span>
				</div>
				<p className='quiz-card--updated'>Updated {quiz.updatedAt || 'not yet'}</p>
			</section>
			<div className='quiz-card-actions'>
				<Button className='btn-primary' onClick={() => onEdit(quiz)} text="Edit" />
				<Button className='btn-secondary' onClick={() => onPreview(quiz)} text="Preview" />
				<div className='quiz-card-actions__secondary'>
					<Button className='btn-secondary' onClick={() => onDuplicate(quiz.id)} text="Duplicate" />
					{status === 'published' ? <Button className='btn-warning' onClick={() => onArchive(quiz.id)} text="Archive" /> : status !== 'archived' ? <Button className='btn-success' onClick={() => onPublish(quiz.id)} text="Publish" /> : null}
					<Button className='btn-danger' onClick={() => onDelete(quiz.id)} text="Delete" />
				</div>
			</div>
		</article>
	)
}

export default QuizCard