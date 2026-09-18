
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
				<button className='btn-primary' onClick={() => onEdit(quiz)}>Edit</button>
				<button className='btn-secondary' onClick={() => onPreview(quiz)}>Preview</button>
				<div className='quiz-card-actions__secondary'>
					<button className='btn-secondary' onClick={() => onDuplicate(quiz.id)}>Duplicate</button>
					{status === 'published' ? <button className='btn-warning' onClick={() => onArchive(quiz.id)}>Archive</button> : status !== 'archived' ? <button className='btn-success' onClick={() => onPublish(quiz.id)}>Publish</button> : null}
					<button className='btn-danger' onClick={() => onDelete(quiz.id)}>Delete</button>
				</div>
			</div>
		</article>
	)
}

export default QuizCard